import { ChangeEvent, useState } from "react";
import Header from "./components/Header";
import StatCard from "./components/StatCard";
import TaskItem from "./components/TaskItem";
import SectionTitle from "./components/SectionTitle";
import PersonSummary from "./components/PersonSummary";


function App() {
  const [currentFilter, setCurrentFilter] = useState("all");
  const [searchText, setSearchText] = useState("");
  const [showTasks, setShowTasks] = useState(true);
 const [name, setName] = useState("");
 const [showGreetingSection, setShowGreetingSection] = useState(true);

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

function handleToggleGreeting() {
  setShowGreetingSection(!showGreetingSection);
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
        <div className="hw-toggle-wrapper">
          <button onClick={handleToggleGreeting} className="hw-toggle-button">
            {showGreetingSection ? "Hide " : "Show "}
          </button>
        </div>

        {showGreetingSection ?
          <div className="hw-greeting-card">
            <label className="hw-greeting-label">Control Name :</label>
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              placeholder="Type your name..."
              className="hw-greeting-input"
            />
            {name !== "" ?
              <p className="hw-greeting-output">{greetingMessage}</p>
            : null}
          </div>
        : null}

        <div className="hw-summary-card">
          <h3 className="hw-summary-header">Team Task Summary</h3>
          <PersonSummary name="Ali Mikdad" taskCount={2} />
          <PersonSummary name="Allaith Issa" taskCount={1} />
          <PersonSummary name="Ceniorrr Nawar " taskCount={0} />
        </div>

        <section className="search">
          <input
            type="text"
            className="search-input"
            placeholder="Search tasks..."
            value={searchText}
            onChange={handleSearchChange}
          />

          {searchText ?
            <p className="search-feedback">Searching for: {searchText}</p>
          : null}
        </section>

        <button className="toggle-tasks-button" onClick={handleToggleTasks}>
          {showTasks ? "Hide Tasks" : "Show Tasks"}
        </button>

        <SectionTitle
          title="Your Workspace Tasks"
          subtitle="Review, manage, and track your daily team operations below."
        />

        {showTasks ?
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
        : null}
      </main>
    </div>
  );
}

export default App;
