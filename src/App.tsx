import { ChangeEvent, useState } from "react";
import Header from "./components/Header";
import PersonSummary from "./components/PersonSummary";
import SectionTitle from "./components/SectionTitle";
import StatCard from "./components/StatCard";
import TaskItem from "./components/TaskItem";

type TaskStatus = "completed" | "pending";

interface Task {
  id: number;
  title: string;
  ownerName: string;
  status: TaskStatus;
}

const taskList: Task[] = [
  { id: 1, title: "Finish JavaScript exercise", ownerName: "Leanne Graham", status: "pending" },
  { id: 2, title: "Review pull request", ownerName: "Ervin Howell", status: "completed" },
  { id: 3, title: "Write session notes", ownerName: "Clementine Bauch", status: "pending" },
];

function App() {
  const [currentFilter, setCurrentFilter] = useState<"all" | TaskStatus>("all");
  const [searchText, setSearchText] = useState("");
  const [showTasks, setShowTasks] = useState(true);
  const [showGreeting, setShowGreeting] = useState(true);
  const [name, setName] = useState("");

  const totalTasks = taskList.length;
  const completedTasks = taskList.filter((task) => task.status === "completed").length;
  const pendingTasks = totalTasks - completedTasks;

  const greetingMessage = name
    ? `Hello, ${name}! You have ${pendingTasks} pending tasks left.`
    : "Welcome back! Add your name to personalize your day.";

  const filteredTasks = taskList.filter((task) => {
    const matchesFilter = currentFilter === "all" || task.status === currentFilter;
    const query = searchText.trim().toLowerCase();
    const matchesSearch =
      query.length === 0 ||
      task.title.toLowerCase().includes(query) ||
      task.ownerName.toLowerCase().includes(query);

    return matchesFilter && matchesSearch;
  });

  const personSummary = Object.entries(
    taskList.reduce<Record<string, number>>((summary, task) => {
      summary[task.ownerName] = (summary[task.ownerName] ?? 0) + 1;
      return summary;
    }, {}),
  );

  function handleShowAll(): void {
    setCurrentFilter("all");
  }

  function handleShowCompleted(): void {
    setCurrentFilter("completed");
  }

  function handleShowPending(): void {
    setCurrentFilter("pending");
  }

  function handleSearchChange(event: ChangeEvent<HTMLInputElement>): void {
    setSearchText(event.target.value);
  }

  function handleNameChange(event: ChangeEvent<HTMLInputElement>): void {
    setName(event.target.value);
  }

  function handleToggleGreeting(): void {
    setShowGreeting((previousValue) => !previousValue);
  }

  function handleToggleTasks(): void {
    setShowTasks((previousValue) => !previousValue);
  }

  return (
    <div>
      <Header />

      <main className="container">
        <section className="stats">
          <StatCard label="Total Tasks" value={totalTasks} />
          <StatCard label="Completed" value={completedTasks} />
          <StatCard label="Pending" value={pendingTasks} />
        </section>

        <section className="filters">
          <button
            className={currentFilter === "all" ? "filter-button active" : "filter-button"}
            onClick={handleShowAll}
            type="button"
          >
            All
          </button>
          <button
            className={currentFilter === "completed" ? "filter-button active" : "filter-button"}
            onClick={handleShowCompleted}
            type="button"
          >
            Completed
          </button>
          <button
            className={currentFilter === "pending" ? "filter-button active" : "filter-button"}
            onClick={handleShowPending}
            type="button"
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
          <p className="search-feedback">
            Showing {filteredTasks.length} of {totalTasks} tasks
          </p>
        </section>

        <SectionTitle title="Task overview" subtitle="Track progress and stay ahead of deadlines." />

        <div className="person-summary-block">
          {personSummary.map(([ownerName, taskCount]) => (
            <PersonSummary key={ownerName} name={ownerName} taskCount={taskCount} />
          ))}
        </div>

        {showGreeting ? (
          <section className="greeting-section">
            <label className="greeting-label" htmlFor="name-input">
              Enter your name
            </label>
            <input
              id="name-input"
              type="text"
              className="greeting-input"
              value={name}
              onChange={handleNameChange}
              placeholder="Type your name..."
            />

            {name ? <p className="greeting-message">{greetingMessage}</p> : null}
          </section>
        ) : null}

        <button className="toggle-greeting-button" onClick={handleToggleGreeting} type="button">
          {showGreeting ? "Hide Greeting" : "Show Greeting"}
        </button>

        <button className="toggle-tasks-button" onClick={handleToggleTasks} type="button">
          {showTasks ? "Hide Tasks" : "Show Tasks"}
        </button>

        {showTasks ? (
          filteredTasks.length > 0 ? (
            <ul className="task-list">
              {filteredTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  title={task.title}
                  ownerName={task.ownerName}
                  statusText={task.status === "completed" ? "Completed" : "Pending"}
                  statusClass={task.status}
                />
              ))}
            </ul>
          ) : (
            <p className="search-feedback">No tasks match your current filter.</p>
          )
        ) : null}
      </main>
    </div>
  );
}

export default App;
