import { ChangeEvent, useState } from "react";
import Header from "./components/Header";
import StatCard from "./components/StatCard";
import TaskItem from "./components/TaskItem";
import SectionTitle from "./components/sectionTitle";
import PersonSummary from "./components/PersonSummary";

function App() {
  // const currentFilter = "completed";
  const [currentFilter, setCurrentFilter] = useState("all");
  const [searchText, setSearchText] = useState("");
  const [yourName, setYourName] = useState("");
  const [showTasks, setShowTasks] = useState(true);
  const [showGreet, setShowGreet] = useState(true);


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

  function handleChangeName(event: ChangeEvent<HTMLInputElement>) {
    setYourName(event.target.value);
  }

  function handleToggleGreeting() {
   setShowGreet(!showGreet);
  }
  let greetingMessage = "";
  if (yourName === "") {
   greetingMessage = "";
  } else if (yourName=== "admin") {
   greetingMessage = "Welcome back, admin.";
  } else {
   greetingMessage = "Hello, " + yourName + "!";
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

        <section className="people-summary">
           <PersonSummary name="Leanne Graham" taskCount={1} />
           <PersonSummary name="Ervin Howell" taskCount={1} />
           <PersonSummary name="Clementine Bauch" taskCount={1} />
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

          <button
           className="toggle-greeting-button"
           onClick={handleToggleGreeting}
          >
         {showGreet ? "Hide Greeting" : "Show Greeting"}
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

        <button className="toggle-tasks-button" onClick={handleToggleTasks}>
             {showTasks ? "Hide Tasks" : "Show Tasks"}
        </button>

       <button
          className="toggle-greeting-button"
          onClick={handleToggleGreeting}
         >
            {showGreet ? "Hide Greeting" : "Show Greeting"}
       </button>

     

        {showGreet ? (
      <section className="greeting-section">
          <input
           type="text"
           placeholder="Enter your name"
           value={yourName}
           onChange={handleChangeName}
           />

         {yourName ? <p>{greetingMessage}</p> : null}
       </section>
     ) : null}


        {showTasks ? (
          <section>
            <SectionTitle 
            title="Your Tasks"
            subTitle="Manage your tasks and keep track of your progress"/>

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
          </section>

        ) : null}
      </main>
    </div>
  );
}

export default App;
