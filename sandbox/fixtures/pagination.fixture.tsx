import { useState } from "react"
import { Pagination } from "~/components/pagination"

function MultiPage() {
  const perPage = 25
  const total = 128
  const pageCount = Math.ceil(total / perPage)
  const [page, setPage] = useState(2)

  return (
    <div className="w-[36rem]">
      <Pagination
        page={page}
        pageCount={pageCount}
        total={total}
        perPage={perPage}
        onPageChange={setPage}
      />
    </div>
  )
}

export default {
  multiPage: <MultiPage />,

  // A single page renders nothing — the dashed box shows the empty slot it leaves.
  singlePage: (
    <div className="w-[36rem] rounded-md border border-dashed p-4 text-muted-foreground text-sm">
      <Pagination page={1} pageCount={1} total={12} perPage={25} onPageChange={() => {}} />
      Nothing renders for a single page.
    </div>
  ),
}
