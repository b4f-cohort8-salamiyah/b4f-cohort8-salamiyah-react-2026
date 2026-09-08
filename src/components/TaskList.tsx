import type { Task, User } from "../types";
import TaskItem from "./TaskItem";

interface TaskListProps {
  tasks: Task[];
  users: User[];
  unavailableUsers: boolean;
  getOwnerName: (userId: number) => string;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onSaveEdit: (id: number, newTitle: string, newUserId: number) => void;
}

function TaskList({
  tasks,
  users,
  unavailableUsers,
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
          users={users}
          unavailableUsers={unavailableUsers}
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
