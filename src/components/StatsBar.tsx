import StatCard from "./StatCard";

interface StatsBarProps {
  total: number;
  completed: number;
  pending: number;
}

function StatsBar({ total, completed, pending }: StatsBarProps) {
  return (
    <section className="stats">
      <StatCard label="Total Tasks" value={total} />
      <StatCard label="Completed" value={completed} />
      <StatCard label="Pending" value={pending} />
    </section>
  );
}

export default StatsBar;
