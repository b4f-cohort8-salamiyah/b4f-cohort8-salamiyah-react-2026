import { ChangeEvent, useState } from "react";
import Header from "./components/Header";
import StatCard from "./components/StatCard";
import TaskItem from "./components/TaskItem";
import SectionTitle from "./components/SectionTitle";
import NameGreeting from "./components/NameGreeting";

function App() {
  // const currentFilter = "all";
  const [currentFilter, setCurrentFilter] = useState("pending");
  const [searchText, setSearchText] = useState("");
  const [showTasks, setShowTasks] = useState(true);
  const [nameGreetingText, setNameGreetingText] = useState("");

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

  function handleNameGreetingChange(event: ChangeEvent<HTMLInputElement>) {
    setNameGreetingText(event.target.value);
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
        <button className="toggle-tasks-button" onClick={handleShowTasks}>
          {showTasks ? "Hide" : "Show"} Tasks
        </button>
        <section className="name-greeting">
          <input
            type="text"
            className="name-greeting-input"
            placeholder="Enter Your Name..."
            value={nameGreetingText}
            onChange={handleNameGreetingChange}
          />
          {nameGreetingText !== "" ?  <NameGreeting name={nameGreetingText} /> : null}
          
        </section>
        <SectionTitle title="Your Tasks" subTitle="This is the subtitle of your task"/>
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
