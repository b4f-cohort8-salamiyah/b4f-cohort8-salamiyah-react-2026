import Header from "./components/Header";
import StatCard from "./components/StatCard";
import TaskItem from "./components/TaskItem";

function App() {
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
          <button className="filter-button active">All</button>
          <button className="filter-button">Completed</button>
          <button className="filter-button">Pending</button>
        </section>

        <section className="search">
          <input
            type="text"
            className="search-input"
            placeholder="Search tasks..."
          />
        </section>

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
      </main>
    </div>
  );
}

export default App;
