import Header from "./components/Header";
import StatCard from "./components/StatCard";
import TaskItem from "./components/TaskItem";
import SectionTitle from "./components/SectionTitle";
import { ChangeEvent, useState } from "react";
// import PersonSummary from "./components/PersonSummary";

function App() {
  // const [name, setName] = useState("");

  // const [showGreeting, setShowGreeting] = useState(true);

  // function handelNameChange(event: ChangeEvent<HTMLInputElement>) {
  //   setName(event.target.value);
  // }

  // function handleToggleGreeting() {
  //   setShowGreeting(!showGreeting);
  // }

  // let greetingMessage = "";
  // if (name === "") {
  //   greetingMessage = "";
  // } else if (name.toLocaleLowerCase() === "admin") {
  //   greetingMessage = "Welcome back, admin.";
  // } else {
  //   greetingMessage = "Hello, " + name + "!";
  // }

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

        <SectionTitle title="Your Tasks" subtitle="Manage your daily to-dos" />

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
{/* 
        <PersonSummary name="molham" taskCount={0} />
        <PersonSummary name="nawar" taskCount={100} /> */}

        {/* <button className="filter-button" onClick={handleToggleGreeting}>
          {showGreeting ? "Hide Greeting" : "Show Greeting"}
        </button> */}

        {/* {showGreeting && (
          <>
            <input
              className="search-input"
              type="text"
              value={name}
              onChange={handelNameChange}
              placeholder="Enter your name"
            />
            {name !== "" ? <p>{greetingMessage}</p> : null}
          </>
        )} */}
      </main>
    </div>
  );
}

export default App;
