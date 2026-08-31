interface TaskItemsProps {
  title: string;
  ownerName: string;
  statusText: string;
  statusClass: string;
}
function TaskItem(props : TaskItemsProps){
    return (
      <li className="task-item">
        <span className="task-text">
          <span className="task-title">{props.title}</span>
          <span className="task-user">{props.ownerName}</span>
        </span>
        <span className={`task-status ${props.statusClass}`}>{props.statusText}</span>
      </li>
    );
}
export default TaskItem;