import { Button } from "~/components/button"
import { CopyIcon, PencilIcon, TrashIcon } from "~/components/icons"
import {
  Menu,
  MenuContent,
  MenuGroup,
  MenuGroupLabel,
  MenuItem,
  MenuSeparator,
  MenuShortcut,
  MenuTrigger,
} from "~/components/menu"

export default (
  <Menu>
    <MenuTrigger render={<Button variant="secondary">Open menu</Button>} />

    <MenuContent align="start">
      <MenuGroup>
        <MenuGroupLabel>Actions</MenuGroupLabel>

        <MenuItem>
          <PencilIcon />
          Edit
          <MenuShortcut meta>E</MenuShortcut>
        </MenuItem>

        <MenuItem>
          <CopyIcon />
          Duplicate
        </MenuItem>
      </MenuGroup>

      <MenuSeparator />

      <MenuItem className="text-destructive">
        <TrashIcon />
        Delete
      </MenuItem>
    </MenuContent>
  </Menu>
)
