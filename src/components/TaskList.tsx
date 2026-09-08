import type { Task } from "../types";
import TaskItem from "./TaskItem";

interface TaskListProps {
  tasks: Task[];
  getOwnerName: (userId: number) => string;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onSaveEdit: (id: number, newTitle: string) => void;
}

function TaskList({
  tasks,
  getOwnerName,
  onToggle,
  onDelete,
  onSaveEdit,
}: TaskListProps) {
  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          ownerName={getOwnerName(task.userId)}
          onToggle={onToggle}
          onDelete={onDelete}
          onSaveEdit={onSaveEdit}
        />
      ))}
    </ul>
  );
}

export default TaskList;
