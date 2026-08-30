import Header from "./components/Header";
import StatCard from "./components/StatCard";

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
          <li className="task-item">
            <span className="task-text">
              <span className="task-title">Finish JavaScript exercise</span>
              <span className="task-user">Leanne Graham</span>
            </span>
            <span className="task-status pending">Pending</span>
          </li>
        </ul>
      </main>
    </div>
  );
}

export default App;
