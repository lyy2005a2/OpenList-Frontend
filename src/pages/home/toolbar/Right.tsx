import {
  Box,
  createDisclosure,
  VStack,
  notificationService,
} from "@hope-ui/solid"
import { createMemo, Show } from "solid-js"
import { RightIcon } from "./Icon"
import { TbCheckbox } from "solid-icons/tb"
import {
  objStore,
  selectAll,
  State,
  toggleCheckbox,
  userCan,
  me,
} from "~/store"
import { bus } from "~/utils"
import { operations } from "./operations"
import { IoMagnetOutline } from "solid-icons/io"
import { AiOutlineCloudUpload, AiOutlineSetting } from "solid-icons/ai"
import { RiSystemRefreshLine } from "solid-icons/ri"
import { usePath, useRouter } from "~/hooks"
import { Motion } from "solid-motionone"
import { isTocVisible, setTocDisabled } from "~/components"
import { BiSolidBookContent } from "solid-icons/bi"
import { VsHeart } from "solid-icons/vs"
import { UserMethods } from "~/types"
import { Icon, useColorMode, useColorModeValue } from "@hope-ui/solid"
// import { IoMoonOutline as Moon } from "solid-icons/io";
import { FiSun as Sun } from "solid-icons/fi"
import { FiMoon as Moon } from "solid-icons/fi"

export const Right = () => {
  const { isOpen, onToggle } = createDisclosure({
    defaultIsOpen: localStorage.getItem("more-open") === "true",
    onClose: () => localStorage.setItem("more-open", "false"),
    onOpen: () => localStorage.setItem("more-open", "true"),
  })
  const margin = createMemo(() => (isOpen() ? "$4" : "$5"))
  const isFolder = createMemo(() => objStore.state === State.Folder)
  const { refresh } = usePath()
  const { isShare } = useRouter()
  return (
    <Box
      class="right-toolbar-box"
      pos="fixed"
      right={margin()}
      bottom={margin()}
    >
      {/* 将设置移动出来,已经没用了这个.... */}
      {/* <Show
        when={isOpen()}
        fallback={
          <RightIcon
              as={AiOutlineSetting}
              tips="local_settings"
              onClick={() => {
                bus.emit("tool", "local_settings");
              }}
            />
        }
      >  
      </Show> */}
      {/* 刷新按钮移动出来 */}
      <VStack spacing="$1" class="left-toolbar-in">
        <Show when={isFolder() && (userCan("write") || objStore.write)}>
          <RightIcon
            as={RiSystemRefreshLine}
            tips="refresh"
            onClick={() => {
              refresh(undefined, true)
              notificationService.show({
                status: "success",
                description: "目录刷新成功",
                closable: false,
              })
            }}
          />
        </Show>
      </VStack>

      {/* 夜间白天模式切换,搜下面的那个class关键词就知道这个加那里了 */}
      <Show
        when={isOpen()}
        fallback={
          <RightIcon
            // 图标已更换
            as={icon().component}
            // tips="白天夜间模式切换"
            onClick={toggleColorMode}
          />
        }
      >
        {/* 添加 children 属性 */}
        {null}
      </Show>

      {/* 以上代码加到这个原有的设置上面即可 */}
      <Show
        when={isOpen()}
        fallback={
          <RightIcon
            class="toolbar-toggle"
            tips="more"
            as={VsHeart}
            onClick={() => {
              onToggle()
            }}
          />
        }
      >
        <VStack
          class="right-toolbar"
          p="$1"
          rounded="$lg"
          spacing="$1"
          // shadow="0px 10px 30px -5px rgba(0, 0, 0, 0.3)"
          // bgColor={useColorModeValue("white", "$neutral4")()}
          bgColor="$neutral1"
          as={Motion.div}
          initial={{ opacity: 0, scale: 0, y: 300 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, y: 300 }}
          // @ts-ignore
          transition={{ duration: 0.2 }}
        >
          <VStack spacing="$1" class="right-toolbar-in">
            {/* <Add /> */}
            {/* 原本的刷新按钮隐藏了 */}
            {/* <RightIcon
                as={RiSystemRefreshLine}
                tips="refresh"
                onClick={() => {
                  refresh(undefined, true);
                }}
              /> */}
            <Show
              when={
                isFolder() && !isShare() && (userCan("write") || objStore.write)
              }
            >
              <RightIcon
                as={AiOutlineCloudUpload}
                tips="upload"
                onClick={() => {
                  bus.emit("tool", "upload")
                }}
              />
              <RightIcon
                as={operations.new_file.icon}
                tips="new_file"
                onClick={() => {
                  bus.emit("tool", "new_file")
                }}
              />
              <RightIcon
                as={operations.mkdir.icon}
                p="$1_5"
                tips="mkdir"
                onClick={() => {
                  bus.emit("tool", "mkdir")
                }}
              />
              <RightIcon
                as={operations.recursive_move.icon}
                tips="recursive_move"
                onClick={() => {
                  bus.emit("tool", "recursiveMove")
                }}
              />
              <RightIcon
                as={operations.batch_rename.icon}
                tips="batch_rename"
                onClick={() => {
                  selectAll(true)
                  bus.emit("tool", "batchRename")
                }}
              />
            </Show>
            <Show
              when={isFolder() && !isShare() && userCan("offline_download")}
            >
              <RightIcon
                as={IoMagnetOutline}
                pl="0"
                tips="offline_download"
                onClick={() => {
                  bus.emit("tool", "offline_download")
                }}
              />
            </Show>
            <Show when={isTocVisible()}>
              <RightIcon
                as={BiSolidBookContent}
                tips="toggle_markdown_toc"
                onClick={() => {
                  setTocDisabled((disabled) => !disabled)
                }}
              />
            </Show>

            <RightIcon
              tips="toggle_checkbox"
              as={TbCheckbox}
              onClick={toggleCheckbox}
            />
            <RightIcon
              as={AiOutlineSetting}
              tips="browser_setting"
              onClick={() => {
                bus.emit("tool", "local_settings")
              }}
            />
          </VStack>
          <RightIcon tips="close" as={VsHeart} onClick={onToggle} />
        </VStack>
      </Show>
    </Box>
  )
}
