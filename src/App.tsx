import { ChangeEvent, useState } from "react";
import Header from "./components/Header";
import StatCard from "./components/StatCard";
import TaskItem from "./components/TaskItem";
import SectionTitle from './components/SectionTitle';
import PersonSummary from "./components/PersonSummary";


function App() {
  // const currentFilter = "completed";
  const [currentFilter, setCurrentFilter] = useState("all");
  const [searchText, setSearchText] = useState("");
  const [showTasks, setShowTasks] = useState(true);
  const [name, setName] = useState('');
  const [showGreeting, setShowGreeting] = useState(true);

  let greetingMessage = '';
if (name === '') {
  greetingMessage = ''; 
} else if (name === 'admin') {
  greetingMessage = 'Welcome back, admin.';
} else {
  greetingMessage = 'Hello, ' + name + '!'; 
}
function handleToggleGreeting() {
  setShowGreeting(!showGreeting);
}
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

  function handleToggleTasks() {
    setShowTasks(!showTasks);
  }
  function handleNameChange(event: ChangeEvent<HTMLInputElement>) {
  setName(event.target.value);
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

          {searchText ? (
            <p className="search-feedback">Searching for: {searchText}</p>
          ) : null}
        </section>
        <button onClick={handleToggleGreeting} 
  style={{
    backgroundColor: "#ffffff",
    border: "1px solid #e2e5ea",
    borderRadius: "8px",
    color: "#1f2430",
    cursor: "pointer",
    fontSize: "15px",
    padding: "10px 18px",
    marginTop:"10px"
  }}
>
          {showGreeting ? 'Hide Greeting' : 'Show Greeting'}
          </button>
        {showGreeting ? (
        <div >
    <h3>Name Greeting</h3>
    <input 
      type="text" 
      placeholder="Enter your name..." 
      value={name} 
      onChange={handleNameChange} 
      style={{padding:"10px"}}
    />
    {name !== '' ? <p  style={{padding:"10px", color:"#3b6ef5"}}>{greetingMessage}</p> : null}
  </div>
) : null}
        <div style={{marginTop:"10px"}}>
          <PersonSummary  name="Tayma" taskCount={8} />
        <PersonSummary name="nour" taskCount={5} />
        <PersonSummary name="ali" taskCount={1} /></div>

        <button className="toggle-tasks-button" onClick={handleToggleTasks}>
          {showTasks ? "Hide Tasks" : "Show Tasks"}
        </button>
         <SectionTitle title="Your Tasks" subtitle="Manage your to-dos" />
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
              ownerName="Ervin Howell"
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