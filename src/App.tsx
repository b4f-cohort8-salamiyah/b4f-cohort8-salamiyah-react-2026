import { useEffect, useState } from "react";
import type { ChangeEvent } from "react";
import Header from "./components/Header";
import TaskItem from "./components/TaskItem";
import SectionTitle from "./components/SectionTitle";
import PersonSummary from "./components/PersonSummary";
import AddTask from "./components/AddTask";

import { Task, User, FilterStatus } from "./types";
import { fetchTasks, fetchUsers } from "./api";
import StatsBar from "./components/StatsBar";
import FilterButtons from "./components/FilterButtons";
import SearchInput from "./components/SearchInput";

function App() {
  const [currentFilter, setCurrentFilter] = useState<FilterStatus>("all");
  const [searchText, setSearchText] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoadingTasks, setIsLoadingTasks] = useState(true);
  const [hasTaskError, setHasTaskError] = useState(false);
  const [hasUsersError, setHasUsersError] = useState(false);

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

  function handleSelectedPerson(userId: number): void {
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

  const peopleWithCount = users
    .map((user) => {
      const count = tasks.filter((task) => task.userId === user.id).length;
      return { user, count };
    })
    .filter((entry) => entry.count > 0);

  function addNewTask(title: string, userId: number): void {
    const newTask: Task = {
      id: tasks.length + 1,
      userId: userId,
      title: title.trim(),
      completed: false,
    };

    const newTasks = [...tasks, newTask];

    setTasks(newTasks);
  }

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

  async function loadTasksData() {
    setIsLoadingTasks(true);
    setHasTaskError(false);

    try {
      const _tasks = await fetchTasks();
      setTasks(_tasks);
      console.log(_tasks);
      setIsLoadingTasks(false);
    } catch (error) {
      console.log(error);
      setHasTaskError(true);
      setIsLoadingTasks(false);
    }
  }

  async function loadUsers() {
    setHasUsersError(false);

    try {
      const _users = await fetchUsers();
      setUsers(_users);
    } catch (error) {
      setHasUsersError(true);
      console.log(error);
    }
  }

  useEffect(() => {
    loadTasksData();
    loadUsers();
  }, []);

  return (
    <div>
      <Header />

      <main className="container">
        <StatsBar
          total={totalCount}
          completed={completedCount}
          pending={pendingCount}
        />

        <FilterButtons
          currentFilter={currentFilter}
          onChange={handleFilterChange}
        />

        <SearchInput value={searchText} onChange={handleSearchChange} />

        <SectionTitle
          title="Your Tasks"
          subtitle="Everything on your plate right now."
        />

        {users.length === 0 && !hasUsersError && (
          <p className="message">Loading people...</p>
        )}

        {hasUsersError && (
          <div className="message error">
            <p>
              We could not load the people list. Please check your internet
              connection and try again.
            </p>
            <button className="retry-button" onClick={loadUsers}>
              Retry
            </button>
          </div>
        )}

        <section className="people-summary">
          <button
            className={
              "filter-button" + (selectedUserId === 0 ? " active" : "")
            }
            onClick={() => handleSelectedPerson(0)}
          >
            All people
          </button>
          {peopleWithCount.map((entry) => {
            return (
              <PersonSummary
                key={entry.user.id}
                id={entry.user.id}
                name={entry.user.name}
                taskCount={entry.count}
                selectedUserId={selectedUserId}
                onChangePerson={handleSelectedPerson}
              />
            );
          })}
        </section>

        <AddTask selectedUserId={0} users={users} addNewTask={addNewTask} />

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
          ))}

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
