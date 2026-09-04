import { useState } from "react"
import { SearchInput } from "~/components/search-input"

function SearchInputFixture() {
  const [value, setValue] = useState("")

  return (
    <div className="w-72">
      <SearchInput value={value} onValueChange={setValue} placeholder="Search ads..." />
    </div>
  )
}

export default <SearchInputFixture />
