import { ChangeEvent, useState } from "react";
import Header from "./components/Header";
import StatCard from "./components/StatCard";
import TaskItem from "./components/TaskItem";

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

type FilterStatus = "all" | "completed" | "pending";

function App() {
  const [currentFilter, setCurrentFilter] = useState<FilterStatus>("all");
  const [searchText, setSearchText] = useState("");
  const [selectedUserId] = useState(0);

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

  function getOwnerName(userId: number): string {
    const user = users.find((user) => {
      return user.id === userId;
    });

    if (user) {
      return user.name;
    }

    return "Unknown person";
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
    } else if (selectedUserId === task.userId) {
      matchesPerson = true;
    }

    return matchesFilter && matchesSearch && matchesPerson;
  });

  const totalCount = tasks.length;

  const completedCount = tasks.reduce((count, task) => {
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
        </section>

        <ul className="task-list">
          {visibleTasks.map((task) => {
            return (
              <TaskItem
                title={task.title}
                ownerName={getOwnerName(task.userId)}
                statusText={task.completed ? "Completed" : "Pending"}
                statusClass={task.completed ? "completed" : "pending"}
              />
            );
          })}
        </ul>

        <p className="visible-count">
          {visibleTasks.length} of {totalCount} tasks shown
        </p>
        <p className="progress">
          {completedCount} of {totalCount} tasks completed
        </p>
      </main>
    </div>
  );
}

export default App;