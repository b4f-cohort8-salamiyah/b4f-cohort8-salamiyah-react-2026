interface ProgressTextProps {
  completed: number;
  total: number;
}

function ProgressText({ completed, total }: ProgressTextProps) {
  return (
    <p className="progress">
      {completed} of {total} tasks completed
    </p>
  );
}

export default ProgressText;
