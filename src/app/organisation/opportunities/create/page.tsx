import { opportunityTypes } from "@/config/opportunity-types";
import { careerCategoryOptions, locationOptions } from "@/config/application-questions";
import { getCurrentOrganisation } from "@/lib/services/organisations";
import { Field, Input, Textarea, Select } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";

export default async function CreateOpportunityPage() {
  const organisation = await getCurrentOrganisation();
  const remainingSlots = organisation.totalSlots - organisation.usedSlots;

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-semibold text-brand-green">Create Opportunity</h1>
      <p className="mt-1 text-ink-soft">
        Each active listing uses one opportunity slot. You have {remainingSlots} slot(s)
        available.
      </p>

      {remainingSlots <= 0 && (
        <Alert tone="warning" title="No slots available" className="mt-4">
          You&apos;ve used all your opportunity slots. Purchase more on the Billing page before
          creating a new listing.
        </Alert>
      )}

      <form className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Field label="Opportunity title" htmlFor="title" required>
            <Input id="title" name="title" required />
          </Field>
        </div>
        <Field label="Opportunity type" htmlFor="type" required>
          <Select id="type" name="type" required>
            {opportunityTypes.map((t) => (
              <option key={t.id} value={t.id}>
                {t.label}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Industry" htmlFor="industry" required>
          <Select id="industry" name="industry" required>
            {careerCategoryOptions().map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </Select>
        </Field>
        <div className="sm:col-span-2">
          <Field label="Description" htmlFor="description" required>
            <Textarea id="description" name="description" required />
          </Field>
        </div>
        <Field label="Location" htmlFor="location" required>
          <Select id="location" name="location" required>
            {locationOptions().map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Career pathway" htmlFor="careerPathway">
          <Input id="careerPathway" name="careerPathway" />
        </Field>
        <Field label="Minimum age" htmlFor="ageMin" required>
          <Input id="ageMin" name="ageMin" type="number" required />
        </Field>
        <Field label="Maximum age" htmlFor="ageMax" required>
          <Input id="ageMax" name="ageMax" type="number" required />
        </Field>
        <Field label="Available places" htmlFor="availablePlaces" required>
          <Input id="availablePlaces" name="availablePlaces" type="number" required />
        </Field>
        <Field label="Expected commitment" htmlFor="commitment" required>
          <Input id="commitment" name="commitment" placeholder="e.g. 1 day per week" required />
        </Field>
        <Field label="Start date" htmlFor="startDate" required>
          <Input id="startDate" name="startDate" type="date" required />
        </Field>
        <Field label="End date" htmlFor="endDate" required>
          <Input id="endDate" name="endDate" type="date" required />
        </Field>
        <Field label="Application closing date" htmlFor="closingDate" required>
          <Input id="closingDate" name="closingDate" type="date" required />
        </Field>
        <div className="sm:col-span-2">
          <Field label="Eligibility requirements" htmlFor="requirements">
            <Textarea id="requirements" name="requirements" placeholder="One requirement per line" />
          </Field>
        </div>
        <div className="sm:col-span-2">
          <Field label="Additional requirements" htmlFor="additionalRequirements">
            <Textarea id="additionalRequirements" name="additionalRequirements" />
          </Field>
        </div>
        <div className="sm:col-span-2">
          <Button type="submit" disabled={remainingSlots <= 0}>
            Publish opportunity
          </Button>
        </div>
      </form>
    </div>
  );
}
