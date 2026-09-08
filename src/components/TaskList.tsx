<<<<<<< HEAD
import type { Task } from "../types";
=======
import type { Task, User } from "../types";
>>>>>>> origin/group-1
import TaskItem from "./TaskItem";

interface TaskListProps {
  tasks: Task[];
<<<<<<< HEAD
  getOwnerName: (userId: number) => string;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onSaveEdit: (id: number, newTitle: string) => void;
=======
  users: User[];
  usersUnavailable: boolean;
  getOwnerName: (userId: number) => string;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onSaveEdit: (id: number, newTitle: string, newUserId: number) => void;
>>>>>>> origin/group-1
}

function TaskList({
  tasks,
<<<<<<< HEAD
=======
  users,
  usersUnavailable,
>>>>>>> origin/group-1
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
<<<<<<< HEAD
=======
          users={users}
          usersUnavailable={usersUnavailable}
>>>>>>> origin/group-1
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
