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

const MAX_TITLE_LENGTH = 200;

function AddTask(props: AddTaskProps) {
  const [draftUserId, setDraftUserId] = useState(0);
  const [draftTitle, setDraftTitle] = useState("");
  const [formError, setFormError] = useState("");

  function handleTitleChange(event: ChangeEvent<HTMLInputElement>) {
    setDraftTitle(event.target.value);
  }

  function handleUserChange(event: ChangeEvent<HTMLSelectElement>) {
    setDraftUserId(Number(event.target.value));
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const trimmedTitle = draftTitle.trim();

    if (!trimmedTitle) {
      setFormError("Title can't be empty.");
      return;
    }

    if (trimmedTitle.length > MAX_TITLE_LENGTH) {
      setFormError(`Title must be ${MAX_TITLE_LENGTH} characters or fewer.`);
      return;
    }

    props.onAddTask(trimmedTitle, draftUserId);

    setDraftTitle("");
    setDraftUserId(props.defaultUserId);
    setFormError("");
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
          return <option value={user.id}>{user.name}</option>;
        })}
      </select>

      <button className="add-task-button" type="submit">
        Add Task
      </button>
      {formError !== "" && <p className="form-error">{formError}</p>}
    </form>
  );
}

export default AddTask;
