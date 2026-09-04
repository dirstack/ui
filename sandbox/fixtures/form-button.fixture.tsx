import { FormButton } from "~/components/form-button"
import { Stack } from "~/components/stack"

export default {
  states: (
    <Stack>
      <FormButton>Save changes</FormButton>
      <FormButton isPending>Saving</FormButton>
      <FormButton variant="secondary">Secondary</FormButton>
    </Stack>
  ),

  // With no siblings, the submit button stretches full width (`first:not-only:w-full` is off).
  solo: (
    <div className="w-80">
      <FormButton>Continue</FormButton>
    </div>
  ),
}
