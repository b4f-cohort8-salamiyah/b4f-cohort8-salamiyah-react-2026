import { ChangeEvent, useEffect, useState } from "react";
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

// ✅ FIXED: This is now a proper React component (capitalized)
function FetchAllTask() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [allTasks, setAllTasks] = useState<Task[]>([]); // ✅ Typed as Task[]

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data: Task[]) => { // ✅ Type the data
        setAllTasks(data); // ✅ Store the data
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  // ✅ Return the fetched tasks (or use them in your component)
  return allTasks;
}

// ❌ Remove this static data - we'll use the fetched data instead
// const tasks: Task[] = [ ... ];

const users: User[] = [
  { id: 1, name: "Leanne Graham" },
  { id: 2, name: "Ervin Howell" },
  { id: 3, name: "Clementine Bauch" },
];

type FilterStatus = "all" | "completed" | "pending";

function App() {
  // ✅ State for fetched tasks
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [currentFilter, setCurrentFilter] = useState<FilterStatus>("all");
  const [searchText, setSearchText] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(0); // ✅ Made this settable

  // ✅ Fetch tasks when component mounts
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data: Task[]) => {
        setTasks(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

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

  // ✅ Filter tasks (now using fetched data)
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

  // ✅ Show loading/error states
  if (loading) {
    return (
      <div>
        <Header />
        <main className="container">
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <h2>Loading tasks...</h2>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Header />
        <main className="container">
          <div style={{ textAlign: 'center', padding: '40px', color: 'red' }}>
            <h2>Error: {error}</h2>
            <p>Please try again later.</p>
          </div>
        </main>
      </div>
    );
  }

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
                key={task.id} // ✅ Always add key when mapping
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