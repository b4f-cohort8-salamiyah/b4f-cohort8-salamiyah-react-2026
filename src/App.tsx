import { ChangeEvent, useState } from "react";
import Header from "./components/Header";
import StatCard from "./components/StatCard";
import TaskItem from "./components/TaskItem";
import SectionTitle from "./components/SectionTitle";
import PersonSummary from "./components/PersonSummary";

function App() {
  const [currentFilter, setCurrentFilter] = useState("pending");
  const [searchText, setSearchText] = useState("");
  const [showTasks, setShowTasks] = useState(true);

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


  {/* Solution Here*/ }
  
  const [showMessage, setShowMessage] = useState(true);
  function handleShowMessage() {
      setShowMessage(!showMessage);
    }


  function handleGreetingMessage(event: ChangeEvent<HTMLInputElement>) {
    greetingMessage(event.target.value);
  }

  const [Name, greetingMessage] = useState("");
  let Message = "";
  if (Name === "") {
    Message = "";
  } else if (Name === "admin") {
    Message = "Welcome back, admin.";
  } else {
    Message = "Hello, " + Name + "!";
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
        <button
          className="filter-button"
          style={{ marginTop: "10px" }}
          onClick={handleShowTasks}
        >
          {showTasks ? " HideTask" : "Show Task"}{" "}
        </button>

        {/* Solution Here*/}
        <section>
          <input
            type="text"
            className="search-input"
            placeholder="Write Your Name ..."
            value={Name}
            style={{ marginTop: "10px" }}
            onChange={handleGreetingMessage}
          />

          {showMessage ? (
            <div>
              {Name !== "" ? (
                <p className="search-feedback"> {Message}</p>
              ) : null}
            </div>
          ) : null}
        </section>

        <button
          className="filter-button"
          style={{ marginTop: "10px" }}
          onClick={handleShowMessage}
        >
          {showMessage ? " Hide Message" : "Show Message"}{" "}
        </button>

        {/* Solution Here  */}
        <SectionTitle title="Your Tasks" subtitle="Great Job" />

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
            <TaskItem
              title="Do Sport"
              ownerName="Clementine Bauch"
              statusText="Pending"
              statusClass="pending"
            />

            <TaskItem
              title="Go Shopping"
              ownerName="Milla Bauch"
              statusText="Complated"
              statusClass="Complated"
            />
          </ul>
        ) : null}

        {/* Solution Here*/}
        <section className="stats">
          <PersonSummary name="Milla Bauch" taskCount={1} />

          <PersonSummary name="Clementine Bauch" taskCount={2} />

          <PersonSummary name="Leanne Graham" taskCount={2} />
        </section>
      </main>
    </div>
  );
}

export default App;
