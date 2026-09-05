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
  const [errorMessage, setErrorMessage] = useState("");

  function handleTitleChange(event: ChangeEvent<HTMLInputElement>) {
    setDraftTitle(event.target.value);
  }

  function handleUserChange(event: ChangeEvent<HTMLSelectElement>) {
    setDraftUserId(Number(event.target.value));
  }

  function handleSubmit(event: FormEvent) {
    
    event.preventDefault();
    if(!draftTitle){
      setErrorMessage("please Add a Title to the task")
      return;
    }
    if(!draftUserId){
      setErrorMessage("please Add a User to the task")
      return;
    }
    if(draftTitle.length > 20){
      setErrorMessage("please don't pass the maximum character size of (20)")
      return;
    }

    props.addNewTask(draftTitle, draftUserId);

    setDraftTitle("");
    setDraftUserId(props.selectedUserId);
    setErrorMessage("");
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

      {errorMessage?<span className="form-error">{errorMessage}</span>:<span className="form-error"></span>}
    </form>
  );
}

export default AddTask;
