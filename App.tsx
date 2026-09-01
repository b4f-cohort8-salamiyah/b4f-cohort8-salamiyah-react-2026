import { useState } from "react";
import type { ChangeEvent } from "react";
import Header from "./components/Header";
import StatCard from "./components/StatCard";
import TaskItem from "./components/TaskItem";
import SectionTitle from "./components/SectionTitle";
import PersonSummary from "./components/PersonSummary";

function App() {
  const [currentFilter, setCurrentFilter] = useState("pending");
  const [searchText, setSearchText] = useState("");
  const [showTasks, setShowTasks] = useState(true);

  const [name, setName] = useState("");
  const [showGreeting, setShowGreeting] = useState(true);

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

  function handleShowTasks() {
    setShowTasks(!showTasks);
  }

  function handleNameChange(event: ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
  }

  function handleToggleGreeting() {
    setShowGreeting(!showGreeting);
  }

  let greetingMessage = "";
  if (name === "") {
    greetingMessage = "";
  } else if (name === "admin") {
    greetingMessage = "Welcome back, admin.";
  } else {
    greetingMessage = "Hello, " + name + "!";
  }

  return (
    <div>
      <Header />
      <main className="container">

        <button onClick={handleToggleGreeting}>
          {showGreeting ? "Hide Greeting" : "Show Greeting"}
        </button>

        {showGreeting ? (
          <div>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={handleNameChange}
            />
            {name !== "" ? <p>{greetingMessage}</p> : null}
          </div>
        ) : null}

        <section className="stats">
          <StatCard label="Total Tasks" value={3} />
          <StatCard label="Completed" value={1} />
          <StatCard label="Pending" value={2} />
        </section>

        <PersonSummary name="Alex" taskCount={5} />
        <PersonSummary name="Sarah" taskCount={3} />
        <PersonSummary name="John" taskCount={2} />

        <section className="filters">
          <button
            className={"filter-button" + (currentFilter === "all" ? " active" : "")}
            onClick={handleShowAll}
          >
            All
          </button>
          <button
            className={"filter-button" + (currentFilter === "completed" ? " active" : "")}
            onClick={handleShowCompleted}
          >
            Completed
          </button>
          <button
            className={"filter-button" + (currentFilter === "pending" ? " active" : "")}
            onClick={handleShowPending}
          >
            Pending
          </button>
        </section>

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

        <button className="toggle-tasks-button" onClick={handleShowTasks}>
          {showTasks ? "Hide tasks" : "Show tasks"}
        </button>

        <SectionTitle title="Your Tasks" subtitle="Manage your daily productivity" />

        {showTasks ? (
          <ul className="task-list">
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