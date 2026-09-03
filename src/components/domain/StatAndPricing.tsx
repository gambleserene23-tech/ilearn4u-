import { Card, CardBody } from "@/components/ui/Card";

export function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <Card>
      <CardBody className="flex flex-col gap-1">
        <p className="text-xs font-medium uppercase tracking-wide text-ink-soft">{label}</p>
        <p className="text-2xl font-semibold text-brand-green">{value}</p>
      </CardBody>
    </Card>
  );
}

export function PricingCard({
  label,
  price,
  unit,
  billing,
  currencySymbol,
  highlight,
}: {
  label: string;
  price: number;
  unit: string;
  billing: string;
  currencySymbol: string;
  highlight?: boolean;
}) {
  return (
    <Card className={highlight ? "border-2 border-brand-orange" : undefined}>
      <CardBody className="flex flex-col gap-2">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-soft">{label}</h3>
        <p className="text-3xl font-semibold text-brand-green">
          {price === 0 ? "Free" : `${currencySymbol}${price.toFixed(2)}`}
        </p>
        <p className="text-sm text-ink-soft">{unit}</p>
        <p className="mt-2 text-xs text-ink-soft">{billing}</p>
      </CardBody>
    </Card>
  );
}
