import React, { useCallback, useMemo, useState } from "react";
import { Wheel } from "react-custom-roulette";
import { TaskFetch } from "./TaskFetch";
import "./App.css";

interface Task {
  id: number | string;
  name: string;
  image_url?: string;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string>("");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const handleTasksFetched = useCallback((fetchedTasks: Task[]) => {
    console.log("Tasks received in App:", fetchedTasks);

    // Validate maximum number of options
    if (fetchedTasks.length > 16) {
      setError(`Too many options! Maximum is 16, but you have ${fetchedTasks.length}. Please reduce the number of options.`);
      setTasks([]);
    } else {
      setError("");
      setTasks(fetchedTasks);
    }
  }, []);

  // Truncate long text to a single line with ellipsis if it exceeds 20 characters
  const formatText = (text: string, maxLength: number = 20): string => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength - 1) + "…";
  };

  // Memoize data to prevent recreating on every render
  const data = useMemo(() => {
    if (tasks.length > 0) {
      return tasks.map((task) => ({ option: formatText(task.name) }));
    }
    return [{ option: "Loading tasks..." }];
  }, [tasks]);

  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  const handleSpinClick = () => {
    if (!mustSpin && data.length > 1) {
      const newPrizeNumber = Math.floor(Math.random() * data.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
      // Clear previous selection while spinning
      setSelectedTask(null);
    }
  };

  // Show error message if there are too many options
  if (error) {
    return (
      <div className="app-container">
        <div className="error-message">
          <h2>Error</h2>
          <p>{error}</p>
        </div>
        <TaskFetch onTasksFetched={handleTasksFetched} />
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="wheel-wrapper">
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={data}
          textDistance={65}
          spinDuration={0.6}
          backgroundColors={['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2']}
          textColors={['#FFFFFF']}
          fontSize={13}
          outerBorderColor="#34495e"
          outerBorderWidth={10}
          innerRadius={20}
          innerBorderColor="#34495e"
          innerBorderWidth={3}
          radiusLineColor="#34495e"
          radiusLineWidth={2}
          onStopSpinning={() => {
            setMustSpin(false);
            // When spin stops, capture the selected task based on prizeNumber
            if (tasks.length > 0 && prizeNumber >= 0 && prizeNumber < tasks.length) {
              setSelectedTask(tasks[prizeNumber]);
            }
          }}
        />
      </div>

      <button
        className="spin-button"
        onClick={handleSpinClick}
        disabled={mustSpin || data.length <= 1}
      >
        {mustSpin ? 'SPINNING...' : 'SPIN'}
      </button>

      {selectedTask && (
        <div className="result-container">
          <h2 className="result-title">{selectedTask.name}</h2>
          {selectedTask.image_url && (
            <div className="result-image-wrapper">
              <img
                src={selectedTask.image_url}
                alt={selectedTask.name}
                className="result-image"
              />
            </div>
          )}
        </div>
      )}

      <TaskFetch onTasksFetched={handleTasksFetched} />
    </div>
  );
}

export default App;