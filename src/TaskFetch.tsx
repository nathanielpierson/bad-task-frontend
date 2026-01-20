// TaskFetch.jsx
import axios from "axios";
import { useState, useEffect } from "react";

interface Task {
  id: number | string;
  name: string;
}

interface TaskFetchProps {
  onTasksFetched?: (tasks: Task[]) => void;
}

export function TaskFetch({ onTasksFetched }: TaskFetchProps) {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    axios.get("http://localhost:3000/tasks.json")
      .then((response) => {
        setTasks(response.data as Task[]);

        // Send tasks up to App
        if (onTasksFetched) {
          onTasksFetched(response.data as Task[]);
        }

        console.log("Tasks inside TaskFetch:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
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
