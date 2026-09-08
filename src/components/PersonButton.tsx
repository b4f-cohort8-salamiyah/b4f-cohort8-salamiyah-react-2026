import type { User } from "../types";

interface PersonButtonProps {
  user: User;
  count: number;
  isActive: boolean;
  onClick: () => void;
}

function PersonButton({ user, count, isActive, onClick }: PersonButtonProps) {
  return (
    <button
      className={"filter-button" + (isActive ? " active" : "")}
      onClick={onClick}
    >
      {user.name} - {count}
    </button>
  );
}

export default PersonButton;
