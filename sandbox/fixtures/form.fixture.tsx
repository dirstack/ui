import { useForm } from "react-hook-form"
import { Button } from "~/components/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/form"
import { Input } from "~/components/input"
import { Stack } from "~/components/stack"
import { Textarea } from "~/components/textarea"

function FormFixture() {
  const form = useForm({ defaultValues: { name: "", bio: "" } })

  return (
    <Form {...form}>
      <form
        className="w-80"
        onSubmit={form.handleSubmit(() => {
          form.setError("name", { message: "This name is already taken" })
        })}
      >
        <Stack direction="column" size="lg" className="w-full">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel isRequired>Workspace name</FormLabel>
                <FormControl>
                  <Input placeholder="Acme Inc." {...field} />
                </FormControl>
                <FormDescription>Shown publicly on your ad units.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea placeholder="Tell us about your site..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit (triggers an error)</Button>
        </Stack>
      </form>
    </Form>
  )
}

export default <FormFixture />
