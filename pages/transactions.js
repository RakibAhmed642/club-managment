import Layout from '../components/Layout';
    import { useState, useEffect } from 'react';

    export default function Transactions() {
      const [transactions, setTransactions] = useState([]);
      const [newTransaction, setNewTransaction] = useState({
        date: '',
        type: 'income',
        amount: '',
        category: '',
      });
      const [errors, setErrors] = useState({});

      useEffect(() => {
        const savedTransactions = localStorage.getItem('transactions');
        if (savedTransactions) {
          try {
            setTransactions(JSON.parse(savedTransactions));
          } catch (error) {
            console.error('Error parsing transactions from localStorage:', error);
            localStorage.removeItem('transactions');
          }
        }
      }, []);

      useEffect(() => {
        if (transactions.length > 0) {
          localStorage.setItem('transactions', JSON.stringify(transactions));
        }
      }, [transactions]);

      const validateForm = () => {
        let isValid = true;
        const newErrors = {};

        if (!newTransaction.date.trim()) {
          newErrors.date = 'Date is required';
          isValid = false;
        }
        if (!newTransaction.amount.trim()) {
          newErrors.amount = 'Amount is required';
          isValid = false;
        } else if (isNaN(parseFloat(newTransaction.amount))) {
          newErrors.amount = 'Amount must be a number';
          isValid = false;
        }
        if (!newTransaction.category.trim()) {
          newErrors.category = 'Category is required';
          isValid = false;
        }

        setErrors(newErrors);
        return isValid;
      };

      const addTransaction = async () => {
        if (validateForm()) {
          setTransactions([...transactions, { ...newTransaction }]);
          setNewTransaction({ date: '', type: 'income', amount: '', category: '' });
          setErrors({});
        }
      };

      const deleteTransaction = async (index) => {
        if (window.confirm('Are you sure you want to delete this transaction?')) {
          const updatedTransactions = transactions.filter((_, i) => i !== index);
          setTransactions(updatedTransactions);
          localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
        }
      };

      return (
        <Layout>
          <h1 className="text-3xl font-bold mb-6 dark:text-gray-200">Transactions</h1>
          <div className="mb-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div>
                <input
                  type="date"
                  placeholder="Date"
                  className={`border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.date ? 'border-red-500' : ''
                  } dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white`}
                  value={newTransaction.date}
                  onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
                />
                {errors.date && <p className="text-red-500 text-sm dark:text-red-400">{errors.date}</p>}
              </div>
              <div>
                <select
                  className={`border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.type ? 'border-red-500' : ''
                  } dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white`}
                  value={newTransaction.type}
                  onChange={(e) => setNewTransaction({ ...newTransaction, type: e.target.value })}
                >
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
                {errors.type && <p className="text-red-500 text-sm dark:text-red-400">{errors.type}</p>}
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Amount"
                  className={`border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.amount ? 'border-red-500' : ''
                  } dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white`}
                  value={newTransaction.amount}
                  onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
                />
                {errors.amount && <p className="text-red-500 text-sm dark:text-red-400">{errors.amount}</p>}
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Category"
                  className={`border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.category ? 'border-red-500' : ''
                  } dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white`}
                  value={newTransaction.category}
                  onChange={(e) => setNewTransaction({ ...newTransaction, category: e.target.value })}
                />
                {errors.category && <p className="text-red-500 text-sm dark:text-red-400">{errors.category}</p>}
              </div>
            </div>
            <button
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition-colors duration-200"
              onClick={addTransaction}
            >
              Add Transaction
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left dark:text-gray-200">Date</th>
                    <th className="px-4 py-2 text-left dark:text-gray-200">Type</th>
                    <th className="px-4 py-2 text-left dark:text-gray-200">Amount</th>
                    <th className="px-4 py-2 text-left dark:text-gray-200">Category</th>
                    <th className="px-4 py-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((t, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-gray-50 dark:bg-gray-700' : 'dark:bg-gray-800'}>
                      <td className="border px-4 py-2 dark:text-gray-200">{t.date}</td>
                      <td className="border px-4 py-2 dark:text-gray-200">{t.type}</td>
                      <td className={`border px-4 py-2 ${t.type === 'income' ? 'text-green-600' : 'text-red-600'} dark:text-gray-200`}>
                        ৳{t.amount}
                      </td>
                      <td className="border px-4 py-2 dark:text-gray-200">{t.category}</td>
                      <td className="border px-4 py-2">
                        <button
                          className="text-red-500 hover:text-red-700 transition-colors duration-200"
                          onClick={() => deleteTransaction(i)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Layout>
      );
    }
