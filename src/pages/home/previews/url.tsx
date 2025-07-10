import { MaybeLoading } from "~/components"
import { recordKeysToLowerCase } from "~/utils"
import { FileInfo } from "./info"
import { useFetchText, useParseText, useT, useUtil } from "~/hooks"
import { Button } from "@hope-ui/solid"
import { parse } from "ini"
import { createMemo } from "solid-js"

export default function () {
  const [content] = useFetchText()
  const { copy } = useUtil()
  const url = createMemo(() => {
    try {
      const ini = content()?.content || ""
      const { text } = useParseText(ini)
      const config = recordKeysToLowerCase(parse(text() || ""))
      return config.internetshortcut?.url || "#"
    } catch (error) {
      console.error("Error parsing INI content:", error)
      return "#"
    }
  })
  const t = useT()
  return (
    <MaybeLoading loading={content.loading}>
      <FileInfo>
        <Button colorScheme="accent" onClick={() => copy(url())}>
          {t("home.toolbar.copy_link")}
        </Button>
        <Button as="a" href={url()} target="_blank" rel="noopener noreferrer">
          {t("home.preview.open_in_new_window")}
        </Button>
      </FileInfo>
    </MaybeLoading>
  )
}
