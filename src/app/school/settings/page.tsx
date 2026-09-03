import { getCurrentSchool } from "@/lib/services/schools";
import { siteConfig } from "@/config/site.config";
import { Field, Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card, CardBody } from "@/components/ui/Card";

export default async function SchoolSettingsPage() {
  const school = await getCurrentSchool();

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-semibold text-brand-green">School Settings</h1>

      <form className="mt-6 space-y-4">
        <Field label="School name" htmlFor="name">
          <Input id="name" name="name" defaultValue={school.name} />
        </Field>
        <Field label="Suburb" htmlFor="suburb">
          <Input id="suburb" name="suburb" defaultValue={school.suburb} />
        </Field>
        <Field label="Contact email" htmlFor="email">
          <Input id="email" name="email" defaultValue={school.contactEmail} />
        </Field>
        <Field label="Counsellor name" htmlFor="counsellor">
          <Input id="counsellor" name="counsellor" defaultValue={school.counsellorName} />
        </Field>
        <Button type="submit">Save settings</Button>
      </form>

      <Card className="mt-8">
        <CardBody className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-ink">Subscription</p>
            <p className="text-xs text-ink-soft capitalize">{school.subscriptionStatus}</p>
          </div>
          <p className="text-sm font-semibold text-brand-green">
            {siteConfig.pricing.currencySymbol}
            {siteConfig.pricing.school.price.toFixed(2)} {siteConfig.pricing.school.unit}
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
