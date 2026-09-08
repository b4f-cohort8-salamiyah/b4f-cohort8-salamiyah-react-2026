import { useState } from "react";
import type { ChangeEvent, KeyboardEvent } from "react";
import type { Task, User } from "../types";
import Badge from "./Badge";

interface TaskItemProps {
  task: Task;
  ownerName: string;
  users: User[];
  unavailableUsers: boolean;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onSaveEdit: (id: number, title: string, userId: number) => void;
}

const MAX_TITLE_LENGTH = 200;

function TaskItem({
  task,
  ownerName,
  users,
  unavailableUsers,
  onToggle,
  onDelete,
  onSaveEdit,
}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editUserId, setEditUserId] = useState(task.userId);
  const [editError, setEditError] = useState("");

  function handleEditClick() {
    setEditTitle(task.title);
    setEditError("");
    setIsEditing(true);
  }

  function handleChangeTitle(event: ChangeEvent<HTMLInputElement>) {
    setEditTitle(event.target.value);
  }

  function handleChangeOwner(event: ChangeEvent<HTMLSelectElement>) {
    setEditUserId(Number(event.target.value));
  }

  function handleCancelClick() {
    setIsEditing(false);
    setEditError("");
  }

  function handleSaveClick() {
    const newTitle = editTitle.trim();

    if (newTitle === "") {
      setEditError("Title can't be empty.");
      return;
    }

    if (newTitle.length > MAX_TITLE_LENGTH) {
      setEditError(`Title must be ${MAX_TITLE_LENGTH} characters or fewer.`);
      return;
    }

    onSaveEdit(task.id, newTitle, editUserId);

    setEditError("");
    setIsEditing(false);
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Enter") {
      handleSaveClick();
    } else if (event.key === "Escape") {
      handleCancelClick();
    }
  }

  if (isEditing) {
    return (
      <li className="task-item">
        <span className="task-text">
          <input
            type="text"
            className="edit-title-input"
            value={editTitle}
            onChange={handleChangeTitle}
            onKeyDown={handleKeyDown}
          />
          <select
            className="edit-owner-select"
            value={editUserId}
            disabled={unavailableUsers}
            onChange={handleChangeOwner}
            onKeyDown={handleKeyDown}
          >
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {editError !== "" && <p className="form-error">{editError}</p>}
        </span>

        <span className="task-actions">
          <button
            className="task-action-button save-button"
            onClick={handleSaveClick}
          >
            Save
          </button>
          <button className="task-action-button" onClick={handleCancelClick}>
            Cancel
          </button>
        </span>
      </li>
    );
  }

  return (
    <li className="task-item">
      <span className="task-text">
        <span className="task-title">{task.title}</span>
        <span className="task-user">{ownerName}</span>
      </span>
      <Badge status={task.completed ? "completed" : "pending"} />
      <span className="task-actions">
        <button
          className="task-action-button"
          onClick={() => onToggle(task.id)}
        >
          {task.completed ? "Mark Pending" : "Mark Completed"}
        </button>
        <button className="task-action-button" onClick={handleEditClick}>
          Edit
        </button>
        <button
          className="task-action-button delete-button"
          onClick={() => onDelete(task.id)}
        >
          Delete
        </button>
      </span>
    </li>
  );
}

export default TaskItem;
