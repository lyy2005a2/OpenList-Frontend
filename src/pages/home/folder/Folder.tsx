import {
  lazy,
  createEffect,
  createMemo,
  onCleanup,
  Switch,
  Match,
  on,
} from "solid-js"
import { layout } from "~/store"
import { ContextMenu } from "./context-menu"
import { Pager } from "./Pager"
import { useLink, useT } from "~/hooks"
import { objStore } from "~/store"
import { ObjType } from "~/types"
import { bus } from "~/utils"
import lightGallery from "sweetphotos"
import lgThumbnail from "sweetphotos/plugins/thumbnail"
import lgZoom from "sweetphotos/plugins/zoom"
import lgRotate from "sweetphotos/plugins/rotate"
import lgAutoplay from "sweetphotos/plugins/autoplay"
import lgFullscreen from "sweetphotos/plugins/fullscreen"
import "sweetphotos/css/lightgallery-bundle.css"
import { LightGallery } from "sweetphotos/lightgallery"
import { Search } from "./Search"

const ListLayout = lazy(() => import("./List"))
const GridLayout = lazy(() => import("./Grid"))
const ImageLayout = lazy(() => import("./Images"))

const Folder = () => {
  const { rawLink } = useLink()
  const images = createMemo(() =>
    objStore.objs.filter((obj) => obj.type === ObjType.IMAGE),
  )

  let dynamicGallery: LightGallery | undefined
  const initGallery = () => {
    dynamicGallery = lightGallery(document.createElement("div"), {
      addClass: "lightgallery-container",
      dynamic: true,
      thumbnail: true,
      plugins: [lgZoom, lgThumbnail, lgRotate, lgAutoplay, lgFullscreen],
      dynamicEl: images().map((obj) => {
        const raw = rawLink(obj, true)
        return {
          src: raw,
          thumb: obj.thumb === "" ? raw : obj.thumb,
          subHtml: `<h4>${obj.name}</h4>`,
        }
      }),
    })
  }
  createEffect(
    on(images, () => {
      dynamicGallery?.destroy()
      dynamicGallery = undefined
    }),
  )
  bus.on("gallery", (name) => {
    if (!dynamicGallery) {
      initGallery()
    }
    dynamicGallery?.openGallery(images().findIndex((obj) => obj.name === name))
  })
  onCleanup(() => {
    bus.off("gallery")
    dynamicGallery?.destroy()
  })
  const t = useT()
  return (
    <>
      <Switch>
        <Match when={layout() === "list"}>
          <ListLayout />
        </Match>
        <Match when={layout() === "grid"}>
          <GridLayout />
        </Match>
        <Match when={layout() === "image"}>
          <ImageLayout images={images()} />
        </Match>
      </Switch>
      <Pager />
      <Search />
      <ContextMenu />
    </>
  )
}

export default Folder
