  interface StatCardProps {
  label: string;
  value: number;
}

function StatCard(props: StatCardProps) {
  return (
    <div className="stat-card">
      <p className="stat-label">{props.label}</p>
      <p className="stat-value">{props.value}</p>
    </div>
  );
}

export default StatCard;
