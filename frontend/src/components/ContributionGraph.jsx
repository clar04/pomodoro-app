import React, { useMemo } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css'; // Default styles for the heatmap
import { usePomodoro } from '../context/PomodoroContext';

function ContributionGraph() {
  const { allSessions } = usePomodoro();

  // Memoize the data transformation for performance
  const heatmapData = useMemo(() => {
    const dailyCounts = {};

    // Aggregate sessions by date
    allSessions.forEach(session => {
      // Ensure completed_at is a Date object (it should be from pomodoroApi.js)
      const date = session.completed_at instanceof Date ? session.completed_at : new Date(session.completed_at);
      const dateString = date.toISOString().split('T')[0]; // YYYY-MM-DD

      dailyCounts[dateString] = (dailyCounts[dateString] || 0) + 1;
    });

    // Convert to the format required by react-calendar-heatmap
    // [{ date: 'YYYY-MM-DD', count: N }]
    return Object.keys(dailyCounts).map(date => ({
      date: date,
      count: dailyCounts[date],
    }));
  }, [allSessions]); // Recalculate only when allSessions changes

  // Determine the start and end dates for the heatmap
  // Show data for the last year plus current year up to today
  const endDate = new Date();
  const startDate = new Date();
  startDate.setFullYear(endDate.getFullYear() - 1); // One year ago

  // Find the maximum count to set the domain for the color scale
  const maxCount = useMemo(() => {
    return heatmapData.reduce((max, item) => Math.max(max, item.count), 0);
  }, [heatmapData]);

  // Function to determine the class for each cell based on its count
  const classForValue = (value) => {
    if (!value || value.count === 0) {
      return 'bg-graphLow'; // Tailwind class for empty/lowest contribution
    }
    // Dynamically apply Tailwind color classes based on count intensity
    // Adjust these thresholds as needed for your desired visual distribution
    const count = value.count;
    if (maxCount === 0) return 'bg-graphLow'; // Handle case with no sessions

    // Define thresholds for color intensity
    const threshold1 = Math.ceil(maxCount * 0.25);
    const threshold2 = Math.ceil(maxCount * 0.5);
    const threshold3 = Math.ceil(maxCount * 0.75);

    if (count <= threshold1) return 'bg-graphMedium'; // 0-25% of max
    if (count <= threshold2) return 'bg-graphHigh';    // 25-50% of max
    if (count <= threshold3) return 'bg-graphVeryHigh'; // 50-75% of max
    return 'bg-light-coral'; // Top 25% or highest, using a primary accent
  };

  return (
    <div className="overflow-x-auto pb-4 text-gray-300"> {/* Allow horizontal scrolling for smaller screens */}
      <CalendarHeatmap
        startDate={startDate}
        endDate={endDate}
        values={heatmapData}
        classForValue={classForValue} // Use the custom function for Tailwind classes
        // Tooltip for each cell
        tooltipDataAttrs={(value) => {
          return {
            'data-tip': `${value.date}: ${value.count || 0} sessions`,
          };
        }}
        // Show month labels
        showMonthLabels={true}
        // Show weekday labels
        showWeekdayLabels={false} // Often hidden for a cleaner look
        // Render custom title for months
        monthLabels={[
          'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
          'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ]}
      />
      {/* Simple legend for the heatmap colors */}
      <div className="flex justify-center items-center mt-6 text-sm text-gray-400">
        <span className="mr-2">Less</span>
        <div className="w-4 h-4 rounded-sm bg-graphLow mr-1 border border-gray-700"></div>
        <div className="w-4 h-4 rounded-sm bg-graphMedium mr-1 border border-gray-700"></div>
        <div className="w-4 h-4 rounded-sm bg-graphHigh mr-1 border border-gray-700"></div>
        <div className="w-4 h-4 rounded-sm bg-graphVeryHigh mr-1 border border-gray-700"></div>
        <div className="w-4 h-4 rounded-sm bg-light-coral mr-2 border border-gray-700"></div> {/* Added the highest intensity color */}
        <span>More</span>
      </div>
    </div>
  );
}

export default ContributionGraph;
