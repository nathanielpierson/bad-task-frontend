import React, { useState } from "react";
import { Wheel } from "react-custom-roulette";
import { TaskFetch } from "./TaskFetch";

function App() {
  const [tasks, setTasks] = useState<string[]>([]);
  interface ImageProps {
  }

  const handleTasksFetched = (fetchedTasks: string[]) => {
    console.log("Tasks received in App:", fetchedTasks);
    setTasks(fetchedTasks);
  };

  const data = tasks.length > 0
    ? tasks.map((task: any) => ({ option: task.name }))
    : [{ option: "default" }];

  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  const handleSpinClick = () => {
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * data.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
    }
  };

  return (
    <div>
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={data}
        textDistance={70}
        onStopSpinning={() => setMustSpin(false)}
      />
      <button onClick={handleSpinClick}>SPIN</button>

      {/* ✅ Pass callback into TaskFetch */}
      <TaskFetch onTasksFetched={handleTasksFetched} />
    </div>
  );
}

export default App;
