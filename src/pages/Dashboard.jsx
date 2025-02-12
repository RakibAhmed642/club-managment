import React from 'react';
    import MemberTable from '../components/MemberTable';
    import OverviewCard from '../components/OverviewCard';

    const Dashboard = () => {
      // Sample data for the MemberTable
      const members = [
        { id: '1', name: 'John Doe', department: 'Marketing', email: 'john@example.com', mobile: '+8801XXXXXXXXX' },
        { id: '2', name: 'Jane Smith', department: 'Sales', email: 'jane@example.com', mobile: '+8801XXXXXXXXX' },
        { id: '3', name: 'Bob Johnson', department: 'IT', email: 'bob@example.com', mobile: '+8801XXXXXXXXX' },
      ];

      // Sample data for Financial Overview
      const financialData = {
        totalFunds: 250000,
        totalExpenses: 120000,
        totalDonations: 50000,
        pendingPayments: 10000,
      };

      // Sample data for Transaction Breakdown
      const transactions = [
        { date: '2024-07-28', category: 'Event', amount: 5000, paymentMethod: 'Cash' },
        { date: '2024-07-27', category: 'Donation', amount: 10000, paymentMethod: 'Online' },
        { date: '2024-07-26', category: 'Rent', amount: -2000, paymentMethod: 'Bank Transfer' },
      ];

      return (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Dashboard Overview</h2>
          {/* Financial Overview - Key Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <OverviewCard title="Total Funds Available" value={`৳ ${financialData.totalFunds.toLocaleString()}`} color="green" />
            <OverviewCard title="Total Expenses" value={`৳ ${financialData.totalExpenses.toLocaleString()}`} color="red" />
            <OverviewCard title="Total Donations Received" value={`৳ ${financialData.totalDonations.toLocaleString()}`} color="blue" />
            <OverviewCard title="Pending Payments" value={`৳ ${financialData.pendingPayments.toLocaleString()}`} color="orange" />
          </div>

          {/* Transaction Breakdown Table */}
          <h2 className="text-2xl font-semibold mb-4">Transaction Breakdown</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Method</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {transactions.map((transaction, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {transaction.amount > 0 ? `৳ ${transaction.amount.toLocaleString()}` : `-৳ ${Math.abs(transaction.amount).toLocaleString()}`}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.paymentMethod}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

            {/* Chart Placeholders */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">Monthly Income vs. Expenses</h3>
                <div className='w-full h-64 bg-gray-200'></div> {/* Placeholder */}
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Donation Contribution Breakdown</h3>
                <div className='w-full h-64 bg-gray-200'></div> {/* Placeholder */}
              </div>
          </div>

          {/* Club Member Management */}
          <h2 className="text-2xl font-semibold mt-8 mb-4">Club Members</h2>
           <div className="mb-4">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
              Export Member List
            </button>
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Auto-Sync with Google Spreadsheet
            </button>
          </div>
          <MemberTable members={members} />
        </div>
      );
    };

    export default Dashboard;
