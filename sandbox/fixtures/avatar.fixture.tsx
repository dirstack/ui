import { Avatar, AvatarFallback, AvatarImage } from "~/components/avatar"
import { Stack } from "~/components/stack"

export default {
  image: (
    <Avatar>
      <AvatarImage src="https://i.pravatar.cc/80?img=12" alt="A user" />
      <AvatarFallback>PK</AvatarFallback>
    </Avatar>
  ),

  fallback: (
    <Stack>
      <Avatar>
        <AvatarFallback>PK</AvatarFallback>
      </Avatar>
      <Avatar className="size-8">
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
      <Avatar className="size-6">
        <AvatarFallback>CD</AvatarFallback>
      </Avatar>
    </Stack>
  ),
}
