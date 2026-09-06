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
  const [editTitle, setEditTitle] = useState(props.title);
  const [isEditing, setIsEditing] = useState(false);
  const [errorMessage , setErrorMessage] = useState("");

  function handleEditClick() {
    setEditTitle(props.title);
    setErrorMessage("");
    setIsEditing(true);
  }

  function handleChangeTitle(event: ChangeEvent<HTMLInputElement>) {
    setEditTitle(event.target.value);
     if (errorMessage) {
      setErrorMessage("");
    }
  }

  function handleCancelClick() {
    setErrorMessage("");
    setEditTitle(props.title);
    setIsEditing(false);
  }

  function handleSaveClick() {
     
    const newTitle = editTitle.trim();

    if (!newTitle) {
      setErrorMessage("Title can't be empty.");
      return;
    }
    if(newTitle.length > 200)
    {
      setErrorMessage("Input exceeds the maximum character limit.");
      return;
    }

    setErrorMessage("");
    props.onSaveEdit(props.id, newTitle);
    setIsEditing(false);
  }

  if (isEditing) {
    return (
      <div>
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
      </li>
      {errorMessage && <p className="form-error">{errorMessage}</p>}
      </div>
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
