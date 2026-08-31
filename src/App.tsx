import { ChangeEvent, useState } from "react";
import Header from "./components/Header";
import StatCard from "./components/StatCard";
import TaskItem from "./components/TaskItem";
import SectionTitle from "./components/SectionTitle";
import PersonSummary from "./components/PersonSummary";

function App() {
  // const currentFilter = "all";
  const [currentFilter, setCurrentFilter] = useState("pending");
  const [searchText, setSearchText] = useState("");
  const [showTasks, setShowTasks] = useState(true);
  const [name, setName] = useState("");
  const [showGreetingMessage, setShowGreetingMessage] = useState(true);

  let greetingMessage = "";
  if (name === "") {
    greetingMessage = "";
  } else if (name === "admin") {
    greetingMessage = "Welcome back, admin.";
  } else {
    greetingMessage = "Hello, " + name + "!";
  }
  function handleShowAll() {
    setCurrentFilter("all");
  }

  function handleShowCompleted() {
    setCurrentFilter("completed");
  }

  function handleShowPending() {
    setCurrentFilter("pending");
  }

  function handleSearchChange(event: ChangeEvent<HTMLInputElement>) {
    setSearchText(event.target.value);
  }

  function handleNameChange(event: ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
  }
  function handleShowTasks() {
    setShowTasks(!showTasks);
  }

  function handleShowgreetingMessage() {
    setShowGreetingMessage(!showGreetingMessage);
  }

  return (
    <div>
      <Header />
      <main className="container">
        <section className="stats">
          <StatCard label="Total Tasks" value={3} />
          <StatCard label="Completed" value={1} />
          <StatCard label="Pending" value={2} />
        </section>

        <section className="filters">
          <button
            className={`filter-button ${currentFilter === "all" ? "active" : ""}`}
            onClick={handleShowAll}
          >
            All
          </button>
          <button
            className={`filter-button ${currentFilter === "completed" ? "active" : ""}`}
            onClick={handleShowCompleted}
          >
            Completed
          </button>
          <button
            className={`filter-button ${currentFilter === "pending" ? "active" : ""}`}
            onClick={handleShowPending}
          >
            Pending
          </button>
        </section>

        <section className="search">
          <input
            type="text"
            className="search-input"
            placeholder="Search tasks..."
            value={searchText}
            onChange={handleSearchChange}
          />

          {searchText !== "" ? (
            <p className="search-feedback">Searching for: {searchText}</p>
          ) : null}
        </section>

        {showGreetingMessage ? (
          <div className="namegreeting">
            <input
              type="text"
              className="name-input"
              placeholder="please Enter Your Name..."
              value={name}
              onChange={handleNameChange}
            />

            {name !== "" ? <p>{greetingMessage}</p> : null}
          </div>
        ) : null}
        <button
          className="toggle-tasks-button"
          onClick={handleShowgreetingMessage}
        >
          {showGreetingMessage ? "Hide Greeting" : "Show Greeting"}
        </button>

        <button className="toggle-tasks-button" onClick={handleShowTasks}>
          {showTasks ? "Hide Tasks" : "Show Tasks"}
        </button>

        <PersonSummary name="Ghazal Daoun" taskCount={10} />
        <PersonSummary name="Shiam Azzo" taskCount={16} />
        <PersonSummary name="Asmaa Dayoub" taskCount={30} />

        <SectionTitle
          title="Critical Tasks"
          subtitle="Critical Tasks for first production"
        />
        {showTasks ? (
          <ul className="task-list">
            <TaskItem
              title="Finish JavaScript exercise"
              ownerName="Leanne Graham"
              statusText="Pending"
              statusClass="pending"
            />

            <TaskItem
              title="Review pull request"
              ownerName="Leanne Graham"
              statusText="Completed"
              statusClass="completed"
            />

            <TaskItem
              title="Write session notes"
              ownerName="Clementine Bauch"
              statusText="Pending"
              statusClass="pending"
            />
          </ul>
        ) : null}
      </main>
    </div>
  );
}

export default App;
