import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { Tooltip as ReactTooltip } from 'react-tooltip';

const today = new Date();

function shiftDate(date, numDays) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + numDays);
  return newDate;
}

const CalendarHeatmapChart = ({ habitData }) => {
  return (
    <div className='bg-white p-6 rounded-2xl shadow-lg shadow-gray-400 w-full'>
      <h2 className="text-2xl font-bold mb-4">Daily Progress Heatmap</h2>
      <div className="overflow-x-auto pb-2">
        <CalendarHeatmap
          startDate={shiftDate(today, -365)}
          endDate={shiftDate(today, 9)}
          values={habitData}
          transformDayData={(value) => {
            return value ? { ...value, date: new Date(value.date.replace(/-/g, '/')) } : null;
          }}
          classForValue={(value) => {
            if (!value) {
              return 'color-empty';
            }
            return `color-github-${value.level}`;
          }}
          tooltipDataAttrs={value => {
              if (!value || !value.date) return null;
              return {
                  'data-tooltip-id': 'heatmap-tooltip',
                  'data-tooltip-content': `${value.date}: ${value.count} habits completed`,
              };
          }}
        />
      </div>
      <ReactTooltip id="heatmap-tooltip" />
    </div>
  );
};

export default CalendarHeatmapChart;