import Layout from '../components/Layout';
    import { useState, useEffect } from 'react';
    import { Bar, Pie, Line } from 'react-chartjs-2';
    import Link from 'next/link';
    import {
      Chart as ChartJS,
      CategoryScale,
      LinearScale,
      BarElement,
      LineElement,
      PointElement,
      Title,
      Tooltip,
      Legend,
      ArcElement,
      Filler
    } from 'chart.js';

    ChartJS.register(
      CategoryScale,
      LinearScale,
      BarElement,
      LineElement,
      PointElement,
      Title,
      Tooltip,
      Legend,
      ArcElement,
      Filler
    );

    export default function Dashboard() {
      const [transactions, setTransactions] = useState([]);
      const [totalMembers, setTotalMembers] = useState(0);
      const [newMembersThisMonth, setNewMembersThisMonth] = useState(0);
      const [income, setIncome] = useState(0);
      const [expenses, setExpenses] = useState(0);
      const [netBalance, setNetBalance] = useState(0);
      const [notes, setNotes] = useState('');

      const loadTransactions = () => {
        const savedTransactions = localStorage.getItem('transactions');
        if (savedTransactions) {
          try {
            return JSON.parse(savedTransactions);
          } catch (error) {
            console.error('Error parsing transactions from localStorage:', error);
            localStorage.removeItem('transactions');
            return [];
          }
        }
        return [];
      };

      const refreshTransactions = () => {
        const parsedTransactions = loadTransactions();
        setTransactions(parsedTransactions);

        const newIncome = parsedTransactions
          .filter((t) => t.type === 'income')
          .reduce((sum, t) => sum + parseFloat(t.amount), 0);
        const newExpenses = parsedTransactions
          .filter((t) => t.type === 'expense')
          .reduce((sum, t) => sum + parseFloat(t.amount), 0);

        setIncome(newIncome);
        setExpenses(newExpenses);
        setNetBalance(newIncome - newExpenses);
      };

      useEffect(() => {
        refreshTransactions();

        const savedMembers = localStorage.getItem('members');
        if (savedMembers) {
          try {
            const members = JSON.parse(savedMembers);
            setTotalMembers(members.length);

            const now = new Date();
            const currentMonth = now.getMonth();
            const currentYear = now.getFullYear();

            const newMembersCount = members.filter((member) => {
              const memberDate = new Date(member.createdAt);
              return (
                memberDate.getMonth() === currentMonth &&
                memberDate.getFullYear() === currentYear
              );
            }).length;

            setNewMembersThisMonth(newMembersCount);
          } catch (error) {
            console.error('Failed to parse members from localStorage');
          }
        }

        const savedNotes = localStorage.getItem('notes');
        if (savedNotes) {
          setNotes(savedNotes);
        }
      }, []);

      useEffect(() => {
        localStorage.setItem('notes', notes);
      }, [notes]);

      const recentTransactions = transactions.slice(-5);

      const aggregateTransactions = (transactions) => {
        const aggregated = {};
        transactions.forEach((t) => {
          const date = new Date(t.date);
          const yearMonth = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
          if (!aggregated[yearMonth]) {
            aggregated[yearMonth] = { income: 0, expenses: 0 };
          }
          if (t.type === 'income') {
            aggregated[yearMonth].income += parseFloat(t.amount);
          } else {
            aggregated[yearMonth].expenses += parseFloat(t.amount);
          }
        });
        return aggregated;
      };

      const aggregatedData = aggregateTransactions(transactions);

      const lineChartLabels = Object.keys(aggregatedData).sort();
      const lineChartIncomeData = lineChartLabels.map((key) => aggregatedData[key].income);
      const lineChartExpensesData = lineChartLabels.map((key) => aggregatedData[key].expenses);

      const lineData = {
        labels: lineChartLabels,
        datasets: [
          {
            label: 'Income',
            data: lineChartIncomeData,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.4,
            fill: false,
          },
          {
            label: 'Expenses',
            data: lineChartExpensesData,
            borderColor: 'rgb(255, 99, 132)',
            tension: 0.4,
            fill: false,
          },
        ],
      };

      const lineOptions = {
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          tooltip: {
            enabled: true,
            callbacks: {
              label: (context) => {
                let label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                label += '৳' + context.parsed.y.toFixed(2);
                return label;

              }
            }
          }
        }
      };

      const calculateCategoryExpenses = (transactions) => {
        const categoryExpenses = {};
        transactions.forEach((t) => {
          if (t.type === 'expense') {
            if (!categoryExpenses[t.category]) {
              categoryExpenses[t.category] = 0;
            }
            categoryExpenses[t.category] += parseFloat(t.amount);
          }
        });
        return categoryExpenses;
      };

      const categoryExpenses = calculateCategoryExpenses(transactions);

      const spendingPieData = {
        labels: Object.keys(categoryExpenses),
        datasets: [
          {
            data: Object.values(categoryExpenses),
            backgroundColor: [
              '#ef4444',
              '#f97316',
              '#eab308',
              '#22c55e',
              '#10b981',
              '#06b6d4',
              '#0ea5e9',
              '#6366f1',
              '#8b5cf6',
              '#d946ef',
              '#f43f5e',
            ],
          },
        ],
      };

      // Prepare data for the small bar chart (last 6 months of income)
      const last6Months = lineChartLabels.slice(-6); // Get last 6 months (or fewer)
      const smallBarData = {
        labels: last6Months,
        datasets: [
          {
            label: 'Income',
            data: last6Months.map((month) => aggregatedData[month]?.income || 0), // Handle potential missing months
            backgroundColor: '#22c55e',
          },
        ],
      };


      return (
        <Layout>
          <h1 className="text-3xl font-bold mb-6 dark:text-gray-200">Dashboard</h1>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-2 text-green-500 dark:text-green-300">Total Revenue (Income)</h2>
              <p className="text-3xl font-bold dark:text-gray-200">৳{income.toFixed(2)}</p>
              <div className="mt-4 h-16">
                {/* Dynamic Small Bar Chart */}
                <Bar
                  data={smallBarData}
                  options={{ maintainAspectRatio: false, plugins: { legend: { display: false } } }}
                />
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-2 text-red-500 dark:text-red-300">Total Expenses</h2>
              <p className="text-3xl font-bold dark:text-gray-200">৳{expenses.toFixed(2)}</p>
              <div className="mt-4 h-16">
                <Pie
                  data={spendingPieData}
                  options={{ maintainAspectRatio: false, plugins: { legend: { display: false } } }}
                />
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-300">Balance</h2>
              <p className="text-3xl font-bold dark:text-gray-200">৳{netBalance.toFixed(2)}</p>
              <div className="mt-4 h-16 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <span className={netBalance >= 0 ? 'text-green-500 dark:text-green-300' : 'text-red-500 dark:text-red-300'}>
                  {netBalance >= 0 ? 'Positive' : 'Negative'}
                </span>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-2 text-purple-600 dark:text-purple-300">Total Members</h2>
              <p className="text-3xl font-bold dark:text-gray-200">{totalMembers}</p>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {totalMembers > 0 ? `+${newMembersThisMonth}` : '0'} this month
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4 dark:text-gray-200">Recent Transactions</h2>
              <ul>
                {recentTransactions.map((t, i) => (
                  <li key={i} className="flex justify-between items-center py-2 border-b last:border-none">
                    <span className="dark:text-gray-200">
                      {t.date} - ৳{t.amount} ({t.type}) - {t.category}
                    </span>
                    <span className={t.type === 'income' ? 'text-green-500 dark:text-green-300' : 'text-red-500 dark:text-red-300'}>
                      {t.type === 'income' ? '+' : '-'}
                    </span>
                  </li>
                ))}
              </ul>
              <Link
                href="/transactions"
                className="mt-4 inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors duration-200"
              >
                View All
              </Link>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4 dark:text-gray-200">Income vs. Expenses</h2>
              <div className="h-64">
                <Line data={lineData} options={lineOptions} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-2">New Members This Month</h2>
              <p className="text-3xl font-bold dark:text-gray-200">{newMembersThisMonth}</p>
              <div className="mt-4 h-16 w-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                {newMembersThisMonth}
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow col-span-2">
              <h2 className="text-xl font-semibold mb-2">Notes</h2>
              <textarea
                className="w-full h-48 border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Write your notes here..."
              />
            </div>
          </div>
        </Layout>
      );
    }
