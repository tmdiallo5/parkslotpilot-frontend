type Props = {
  label: string;
};

function StatusBadge({ label }: Props) {
  let className = "";

  switch (label) {
    case "CONFIRMED":
      className = "bg-blue-100 text-blue-800";
      break;

    case "COMPLETED":
      className = "bg-green-100 text-green-800";
      break;

    case "CANCELLED":
      className = "bg-red-100 text-red-800";
      break;

    default:
      className = "bg-blue-100 text-blue-800";
  }

  return (
    <span
      className={`rounded-full px-4 py-1 text-sm font-semibold ${className}`}
    >
      {label}
    </span>
  );
}

export default StatusBadge;
