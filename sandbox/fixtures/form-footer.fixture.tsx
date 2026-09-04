import { Button } from "~/components/button"
import { FormFooter } from "~/components/form-footer"

export default (
  <div className="w-96 rounded-xl border p-6">
    <p className="text-muted-foreground text-sm">Form body goes here.</p>

    <FormFooter>
      <Button variant="secondary">Cancel</Button>
      <Button>Save</Button>
    </FormFooter>
  </div>
)
