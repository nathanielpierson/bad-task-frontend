// TaskFetch.jsx
import axios from "axios";
import { useState, useEffect } from "react";

export function TaskFetch({ onTasksFetched }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/tasks.json")
      .then((response) => {
        setTasks(response.data);

        // Send tasks up to App
        if (onTasksFetched) {
          onTasksFetched(response.data);
        }

        console.log("Tasks inside TaskFetch:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  }, [onTasksFetched]); // re-run if callback changes

  return (
    <div>
      {tasks.map((task: any) => (
        <div key={task.id}>
          <p>{task.name}</p>
        </div>
      ))}
    </div>
  );
}
