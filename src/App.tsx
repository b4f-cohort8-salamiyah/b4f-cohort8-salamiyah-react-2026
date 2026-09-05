import { useState } from "react";
import type { ChangeEvent } from "react";
import Header from "./components/Header";
import StatCard from "./components/StatCard";
import TaskItem from "./components/TaskItem";
import SectionTitle from "./components/SectionTitle";
// import PersonSummary from "./components/PersonSummary";
import AddTask from "./components/AddTask";

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

const initialTasks: Task[] = [
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
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [tasks, setTasks] = useState(initialTasks);

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

  function handleShowPerson(userId: number) {
    setSelectedUserId(userId);
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
  const peopleWithCounts = users
    .map((user) => {
      const taskCount = tasks.filter((task) => task.userId === user.id).length;

      return {
        user: user,
        taskCount: taskCount,
      };
    })
    .filter((person) => person.taskCount > 0);

  function handleToggle(id: number): void {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }

      return task;
    });

    setTasks(updatedTasks);
  }

  function handleDeleted(id: number): void {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  }

  function handleSaveEdit(id: number, newTitle: string): void {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, title: newTitle };
      }

      return task;
    });

    setTasks(updatedTasks);
  }
  function handleAddTask(title: string, userId: number): void {
    const newTask: Task = {
      id: Date.now(),
      userId: userId,
      title: title,
      completed: false,
    };

    setTasks([...tasks, newTask]);
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
            className={
              "filter-button" + (currentFilter === "all" ? " active" : "")
            }
            onClick={handleShowAll}
          >
            All
          </button>
          <button
            className={
              "filter-button" + (currentFilter === "completed" ? " active" : "")
            }
            onClick={handleShowCompleted}
          >
            Completed
          </button>
          <button
            className={
              "filter-button" + (currentFilter === "pending" ? " active" : "")
            }
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

        <SectionTitle
          title="Your Tasks"
          subtitle="Everything on your plate right now."
        />

        <AddTask
          selectedUserId={selectedUserId}
          users={users}
          addNewTask={handleAddTask}
        />

        {/* <section className="people-summary">
          {users.map((user) => {
            const personTaskCount = tasks.filter(
              (task) => task.userId === user.id,
            ).length;

            if (personTaskCount === 0) {
              return null;
            }

            return (
              <PersonSummary
                key={user.id}
                name={user.name}
                taskCount={personTaskCount}
              />
            );
          })}
        </section> */}

        {/* <section className="people-summary">
          {peopleWithCounts.map((person) => (
            <PersonSummary
              key={person.user.id}
              name={person.user.name}
              taskCount={person.taskCount}
            />
          ))}
        </section> */}

        <section className="people-filters">
          <button
            className={
              "filter-button" + (selectedUserId === 0 ? " active" : "")
            }
            onClick={handleShowAllPeople}
          >
            All people
          </button>
          <div className="people-buttons">
            {peopleWithCounts.map((person) => (
              <button
                key={person.user.id}
                className={
                  "filter-button" +
                  (selectedUserId === person.user.id ? " active" : "")
                }
                onClick={() => handleShowPerson(person.user.id)}
              >
                {person.user.name} ({person.taskCount})
              </button>
            ))}
          </div>
        </section>

        {visibleTasks.length === 0 ? (
          <p className="empty-state">No tasks to show.</p>
        ) : (
          <ul className="task-list">
            {visibleTasks.map((task) => {
              const statusText = task.completed ? "Completed" : "Pending";
              const statusClass = task.completed ? "completed" : "pending";

              return (
                <TaskItem
                  key={task.id}
                  id={task.id}
                  title={task.title}
                  ownerName={getOwnerName(task.userId)}
                  statusText={statusText}
                  statusClass={statusClass}
                  onToggle={handleToggle}
                  onDelete={handleDeleted}
                  onSaveEdit={handleSaveEdit}
                />
              );
            })}
          </ul>
        )}

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
