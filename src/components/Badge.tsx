interface BadgeProps {
  status: "completed" | "pending";
}

function Badge({ status }: BadgeProps) {
  const statusText = status === "completed" ? "Completed" : "Pending";

  return <span className={`task-status ${status}`}>{statusText}</span>;
}

export default Badge;
