import React, { useState, useMemo } from "react";
import { Wheel } from "react-custom-roulette";
import { TaskFetch } from "./TaskFetch";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState<string[]>([]);

  const handleTasksFetched = (fetchedTasks: string[]) => {
    console.log("Tasks received in App:", fetchedTasks);
    setTasks(fetchedTasks);
  };

  // Memoize data to prevent recreating on every render
  const data = useMemo(() => {
    if (tasks.length > 0) {
      return tasks.map((task: any) => ({ option: task.name }));
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
    }
  };

  return (
    <div className="app-container">
      <div className="wheel-wrapper">
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={data}
          textDistance={70}
          spinDuration={0.6}
          backgroundColors={['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2']}
          textColors={['#FFFFFF']}
          fontSize={16}
          outerBorderColor="#34495e"
          outerBorderWidth={10}
          innerRadius={20}
          innerBorderColor="#34495e"
          innerBorderWidth={3}
          radiusLineColor="#34495e"
          radiusLineWidth={2}
          onStopSpinning={() => {
            setMustSpin(false);
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

      <TaskFetch onTasksFetched={handleTasksFetched} />
    </div>
  );
}

export default App;