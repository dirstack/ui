import { Badge } from "~/components/badge"
import { CheckIcon, SparklesIcon } from "~/components/icons"
import { Stack } from "~/components/stack"

const variants = ["secondary", "soft", "success", "warning", "danger"] as const
const sizes = ["sm", "md", "lg"] as const

export default {
  variants: (
    <Stack direction="column" size="lg">
      {variants.map(variant => (
        <Stack key={variant}>
          {sizes.map(size => (
            <Badge key={size} variant={variant} size={size}>
              {variant}
            </Badge>
          ))}
        </Stack>
      ))}
    </Stack>
  ),

  affixes: (
    <Stack>
      <Badge variant="success" prefix={<CheckIcon />}>
        Approved
      </Badge>
      <Badge variant="secondary" suffix={<SparklesIcon />}>
        New
      </Badge>
    </Stack>
  ),
}
