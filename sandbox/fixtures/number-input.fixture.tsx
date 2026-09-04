import { useState } from "react"
import { NumberInput } from "~/components/number-input"
import { Stack } from "~/components/stack"

function NumberInputFixture() {
  const [price, setPrice] = useState<number | null | undefined>(49)
  const [count, setCount] = useState<number | null | undefined>(undefined)

  return (
    <Stack direction="column" size="md" className="w-64">
      <NumberInput value={price} onValueChange={setPrice} placeholder="Amount" />
      <NumberInput value={count} onValueChange={setCount} integer nullable placeholder="Count" />

      <p className="text-muted-foreground text-sm">
        price: {String(price)} · count: {String(count)}
      </p>
    </Stack>
  )
}

export default <NumberInputFixture />
