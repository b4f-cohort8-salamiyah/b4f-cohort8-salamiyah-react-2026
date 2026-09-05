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
  const [placeHolder, setPlaceHolder] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function handleEditClick() {
    setIsEditing(true);
  }

  function handleEditChange(event: ChangeEvent<HTMLInputElement>) {
    setErrorMessage("");
    setPlaceHolder("");
    setEditTitle(event.target.value);
  }

  function handleSaveClick() {
    const newTitle = editTitle.trim();
    if (!newTitle) {
      setPlaceHolder("Too Empty");
      setErrorMessage("Error : please don't set an empty value to the task title");
      return;
    }
    if(newTitle.length > 20){
      setPlaceHolder("Too Long");
      setErrorMessage("Error : please don't make task more than 20 characters");
      return;
    }
    setEditTitle(editTitle.trim());
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
          placeholder={placeHolder}
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
        {errorMessage?<span className="form-error">{errorMessage}</span>:<span className="form-error"></span>}
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
