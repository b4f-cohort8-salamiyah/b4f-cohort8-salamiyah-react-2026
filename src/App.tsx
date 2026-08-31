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
  const [showGreeting, setShowGreeting] = useState(true);
  const [name, setName] = useState("");

  function handleShowAll(): void {
    setCurrentFilter("all");
  }

  function handleNameChange(event: ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
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

  function handleToggleGreeting() {
    setShowGreeting(!showGreeting);
  }
  let greetingMessage = "";

  if (name === "") {
    greetingMessage = "";
  } else if (name === "badr") {
    greetingMessage = "Welcome back, Badr.";
  } else {
    greetingMessage = "Hello, " + name + "!";
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
        <div className="name-greeting">
          {showGreeting ? (
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              placeholder="Enter Your name"
            />
          ) : null}

          <button
            className="toggle-greeting-button"
            onClick={handleToggleGreeting}
          >
            {showGreeting ? "Hide Greeting" : "Show Greeting"}
          </button>

          {showGreeting && name ? <p>{greetingMessage}</p> : null}
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

        <SectionTitle
          title={"User's Tasks"}
          subtitle="Here Are your tasks"
        ></SectionTitle>
        {showTasks ? (
          <ul className="task-list">
            <TaskItem
              title="Finish JavaScript exercise"
              ownerName="Leanne Graham"
              statusText="Pending"
              statusClass="pending"
            />{" "}
            <PersonSummary name="Leanne Graham" taskCount={1} />
            <TaskItem
              title="Review pull request"
              ownerName="Ervin Howell"
              statusText="Completed"
              statusClass="completed"
            />{" "}
            <PersonSummary name="Ervin Howell" taskCount={1} />
            <TaskItem
              title="Write session notes"
              ownerName="Clementine Bauch"
              statusText="Pending"
              statusClass="pending"
            />
            <PersonSummary name="Clementine Bauch" taskCount={1} />
          </ul>
        ) : null}
      </main>
    </div>
  );
}

export default App;
