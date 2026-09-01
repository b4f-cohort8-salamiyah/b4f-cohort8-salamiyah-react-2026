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
  const [showName, setName] = useState("");
  const [showGreeting, setGreeting] = useState(true);

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
  function handleShowGreeting() {
    setGreeting(!showGreeting);
  }

  let greetingMessage = "";
  if (showName === "") {
    greetingMessage = "";
  } else if (showName === "admin") {
    greetingMessage = "Welcome back, admin.";
  } else {
    greetingMessage = "Hello, " + showName + "!";
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
        <button className="toggle-greeting" onClick={handleShowGreeting}>
          {showGreeting ? "Hide greeting" : "Show greeting"}
        </button>

        <section className="name">
          <input
            type="text"
            className="name-input"
            placeholder="put your name here..."
            value={showName}
            onChange={handleNameChange}
          />
          {showGreeting && showName !== "" ? (
            <p className="greeting">{greetingMessage}</p>
          ) : null}
        </section>

        <button className="toggle-tasks-button" onClick={handleShowTasks}>
          {showTasks ? "Hide Tasks" : "Show Tasks"}
        </button>
        <SectionTitle
          title="Your Tasks"
          subtitle="This is your taskflow"
        ></SectionTitle>
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
        <PersonSummary name="Leanne Graham" taskCount={2}></PersonSummary>
        <PersonSummary name="Clementine Bauch" taskCount={1}></PersonSummary>
        <PersonSummary name="Hamid alhaj" taskCount={0}></PersonSummary>
      </main>
    </div>
  );
}

export default App;
