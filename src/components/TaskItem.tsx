import { ChangeEvent, useState } from "react";

interface TaskItemProps {
  id: number;
  title: string;
  ownerName: string;
  statusText: string;
  statusClass: string;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onSaveEdit: (id: number, title: string) => void;
}

const MAX_TITLE_LENGTH = 200;

function TaskItem({
  id,
  title,
  ownerName,
  statusText,
  statusClass,
  onToggle,
  onDelete,
  onSaveEdit,
}: TaskItemProps) {
  const [editTitle, setEditTitle] = useState(title);
  const [isEditing, setIsEditing] = useState(false);
  const [editError, setEditError] = useState("");

  function handleEditClick() {
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

    onSaveEdit(id, newTitle);

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
          {editError !== "" && <p className="form-error">{editError}</p>}
        </span>
      </li>
    );
  }

  return (
    <li className="task-item">
      <span className="task-text">
        <span className="task-title">{title}</span>
        <span className="task-user">{ownerName}</span>
      </span>
      <span className={`task-status ${statusClass}`}>{statusText}</span>
      <span className="task-actions">
        <button className="task-action-button" onClick={() => onToggle(id)}>
          {statusClass === "completed" ? "Mark Pending" : "Mark Completed"}
        </button>
        <button className="task-action-button" onClick={handleEditClick}>
          Edit
        </button>
        <button
          className="task-action-button delete-button"
          onClick={() => onDelete(id)}
        >
          Delete
        </button>
      </span>
    </li>
  );
}

export default TaskItem;
