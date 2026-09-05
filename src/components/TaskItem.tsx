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

function TaskItem(props: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(props.title);
  const [error, setError] = useState("");

  function handleEditClick() {
    setIsEditing(true);
  }

  function handleEditChange(event: ChangeEvent<HTMLInputElement>) {
    setEditTitle(event.target.value);
  }

  function handleSaveClick() {
    const newTitle = editTitle.trim();
    if (newTitle === "") {
      setError("Title can't be empty.");

      return;
    }
    if(newTitle.length> 50){
      setError("Title is too long. Maximum 50 characters allowed.");
      return;
    }
    if (!newTitle) {
      return;
    }

    props.onSaveEdit(props.id, newTitle);
    setIsEditing(false);
  }

  function handleCancelClick() {
    setIsEditing(false);
  }

  if (isEditing) {
    return (
      <li className="task-item">
        <input
          type="text"
          className="edit-title-input"
          value={editTitle}
          onChange={handleEditChange}
        />
        {error && <p className="form-error">{error}</p>}
        <span className="task-actions">
          <button
            className="task-action-button save-button"
            onClick={handleSaveClick}>
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
        <span className="task-title">{props.title}</span>
        <span className="task-user">{props.ownerName}</span>
      </span>
      <span className={`task-status ${props.statusClass}`}>
        {props.statusText}
      </span>
      <span className="task-actions">
        <button
          className="task-action-button"
          onClick={() => props.onToggle(props.id)}
        >
          {props.statusClass === "completed"
            ? "Mark Pending"
            : "Mark Completed"}
        </button>
        <button className="task-action-button" onClick={handleEditClick}>
          Edit
        </button>
        <button
          className="task-action-button delete-button"
          onClick={() => props.onDelete(props.id)}
        >
          Delete
        </button>
      </span>
    </li>
  );
}

export default TaskItem;
