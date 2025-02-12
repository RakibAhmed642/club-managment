import React from 'react';

      const OverviewCard = ({ title, value, color }) => {
        const bgColor = {
          orange: 'bg-orange-100',
          green: 'bg-green-100',
          purple: 'bg-purple-100',
          blue: 'bg-blue-100',
        }[color] || 'bg-gray-100';

        const textColor = {
          orange: 'text-orange-800',
          green: 'text-green-800',
          purple: 'text-purple-800',
          blue: 'text-blue-800',
        }[color] || 'text-gray-800'

        return (
          <div className={`${bgColor} ${textColor} p-4 rounded-lg shadow`}>
            <div className="text-sm font-medium">{title}</div>
            <div className="text-2xl font-bold">{value}</div>
          </div>
        );
      };

      export default OverviewCard;
