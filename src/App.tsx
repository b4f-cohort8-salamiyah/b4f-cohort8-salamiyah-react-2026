import { useState } from "react";
import type { ChangeEvent } from "react";
import Header from "./components/Header";
import StatCard from "./components/StatCard";
import TaskItem from "./components/TaskItem";
import SectionTitle from "./components/SectionTitle";
import PersonSummary from "./components/PersonSummary";

interface Task {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

interface User {
  id: number;
  name: string;
}

type FilterStatus = "all" | "completed" | "pending";

const tasks: Task[] = [
  { id: 1, userId: 1, title: "Finish JavaScript exercise", completed: false },
  { id: 2, userId: 2, title: "Review pull request", completed: true },
  { id: 3, userId: 3, title: "Write session notes", completed: false },
  { id: 4, userId: 1, title: "Update project README", completed: true },
  { id: 5, userId: 2, title: "Fix search bug", completed: false },
  { id: 6, userId: 3, title: "Plan sprint review", completed: true },
];

const users: User[] = [
  { id: 1, name: "Leanne Graham" },
  { id: 2, name: "Ervin Howell" },
  { id: 3, name: "Clementine Bauch" },
];

function getOwnerName(userId: number): string {
  const user = users.find(function (user) {
    return user.id === userId;
  });
  if (user) {
    return user.name;
  }
  return "Unknown person";
}

function App() {
  const [currentFilter, setCurrentFilter] = useState<FilterStatus>("all");
  const [searchText, setSearchText] = useState("");
  const [showTasks, setShowTasks] = useState(true);
  const [name, setName] = useState("");
  const [showGreeting, setShowGreeting] = useState(true);
  const [selectedUserId, setSelectedUserId] = useState(0);

  function handelShowGreeting(): void {
    setShowGreeting(!showGreeting);
  }

  function handleNameChange(event: ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
  }

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

  function handleShowAllPeople() {
    setSelectedUserId(0);
  }

  let greetingMessage = "";
  if (name === "") {
    greetingMessage = "";
  } else if (name === "admin") {
    greetingMessage = "Welcome back, admin.";
  } else {
    greetingMessage = "Hello, " + name + "!";
  }

  const search = searchText.toLowerCase();
  const visibleTasks = tasks.filter((task) => {
    let matchesFilter = false;
    if (currentFilter === "all") {
      matchesFilter = true;
    } else if (currentFilter === "completed" && task.completed) {
      matchesFilter = true;
    } else if (currentFilter === "pending" && !task.completed) {
      matchesFilter = true;
    }

    const title = task.title.toLowerCase();
    const matchesSearch = title.includes(search);

    let matchesPerson = false;
    if (selectedUserId === 0) {
      matchesPerson = true;
    } else if (task.userId === selectedUserId) {
      matchesPerson = true;
    }

    return matchesFilter && matchesSearch && matchesPerson;
  });

  const totalCount = tasks.length;
  const completedCount = tasks.reduce(function (count, task) {
    if (task.completed) {
      return count + 1;
    }
    return count;
  }, 0);
  const pendingCount = totalCount - completedCount;

  return (
    <div>
      <Header />
      <main className="container">
        <section className="stats">
          <StatCard label="Total Tasks" value={totalCount} />
          <StatCard label="Completed" value={completedCount} />
          <StatCard label="Pending" value={pendingCount} />
        </section>

        <section className="filters">
          <button onClick={() => setShowTasks(!showTasks)}>
            {showTasks ? "Hide Tasks" : "Show Tasks"}
          </button>

          <button
            className={
              "filter-button" + (currentFilter === "all" ? " active" : "")
            }
            onClick={handleShowAll}>
            All
          </button>
          <button
            className={
              "filter-button" + (currentFilter === "completed" ? " active" : "")
            }
            onClick={handleShowCompleted}>
            Completed
          </button>
          <button
            className={
              "filter-button" + (currentFilter === "pending" ? " active" : "")
            }
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
        </section>

        <SectionTitle
          title="Your Tasks"
          subtitle="Everything on your plate right now."
        />

        <button className="toggle-greeting-button" onClick={handelShowGreeting}>
          {showGreeting ? "Hide Greeting Section" : "Show Greeting Section"}
        </button>

        {showGreeting ? (
          <div className="name-input-section">
            <input
              className="name-input"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={handleNameChange}
            />
            {name !== "" ? <p>{greetingMessage}</p> : null}
          </div>
        ) : null}

        <section className="filters">
          <button
            className={
              "filter-button" + (selectedUserId === 0 ? " active" : "")
            }
            onClick={handleShowAllPeople}>
            All people
          </button>
          {users.map((user) => (
            <button key={user.id} className="filter-button">
              {user.name}
            </button>
          ))}
        </section>

        <ul className="task-list">
          {visibleTasks.map((task) => {
            const statusText = task.completed ? "Completed" : "Pending";
            const statusClass = task.completed ? "completed" : "pending";
            return (
              <TaskItem
                key={task.id}
                title={task.title}
                ownerName={getOwnerName(task.userId)}
                statusText={statusText}
                statusClass={statusClass}
              />
            );
          })}
        </ul>

        <p className="visible-count">
          {visibleTasks.length} of {tasks.length} tasks shown
        </p>
        <p className="progress">
          {completedCount} of {totalCount} tasks completed
        </p>
      </main>
    </div>
  );
}

export default App;
