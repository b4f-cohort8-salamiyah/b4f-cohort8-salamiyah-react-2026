interface TaskItemProps {
  title: string;
  user: string;
  status: string;
  statusClass: string;
}

function TaskItem(props: TaskItemProps) {
  return (
    <li className="task-item">
      <span className="task-text">
        <span className="task-title">{props.title}</span>
        <span className="task-user">{props.user}</span>
      </span>
      <span className={(`task-status ${props.statusClass}`)}>{props.status}</span>
    </li>
  );
}
export default TaskItem;
