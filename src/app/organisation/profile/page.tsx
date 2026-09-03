import { getCurrentOrganisation } from "@/lib/services/organisations";
import { Field, Input, Textarea, Select } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default async function OrganisationProfilePage() {
  const organisation = await getCurrentOrganisation();

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-semibold text-brand-green">Organisation Profile</h1>

      <form className="mt-6 space-y-4">
        <Field label="Organisation name" htmlFor="name">
          <Input id="name" name="name" defaultValue={organisation.name} />
        </Field>
        <Field label="Type" htmlFor="type">
          <Select id="type" name="type" defaultValue={organisation.type}>
            <option value="business">Business</option>
            <option value="university">University</option>
          </Select>
        </Field>
        <Field label="Industry" htmlFor="industry">
          <Input id="industry" name="industry" defaultValue={organisation.industry} />
        </Field>
        <Field label="Location" htmlFor="location">
          <Input id="location" name="location" defaultValue={organisation.location} />
        </Field>
        <Field label="Contact email" htmlFor="email">
          <Input id="email" name="email" defaultValue={organisation.contactEmail} />
        </Field>
        <Field label="Description" htmlFor="description">
          <Textarea id="description" name="description" defaultValue={organisation.description} />
        </Field>
        <Button type="submit">Save profile</Button>
      </form>
    </div>
  );
}
