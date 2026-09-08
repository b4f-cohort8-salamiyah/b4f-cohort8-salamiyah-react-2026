import type { Task, User } from "../types";
import PersonButton from "./PersonButton";

interface PeopleSummaryProps {
  users: User[];
  tasks: Task[];
  selectedUserId: number;
  onSelectPerson: (userId: number) => void;
  hasUsersError: boolean;
  onRetryUsers: () => void;
}

function PeopleSummary({
  users,
  tasks,
  selectedUserId,
  onSelectPerson,
  hasUsersError,
  onRetryUsers,
}: PeopleSummaryProps) {
  const peopleWithCount = users
    .map((user) => {
      const count = tasks.filter((task) => task.userId === user.id).length;
      return { user, count };
    })
    .filter((entry) => entry.count > 0);

  return (
    <>
      {users.length === 0 && !hasUsersError && (
        <p className="message">Loading people...</p>
      )}
      {hasUsersError && (
        <div className="message error">
          <p>
            We could not load the people list. Please check your internet
            connection and try again.
          </p>
          <button className="retry-button" onClick={onRetryUsers}>
            Retry
          </button>
        </div>
      )}

      <section className="people-summary">
        <button
          className={"filter-button" + (selectedUserId === 0 ? " active" : "")}
          onClick={() => onSelectPerson(0)}
        >
          All people
        </button>

        {peopleWithCount.map((entry) => (
          <PersonButton
            key={entry.user.id}
            user={entry.user}
            count={entry.count}
            isActive={selectedUserId === entry.user.id}
            onClick={() => onSelectPerson(entry.user.id)}
          />
        ))}
      </section>
    </>
  );
}

export default PeopleSummary;
