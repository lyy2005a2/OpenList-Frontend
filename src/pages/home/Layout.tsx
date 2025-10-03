import { Markdown } from "~/components"
import { useTitle } from "~/hooks"
import { getSetting } from "~/store"
import { notify } from "~/utils"
import { Body } from "./Body"
import { Footer } from "./Footer"
import { Header } from "./header/Header"
import { Toolbar } from "./toolbar/Toolbar"
import { onMount } from "solid-js"

let announcementShown = false

const Index = () => {
  useTitle(getSetting("site_title"))
  const announcement = getSetting("announcement")

  onMount(() => {
    if (announcement && !announcementShown) {
      notify.render(() => <Markdown children={announcement} />)
      announcementShown = true
    }
  })
  return (
    <>
      <Header />
      <Toolbar />
      <Body />
      <Footer />
    </>
  )
}

export default Index
