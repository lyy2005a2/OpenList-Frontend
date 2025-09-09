import { SideMenuItemProps } from "./SideMenu"
import {
  BsGearFill,
  BsPaletteFill,
  BsCameraFill,
  BsWindow,
  BsPersonCircle,
  BsJoystick,
  BsMedium,
  BsFingerprint,
  BsFront,
  BsCloudUploadFill,
  BsSearch,
  BsBucket,
  BsHddNetwork,
  BsArrowLeftRight,
} from "solid-icons/bs"
import { FiLogIn } from "solid-icons/fi"
import { SiMetabase } from "solid-icons/si"
import { CgDatabase, CgShare } from "solid-icons/cg"
import { OcWorkflow2 } from "solid-icons/oc"
import { IoCopy, IoMove, IoHome, IoMagnetOutline } from "solid-icons/io"
import { Component, lazy } from "solid-js"
import { Group, UserRole } from "~/types"
import { FaSolidBook, FaSolidDatabase } from "solid-icons/fa"
import { TbArchive } from "solid-icons/tb"

export type SideMenuItem = SideMenuItemProps & {
  component?: Component
  children?: SideMenuItem[]
}

const CommonSettings = lazy(() => import("./settings/Common"))

export const side_menu_items: SideMenuItem[] = [
  {
    title: "manage.sidemenu.profile",
    icon: BsFingerprint,
    to: "/LONGYun2025",
    role: UserRole.GUEST,
    component: lazy(() => import("./users/Profile")),
  },
  {
    title: "manage.sidemenu.settings",
    icon: BsGearFill,
    to: "/LONGYun2025/settings",
    children: [
      {
        title: "manage.sidemenu.site",
        icon: BsWindow,
        to: "/LONGYun2025/settings/site",
        component: () => <CommonSettings group={Group.SITE} />,
      },
      {
        title: "manage.sidemenu.style",
        icon: BsPaletteFill,
        to: "/LONGYun2025/settings/style",
        component: () => <CommonSettings group={Group.STYLE} />,
      },
      {
        title: "manage.sidemenu.preview",
        icon: BsCameraFill,
        to: "/LONGYun2025/settings/preview",
        component: () => <CommonSettings group={Group.PREVIEW} />,
      },
      {
        title: "manage.sidemenu.global",
        icon: BsJoystick,
        to: "/LONGYun2025/settings/global",
        component: () => <CommonSettings group={Group.GLOBAL} />,
      },
      {
        title: "manage.sidemenu.sso",
        icon: FiLogIn,
        to: "/LONGYun2025/settings/sso",
        component: () => <CommonSettings group={Group.SSO} />,
      },
      {
        title: "manage.sidemenu.ldap",
        icon: FiLogIn,
        to: "/LONGYun2025/settings/ldap",
        component: () => <CommonSettings group={Group.LDAP} />,
      },
      {
        title: "manage.sidemenu.s3",
        icon: BsBucket,
        to: "/LONGYun2025/settings/s3",
        component: lazy(() => import("./settings/S3")),
      },
      {
        title: "manage.sidemenu.ftp",
        icon: BsHddNetwork,
        to: "/LONGYun2025/settings/ftp",
        component: () => <CommonSettings group={Group.FTP} />,
      },
      {
        title: "manage.sidemenu.traffic",
        icon: BsArrowLeftRight,
        to: "/LONGYun2025/settings/traffic",
        component: () => <CommonSettings group={Group.TRAFFIC} />,
      },
      {
        title: "manage.sidemenu.other",
        icon: BsMedium,
        to: "/LONGYun2025/settings/other",
        component: lazy(() => import("./settings/Other")),
      },
    ],
  },
  {
    title: "manage.sidemenu.tasks",
    icon: OcWorkflow2,
    to: "/LONGYun2025/tasks",
    role: UserRole.GENERAL,
    children: [
      {
        title: "manage.sidemenu.offline_download",
        icon: IoMagnetOutline,
        to: "/LONGYun2025/tasks/offline_download",
        role: UserRole.GENERAL,
        component: lazy(() => import("./tasks/offline_download")),
      },
      // {
      //   title: "manage.sidemenu.aria2",
      //   icon: BsCloudArrowDownFill,
      //   to: "/LONGYun2025/tasks/aria2",
      //   component: lazy(() => import("./tasks/Aria2")),
      // },
      // {
      //   title: "manage.sidemenu.qbit",
      //   icon: FaBrandsQuinscape,
      //   to: "/LONGYun2025/tasks/qbit",
      //   component: lazy(() => import("./tasks/Qbit")),
      // },
      {
        title: "manage.sidemenu.upload",
        icon: BsCloudUploadFill,
        to: "/LONGYun2025/tasks/upload",
        role: UserRole.GENERAL,
        component: lazy(() => import("./tasks/Upload")),
      },
      {
        title: "manage.sidemenu.copy",
        icon: IoCopy,
        to: "/LONGYun2025/tasks/copy",
        role: UserRole.GENERAL,
        component: lazy(() => import("./tasks/Copy")),
      },
      {
        title: "manage.sidemenu.move",
        icon: IoMove,
        to: "/LONGYun2025/tasks/move",
        role: UserRole.GENERAL,
        component: lazy(() => import("./tasks/Move")),
      },
      {
        title: "manage.sidemenu.decompress",
        icon: TbArchive,
        to: "/LONGYun2025/tasks/decompress",
        role: UserRole.GENERAL,
        component: lazy(() => import("./tasks/Decompress")),
      },
    ],
  },
  {
    title: "manage.sidemenu.users",
    icon: BsPersonCircle,
    to: "/LONGYun2025/users",
    component: lazy(() => import("./users/Users")),
  },
  {
    title: "manage.sidemenu.storages",
    icon: CgDatabase,
    to: "/LONGYun2025/storages",
    component: lazy(() => import("./storages/Storages")),
  },
  {
    title: "manage.sidemenu.shares",
    icon: CgShare,
    to: "/LONGYun2025/shares",
    role: UserRole.GENERAL,
    component: lazy(() => import("./shares/Shares")),
  },
  {
    title: "manage.sidemenu.metas",
    icon: SiMetabase,
    to: "/LONGYun2025/metas",
    component: lazy(() => import("./metas/Metas")),
  },
  {
    title: "manage.sidemenu.indexes",
    icon: BsSearch,
    to: "/LONGYun2025/indexes",
    component: lazy(() => import("./indexes/indexes")),
  },
  {
    title: "manage.sidemenu.backup-restore",
    to: "/LONGYun2025/backup-restore",
    icon: FaSolidDatabase,
    component: lazy(() => import("./backup-restore")),
  },
  {
    title: "manage.sidemenu.home",
    icon: IoHome,
    to: "/",
    role: UserRole.GUEST,
    refresh: true,
  },
]
