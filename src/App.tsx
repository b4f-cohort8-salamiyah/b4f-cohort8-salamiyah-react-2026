import { useEffect, useState } from "react";
import type { FilterStatus, Task, User } from "./types";
import { fetchTasks, fetchUsers } from "./api";
import Header from "./components/Header";
import StatsBar from "./components/StatsBar";
import Controls from "./components/Controls";
import SectionTitle from "./components/SectionTitle";
import PeopleSummary from "./components/PeopleSummary";
import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";
import EmptyState from "./components/EmptyState";
import ProgressText from "./components/ProgressText";

const TASKS_STORAGE_KEY = "taskflow-tasks";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [currentFilter, setCurrentFilter] = useState<FilterStatus>("all");
  const [searchText, setSearchText] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(0);

  const [isLoadingTasks, setIsLoadingTasks] = useState(true);
  const [hasTaskError, setHasTaskError] = useState(false);
  const [hasUsersError, setHasUsersError] = useState(false);

  async function loadTasksData() {
    setIsLoadingTasks(true);
    setHasTaskError(false);

    try {
      const data = await fetchTasks();
      saveTasks(data);
      setIsLoadingTasks(false);
    } catch {
      setHasTaskError(true);
      setIsLoadingTasks(false);
    }
  }

  async function loadUsersData() {
    setHasUsersError(false);

    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch {
      setHasUsersError(true);
    }
  }

  useEffect(() => {
    const storedTasks = loadStoredTasks();

    if (storedTasks) {
      setTasks(storedTasks);
      setIsLoadingTasks(false);
    } else {
      loadTasksData();
    }

    loadUsersData();
  }, []);

  function getOwnerName(userId: number): string {
    const user = users.find(function (user) {
      return user.id === userId;
    });

    if (user) {
      return user.name;
    }

    return "Unknown person";
  }

  function handleFilterChange(filter: FilterStatus) {
    setCurrentFilter(filter);
  }

  function handleSearchChange(value: string) {
    setSearchText(value);
  }

  function handleSelectPerson(userId: number) {
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

  const unavailableUsers = users.length === 0;

  function handleAddTask(title: string, userId: number): void {
    const newTask: Task = {
      // Corrected id generation: the actual classroom used `tasks.length + 1`,
      // which can collide with an existing task's id after a non-last-task
      // deletion. Date.now() is the same technique already taught since
      // Session 08 — this is a correctness fix, not a new concept.
      id: Date.now(),
      userId: userId,
      title: title.trim(),
      completed: false,
    };

    saveTasks([...tasks, newTask]);
  }

  function handleToggle(id: number): void {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }

      return task;
    });

    saveTasks(updatedTasks);
  }

  function handleDelete(id: number): void {
    const confirmed = window.confirm("Delete this task?");
    if (!confirmed) {
      return;
    }

    const updatedTasks = tasks.filter((task) => task.id !== id);
    saveTasks(updatedTasks);
    resetSelectedPersonIfNowEmpty(updatedTasks);
  }

  function handleSaveEdit(
    id: number,
    newTitle: string,
    newUserId: number,
  ): void {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, title: newTitle, userId: newUserId };
      }

      return task;
    });

    saveTasks(updatedTasks);
    resetSelectedPersonIfNowEmpty(updatedTasks);
  }

  function handleReset() {
    setCurrentFilter("all");
    setSearchText("");
    setSelectedUserId(0);
  }

  function resetSelectedPersonIfNowEmpty(updatedTasks: Task[]) {
    if (selectedUserId === 0) {
      return;
    }

    const matchingTask = updatedTasks.find(
      (task) => task.userId === selectedUserId,
    );
    if (!matchingTask) {
      setSelectedUserId(0);
    }
  }

  function loadStoredTasks(): Task[] | null {
    const savedValue = localStorage.getItem(TASKS_STORAGE_KEY);

    if (savedValue === null) {
      return null;
    }

    try {
      const parsed = JSON.parse(savedValue);

      if (Array.isArray(parsed)) {
        return parsed as Task[];
      }

      localStorage.removeItem(TASKS_STORAGE_KEY);
      return null;
    } catch (error) {
      console.log(error);
      localStorage.removeItem(TASKS_STORAGE_KEY);
      return null;
    }
  }

  function saveTasks(updatedTasks: Task[]) {
    setTasks(updatedTasks);
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(updatedTasks));
  }

  return (
    <>
      <Header />

      <main className="container">
        <StatsBar
          total={totalCount}
          completed={completedCount}
          pending={pendingCount}
        />

        <Controls
          currentFilter={currentFilter}
          onFilterChange={handleFilterChange}
          searchText={searchText}
          onSearchChange={handleSearchChange}
          visibleCount={visibleTasks.length}
          totalCount={tasks.length}
          onReset={handleReset}
        />

        {unavailableUsers ? (
          hasUsersError ? (
            <div className="add-task-placeholder message error">
              <p>People data unavailable — cannot add a task right now.</p>
              <button className="retry-button" onClick={loadUsersData}>
                Retry
              </button>
            </div>
          ) : (
            <div className="add-task-placeholder message">
              <p>Loading people...</p>
            </div>
          )
        ) : (
          <AddTask
            selectedUserId={selectedUserId}
            users={users}
            onAddTask={handleAddTask}
          />
        )}

        <PeopleSummary
          users={users}
          tasks={tasks}
          selectedUserId={selectedUserId}
          onSelectPerson={handleSelectPerson}
          hasUsersError={hasUsersError}
          onRetryUsers={loadUsersData}
        />

        <SectionTitle
          title="Your Tasks"
          subtitle="Everything on your plate right now."
        />

        {isLoadingTasks && <p className="message">Loading tasks...</p>}

        {!isLoadingTasks && hasTaskError && (
          <div className="message error">
            <p>
              We could not load the tasks. Please check your internet connection
              and try again.
            </p>
            <button className="retry-button" onClick={loadTasksData}>
              Retry
            </button>
          </div>
        )}

        {!isLoadingTasks &&
          !hasTaskError &&
          (visibleTasks.length === 0 ? (
            <EmptyState />
          ) : (
            <TaskList
              tasks={visibleTasks}
              users={users}
              unavailableUsers={unavailableUsers}
              getOwnerName={getOwnerName}
              onToggle={handleToggle}
              onDelete={handleDelete}
              onSaveEdit={handleSaveEdit}
            />
          ))}

        <ProgressText completed={completedCount} total={totalCount} />
      </main>
    </>
  );
}

export default App;
