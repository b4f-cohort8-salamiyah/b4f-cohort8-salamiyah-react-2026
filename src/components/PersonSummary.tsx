interface personSummaryData {
  name: string;
  taskCount: number;
}

export default function PersonSummary(prop: personSummaryData) {
  return (
    <p>
      {prop.name} tasks count is {prop.taskCount}
    </p>
  );
}
