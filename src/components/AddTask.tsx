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

const MAX_TITLE_LENGTH = 200;

function AddTask(props: AddTaskProps) {
  const [draftTitle, setDraftTitle] = useState("");
  const [draftUserId, setDraftUserId] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

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
      setErrorMessage("Title can't be empty.");
      return;
    }

    if (trimmedTitle.length > MAX_TITLE_LENGTH) {
      setErrorMessage(
        `Title is too long. Maximum allowed is ${MAX_TITLE_LENGTH} characters.`,
      );
      return;
    }

    setErrorMessage("");
    props.addNewTask(trimmedTitle, draftUserId);

      setDraftTitle("");
    setDraftUserId(props.selectedUserId);
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

      {errorMessage && <p className="form-error">{errorMessage}</p>}
    </form>
  );
}

export default AddTask;
