import { createLocalStorage } from "@solid-primitives/storage"
import { isMobile } from "~/utils/compatibility"

// Use controls object instead of directly destructuring toJSON/other methods.
// Directly exporting method names like `toJSON` from the destructured object
// can cause runtime problems in some bundlers/environments because of
// property descriptor re-definition. Exporting the whole controls object
// avoids that risk.
const [local, setLocal, controls] = createLocalStorage()
const { remove, clear } = controls

// export function isValidKey(
//   key: string | number | symbol,
//   object: object
// ): key is keyof typeof object {
//   return key in object
// }

export const initialLocalSettings = [
  {
    key: "aria2_rpc_url",
    default: "http://localhost:6800/jsonrpc",
  },
  {
    key: "aria2_rpc_secret",
    default: "",
  },
  {
    key: "global_default_layout",
    default: "list",
    type: "select",
    options: ["list", "grid", "image"],
  },
  {
    key: "show_folder_in_image_view",
    default: "top",
    type: "select",
    options: ["top", "bottom", "none"],
  },
  {
    key: "show_sidebar",
    default: "none",
    type: "select",
    options: ["none", "visible"],
  },
  {
    key: "show_count_msg",
    default: "none",
    type: "select",
    options: ["none", "visible"],
  },
  {
    key: "position_of_header_navbar",
    default: "static",
    type: "select",
    options: ["static", "sticky", "only_navbar_sticky"],
  },
  {
    key: "grid_item_size",
    default: "90",
    type: "number",
  },
  {
    key: "list_item_filename_overflow",
    default: "ellipsis",
    type: "select",
    options: ["ellipsis", "scrollable", "multi_line"],
  },
  {
    key: "open_item_on_checkbox",
    default: "direct",
    type: "select",
    options: ["direct", "dblclick", "disable_while_checked"],
    hidden: false,
  },
  {
    key: "editor_font_size",
    default: "14",
    type: "number",
  },
  {
    key: "editor_word_wrap",
    default: "false",
    type: "select",
    options: ["false", "true"],
  },
  {
    key: "editor_minimap",
    default: "true",
    type: "select",
    options: ["false", "true"],
  },
  {
    key: "show_gallery_thumbnails",
    default: "visible",
    type: "select",
    options: ["none", "visible"],
  },
]
export type LocalSetting = (typeof initialLocalSettings)[number]
for (const setting of initialLocalSettings) {
  if (!local[setting.key]) {
    setLocal(setting.key, setting.default)
  }
}

// Export controls object under a safe name to avoid runtime defineProperty issues
export { local, setLocal, remove, clear, controls as localStorageControls }
