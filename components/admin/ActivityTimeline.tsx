import { OrderHistoryEntry } from "@/lib/types";

export default function ActivityTimeline({
  entries,
}: {
  entries: OrderHistoryEntry[];
}) {
  if (!entries.length) {
    return <p className="text-sm text-grey">No activity recorded.</p>;
  }

  return (
    <ol className="space-y-4">
      {entries.map((entry) => (
        <li key={entry.id} className="border-l-2 border-border pl-4">
          <p className="text-sm font-medium text-heading">{entry.action}</p>
          {entry.note && (
            <p className="mt-0.5 text-xs text-grey">{entry.note}</p>
          )}
          <p className="mt-1 text-xs text-grey">
            {entry.createdBy} ·{" "}
            {new Date(entry.createdAt).toLocaleString("en-US", {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </p>
        </li>
      ))}
    </ol>
  );
}
