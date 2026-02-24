// TaskFetch.jsx
import { useState, useEffect } from "react";
import { Task, TASKS } from "./tasks";

interface TaskFetchProps {
  onTasksFetched?: (tasks: Task[]) => void;
}

export function TaskFetch({ onTasksFetched }: TaskFetchProps) {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    setTasks(TASKS);

    if (onTasksFetched) {
      onTasksFetched(TASKS);
    }
  }, [onTasksFetched]); // re-run if callback changes

  return (
    <div>
      {tasks.map((task) => (
        <div key={task.id}>
          <p>{task.name}</p>
        </div>
      ))}
    </div>
  );
}
