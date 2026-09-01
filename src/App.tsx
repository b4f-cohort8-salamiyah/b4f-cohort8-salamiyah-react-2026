import { ChangeEvent, useState } from "react";
import Header from "./components/Header";
import StatCard from "./components/StatCard";
import TaskItem from "./components/TaskItem";
import SectionTitle from "./components/SectionTitle";
import PersonSummary from "./components/PersonSummary";

function App() {
  // const currentFilter = "completed";
  const [currentFilter, setCurrentFilter] = useState("all");
  const [searchText, setSearchText] = useState("");
  const [showTasks, setShowTasks] = useState(true);
  const [name, setName] = useState("");
  const [homework, setHomework] = useState(true);

  let greetingMessage = "";
  if (name === "") {
    greetingMessage = "";
  } else if (name === "esmaeel") {
    greetingMessage = "Welcome back, esmaeel.";
  } else {
    greetingMessage = "Hello, " + name + "!";
  }

  function handleShowAll(): void {
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

  function handleToggleTasks() {
    setShowTasks(!showTasks);
  }

  function handleNameChange(event: ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
  }

  function handleToggleHomework() {
    setHomework(!homework);
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
            onClick={handleShowAll}>
            All
          </button>
          <button
            className={`filter-button ${currentFilter === "completed" ? "active" : ""}`}
            onClick={handleShowCompleted}>
            Completed
          </button>
          <button
            className={`filter-button ${currentFilter === "pending" ? "active" : ""}`}
            onClick={handleShowPending}>
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

          {searchText ? (
            <p className="search-feedback">Searching for: {searchText}</p>
          ) : null}
        </section>
        {homework ? (
          <section className="search">
            <input
              type="text"
              className="search-input"
              placeholder="pleas enter your name..."
              value={name}
              onChange={handleNameChange}
            />
            {name ? <p className="search-feedback">{greetingMessage}</p> : null}
          </section>
        ) : null}
        {homework ? (
          <SectionTitle
            title="Users Task...!"
            subtitle="Manage your tasks efficiently"
          />
        ) : null}

        <button className="toggle-tasks-button" onClick={handleToggleTasks}>
          {showTasks ? "Hide Tasks" : "Show Tasks"}
        </button>
        <button className="toggle-tasks-button" onClick={handleToggleHomework}>
          {homework ? "Hide Homework" : "Show Homework"}
        </button>

        {showTasks ? (
          <ul className="task-list">
            {homework ? (
              <PersonSummary name="Leanne Graham" taskCount={1} />
            ) : null}
            <TaskItem
              title="Finish JavaScript exercise"
              ownerName="Leanne Graham"
              statusText="Pending"
              statusClass="pending"
            />
            {homework ? (
              <PersonSummary name="Ervin Howell" taskCount={1} />
            ) : null}
            <TaskItem
              title="Review pull request"
              ownerName="Ervin Howell"
              statusText="Completed"
              statusClass="completed"
            />
            {homework ? (
              <PersonSummary name="Clementine Bauch" taskCount={1} />
            ) : null}
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
