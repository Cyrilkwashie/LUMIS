type StatCardProps = {
  label: string;
  value: string | number;
  subtext?: string;
};

export default function StatCard({ label, value, subtext }: StatCardProps) {
  return (
    <div className="border border-border bg-white p-6">
      <p className="text-xs font-medium uppercase tracking-widest text-grey">
        {label}
      </p>
      <p className="mt-3 font-syne text-3xl font-bold text-heading">{value}</p>
      {subtext && <p className="mt-1 text-xs text-grey">{subtext}</p>}
    </div>
  );
}
