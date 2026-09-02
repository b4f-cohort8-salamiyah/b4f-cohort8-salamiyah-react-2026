import { useState } from "react";
interface TaskItemProps {
  title: string;
  ownerName: string;
  statusText: string;
  statusClass: string;
}

function TaskItem(props: TaskItemProps) {
const [statusText, setStatusText] = useState(props.statusText);
const [statusClass, setStatusClass] = useState(props.statusClass);

function handleClick() {
  if (statusText === "Completed") {
    setStatusText("Pending");
    setStatusClass("pending");
  }
  else {
    setStatusText("Completed");
    setStatusClass("completed");
  }
}


  return (
    <li className="task-item">
      <span className="task-text">
        <span className="task-title">{props.title}</span>
        <span className="task-user">{props.ownerName}</span>
      </span>
      <button
        className={`task-status ${statusClass}`}
        onClick={handleClick}
      >
        {statusText}
      </button>
    </li>
  );
}

export default TaskItem;
