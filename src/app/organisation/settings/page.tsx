import { getCurrentOrganisation } from "@/lib/services/organisations";
import { Field, Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default async function OrganisationSettingsPage() {
  const organisation = await getCurrentOrganisation();

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-semibold text-brand-green">Organisation Settings</h1>

      <form className="mt-6 space-y-4">
        <Field label="Contact email" htmlFor="email">
          <Input id="email" name="email" defaultValue={organisation.contactEmail} />
        </Field>
        <Field label="Notification preferences" htmlFor="notify">
          <Input id="notify" name="notify" defaultValue="Email me on every new application" />
        </Field>
        <Button type="submit">Save settings</Button>
      </form>
    </div>
  );
}
