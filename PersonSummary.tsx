import React from "react";

interface PersonSummaryProps {
  name: string;
  taskCount: number;
}

function PersonSummary(props: PersonSummaryProps) {
  return (
    <p>{props.name} has {props.taskCount} tasks</p>
  );
}

export default PersonSummary;