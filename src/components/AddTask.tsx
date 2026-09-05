import { ChangeEvent, FormEvent, useState } from "react";

interface User {
  id: number;
  name: string;
}

interface AddTaskProps {
  selectedUserId: number;
  users: User[];
  addNewTask: (title: string, userId: number) => void;
}

function AddTask(props: AddTaskProps) {
  const [draftTitle, setDraftTitle] = useState("");
  const [draftUserId, setDraftUserId] = useState(0);
  const [error, setError] = useState("");
  function handleTitleChange(event: ChangeEvent<HTMLInputElement>) {
    setDraftTitle(event.target.value);
  }

  function handleUserChange(event: ChangeEvent<HTMLSelectElement>) {
    setDraftUserId(Number(event.target.value));
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const trimmedTitle = draftTitle.trim();
    if (trimmedTitle === "") {
      setError("Title can't be empty."); 
      return; 
      }
    const MAX_TITLE_LENGTH = 200;
    if (trimmedTitle.length > MAX_TITLE_LENGTH) {
      setError("Title is too long.");
      return;
  }
    props.addNewTask(draftTitle, draftUserId);
    setDraftTitle("");
    setDraftUserId(props.selectedUserId);
    setError("");
  }

  return (
    <form className="add-task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="add-task-input"
        placeholder="Add a new task..."
        value={draftTitle}
        onChange={handleTitleChange}
      />
      {error && <p className="form-error">{error}</p>}
      <select
        value={draftUserId}
        className="add-task-select"
        onChange={handleUserChange}
      >
        <option value={props.selectedUserId}>Select user</option>
        {props.users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>

      <button type="submit" className="add-task-button">
        Add Task
      </button>
    </form>
  );
}

export default AddTask;
