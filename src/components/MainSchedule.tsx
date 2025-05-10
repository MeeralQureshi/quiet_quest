function MainSchedule() {
  // Static sample data for naps and tasks
  const naps = [
    {
      id: 1,
      timeRange: '8:00 AM - 9:30 AM',
      tasks: [
        { name: 'Change diaper', completed: false, napId: 1 },
        { name: 'Read a story', completed: true, napId: 1 },
      ],
    },
    {
      id: 2,
      timeRange: '12:30 PM - 2:00 PM',
      tasks: [
        { name: 'Prepare lunch', completed: false, napId: 2 },
        { name: 'Nap transfer', completed: false, napId: 2 },
      ],
    },
  ];

  return (
    <div className="bg-gray-700 rounded-lg shadow-lg p-4 max-w-3xl mx-auto mb-8">
      {/* Title */}
      <h2 className="text-xl font-semibold text-gray-100 mb-4">
        Today's Schedule / Timeline
      </h2>
      
      {/* Schedule Timeline for each nap */}
      {naps.map((nap) => (
        <div key={nap.id} className="mb-6">
          {/* Nap Segment Header */}
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center space-x-2">
              {/* Moon icon */}
              <svg
                className="w-6 h-6 text-[#F9D76E]"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M21.752 15.002A9.972 9.972 0 0112 22C6.477 22 2 17.523 2 12c0-4.756 3.331-8.677 7.787-9.638a.75.75 0 01.861 1.253A8.488 8.488 0 003.5 12c0 4.694 3.806 8.5 8.5 8.5s8.5-3.806 8.5-8.5a8.488 8.488 0 00-3.15-6.312.75.75 0 01.861-1.253A9.972 9.972 0 0122 12c0 1.94-.575 3.756-1.549 5.319z" />
              </svg>
              {/* Nap time info */}
              <span className="text-gray-100 font-semibold">{nap.timeRange}</span>
            </div>
            {/* Optional Edit Button */}
            <button className="text-gray-300 hover:text-yellow-400 transition">
              {/* Pencil Icon */}
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.414 2.586a2 2 0 00-2.828 0l-11 11a2 2 0 00-.586 1.414V16a1 1 0 001 1h2.586a2 2 0 001.414-.586l11-11a2 2 0 000-2.828z" />
              </svg>
            </button>
          </div>

          {/* Tasks inside this nap */}
          <div className="bg-gray-600 rounded-lg p-2 space-y-2">
            {nap.tasks.map((task, index) => (
              <div key={index} className="flex justify-between items-center px-2 py-1">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="accent-[#F9D76E]"
                    checked={task.completed}
                    onChange={() => {/* toggle logic here */}}
                  />
                  <span
                    className={`text-gray-100 ${
                      task.completed ? 'line-through opacity-50' : ''
                    }`}
                  >
                    {task.name}
                  </span>
                </div>
                {/* Optional: show assigned nap info */}
                <span className="text-sm text-gray-400">
                  {task.napId === nap.id ? 'Assigned' : 'Unassigned'}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Add Nap & Add Task buttons */}
    <div className="flex space-x-4 mt-4">
        {/* Add Nap Button */}
        <button className="bg-[#F9D76E] text-gray-900 font-semibold py-2 px-4 rounded-lg hover:bg-[#FBBF24] transition-colors duration-300">
            Add Nap
        </button>
        {/* Add Task Button */}
        <button className="bg-[#F9D76E] text-gray-900 font-semibold py-2 px-4 rounded-lg hover:bg-[#FBBF24] transition-colors duration-300">
            Add Task
        </button>
    </div>
    </div>
  );
}

export default MainSchedule;
