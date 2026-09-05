import { ChangeEvent, FormEvent, useState } from "react";

interface User {
  id: number;
  name: string;
}

interface AddTaskProps {
  defaultUserId: number;
  users: User[];
  onAddTask: (title: string, userId: number) => void;
}

const MAX_TITLE_LENGTH = 50;

function AddTask(props: AddTaskProps) {
  const [draftUserId, setDraftUserId] = useState(0);
  const [draftTitle, setDraftTitle] = useState("");
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
    if (trimmedTitle.length > MAX_TITLE_LENGTH) {
      setError(`Title can't be longer than ${MAX_TITLE_LENGTH} characters.`);
      return;
    }

    props.onAddTask(trimmedTitle, draftUserId);

    setDraftTitle("");
    setDraftUserId(props.defaultUserId);
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

      <select
        className="add-task-select"
        value={draftUserId}
        onChange={handleUserChange}
      >
        <option value={props.defaultUserId}>Select user</option>

        {props.users.map((user) => {
          return (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          );
        })}
      </select>

      <button className="add-task-button" type="submit">
        Add Task
      </button>

      {error ? <p className="form-error">{error}</p> : null}
    </form>
  );
}

export default AddTask;
