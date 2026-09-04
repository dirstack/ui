import { useForm } from "react-hook-form"
import { Form } from "~/components/form"
import { FormRow } from "~/components/form-row"
import { Input } from "~/components/input"
import { Switch } from "~/components/switch"

function FormRowFixture({ layout }: { layout: "stack" | "rows" }) {
  const form = useForm({ defaultValues: { name: "", listed: true } })

  return (
    <Form {...form}>
      <form className={layout === "rows" ? "w-[36rem] divide-y" : "w-80 space-y-6"}>
        <FormRow
          control={form.control}
          name="name"
          layout={layout}
          label="Workspace name"
          description="Shown publicly on your ad units."
          isRequired
        >
          {field => <Input placeholder="Acme Inc." {...field} />}
        </FormRow>

        <FormRow
          control={form.control}
          name="listed"
          layout={layout}
          label="Public profile"
          description="List this workspace in the directory."
          valueClassName="sm:items-end"
        >
          {field => <Switch checked={field.value} onCheckedChange={field.onChange} />}
        </FormRow>
      </form>
    </Form>
  )
}

export default {
  stack: <FormRowFixture layout="stack" />,
  rows: <FormRowFixture layout="rows" />,
}
