export function StepItem({
  number,
  title,
  description,
}: {
  number: number;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-green text-sm font-semibold text-white">
        {number}
      </div>
      <div>
        <h3 className="text-base font-semibold text-ink">{title}</h3>
        <p className="mt-1 text-sm leading-6 text-ink-soft">{description}</p>
      </div>
    </div>
  );
}
