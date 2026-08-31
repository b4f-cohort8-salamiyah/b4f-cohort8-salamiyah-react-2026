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
        <PersonSummary name="Ali Alhamwi" taskCount={3} />
        <PersonSummary name="Majed Hmoud" taskCount={2} />
        <PersonSummary name="Adham Albasha" taskCount={1} />

        <button
          className="toggle-greeting-button"
          onClick={handleToggleGreeting}
        >
          {showGreeting ? "Hide Greeting" : "Show Greeting"}
        </button>
        {showGreeting ? (
          <section className="name-section">
            <label htmlFor="name-input">Your name</label>

            <input
              id="name-input"
              type="text"
              className="name-input"
              placeholder="Enter your name..."
              value={name}
              onChange={handleNameChange}
            />

            {name !== "" ? <p className="greeting">{greetingMessage}</p> : null}
          </section>
        ) : null}

        <button className="toggle-tasks-button" onClick={handleShowTasks}>
          {showTasks ? "Hide Tasks" : "Show Tasks"}
        </button>

        <SectionTitle title="Task List" subtitle="Keep track of your tasks" />

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
