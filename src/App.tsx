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
  const [hideTask, setHideTask] = useState(true);

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
  function hadlenamechange(event: ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
  }
  function handleHideTask() {
    setHideTask(!hideTask);
  }

  let greetingmessage = "";
  if (name === "") {
    greetingmessage = "";
  } else if (name === "admin") {
    greetingmessage = "Welcome back, admin.";
  } else {
    greetingmessage = "Hello, " + name + "!";
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

        <div className="person-summary">
          <PersonSummary name="eyad ebraheem" taskcount={3} />
          <PersonSummary name="mr super nawar" taskcount={3} />
          <PersonSummary name="ali" taskcount={3} />
        </div>

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

          {searchText ? (
            <p className="search-feedback">Searching for: {searchText}</p>
          ) : null}
        </section>

        <button className="toggle-tasks-button" onClick={handleToggleTasks}>
          {showTasks ? "Hide Tasks" : "Show Tasks"}
        </button>
        {hideTask ? (
        <section className="name-input-section">
          <input
            type="text"
            className="name-input"
            placeholder="Enter your name..."
            value={name}
            onChange={hadlenamechange}
          />
          {name ? <p className="name-feedback">{greetingmessage}!</p> : null}
           
        </section>
        ) : null}
        <button className="toggle-tasks-button" onClick={handleHideTask}>
          {hideTask ? "Hide" : "Show"}
        </button>

        <SectionTitle
          title={"our tasks:"}
          subtitle={"Here are your tasks for the day"}
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
              ownerName="Ervin Howell"
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
