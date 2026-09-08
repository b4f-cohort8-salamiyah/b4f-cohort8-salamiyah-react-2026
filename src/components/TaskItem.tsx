import { useState } from "react";
import type { ChangeEvent } from "react";
import type { Task } from "../types";
import Badge from "./Badge";

interface TaskItemProps {
  task: Task;
  ownerName: string;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onSaveEdit: (id: number, title: string) => void;
}

const MAX_TITLE_LENGTH = 200;

function TaskItem({ task, ownerName, onToggle, onDelete, onSaveEdit }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editError, setEditError] = useState("");

  function handleEditClick() {
    setEditTitle(task.title);
    setEditError("");
    setIsEditing(true);
  }

  function handleChangeTitle(event: ChangeEvent<HTMLInputElement>) {
    setEditTitle(event.target.value);
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

    onSaveEdit(task.id, newTitle);

    setEditError("");
    setIsEditing(false);
  }

  if (isEditing) {
    return (
      <li className="task-item">
        <input
          type="text"
          className="edit-title-input"
          value={editTitle}
          onChange={handleChangeTitle}
        />

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
        {editError !== "" && <p className="form-error">{editError}</p>}
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
