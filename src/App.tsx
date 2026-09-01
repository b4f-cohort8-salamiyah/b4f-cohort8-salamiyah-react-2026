import { ChangeEvent, useState } from "react";
import Header from "./components/Header";
import StatCard from "./components/StatCard";
import TaskItem from "./components/TaskItem";
import SectionTitle from "./components/SectionTitle";
import PersonSummary from "./components/PersonSummary";

function App() {
  // const currentFilter = "all";
  const [currentFilter, setCurrentFilter] = useState("all");
  const [searchText, setSearchText] = useState("");
  const [showTasks, setShowTasks] = useState(true);
  const [showName, setShowName] = useState("");
  const [showInput, setShowInput] = useState(true);

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

  // create handle for name
  function handleShowName(event: ChangeEvent<HTMLInputElement>) {
    setShowName(event.target.value);
  }

  function handleShowInput() {
    setShowInput(!showInput);
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

        <button className="toggle-input-button" onClick={handleShowInput}>
          {showInput ? "Hide Input" : "Show Input"}
        </button>

        <section className="search">
          {showInput ? (
            <input
              type="text"
              className="search-input"
              placeholder="Search tasks..."
              value={searchText}
              onChange={handleSearchChange}
            />
          ) : null}

          {searchText !== "" ? (
            <p className="search-feedback">Searching for: {searchText}</p>
          ) : null}
        </section>

        <section className="name">
          <input
            type="text"
            className="name-input"
            placeholder="Enter name ..."
            value={showName}
            onChange={handleShowName}
          />

          {showName == "admin" ? (
            <p className="name-feedback">welcom admin, {showName}</p>
          ) : (
            <p className="name-feedback">{showName}</p>
          )}

          {showName !== "" ? (
            <p className="name-feedback">Hello, {showName}</p>
          ) : null}
        </section>

        <PersonSummary name="Nawar" taskCount={2} />
        <PersonSummary name="Ali" taskCount={3} />
        <PersonSummary name="Hasan" taskCount={5} />

        <button className="toggle-tasks-button" onClick={handleShowTasks}>
          {showTasks ? "Hide Tasks" : "Show Tasks"}
        </button>

        <SectionTitle title="Your Task:" subtitle="Explain Your Task" />
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
