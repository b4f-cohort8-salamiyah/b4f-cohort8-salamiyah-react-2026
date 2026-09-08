import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import type { User } from "../types";

interface AddTaskProps {
  selectedUserId: number;
  users: User[];
  onAddTask: (title: string, userId: number) => void;
}

const MAX_TITLE_LENGTH = 200;

function AddTask({ selectedUserId, users, onAddTask }: AddTaskProps) {
  const [draftTitle, setDraftTitle] = useState("");
  const [draftUserId, setDraftUserId] = useState(0);
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

    if (trimmedTitle === "") {
      setFormError("Title can't be empty.");
      return;
    }

    if (trimmedTitle.length > MAX_TITLE_LENGTH) {
      setFormError(`Title must be ${MAX_TITLE_LENGTH} characters or fewer.`);
      return;
    }

    onAddTask(trimmedTitle, draftUserId);

    setDraftTitle("");
    setDraftUserId(selectedUserId);
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
        <option value={selectedUserId}>Select user</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>

      <button type="submit" className="add-task-button">
        Add Task
      </button>
      {formError !== "" && <p className="form-error">{formError}</p>}
    </form>
  );
}

export default AddTask;
