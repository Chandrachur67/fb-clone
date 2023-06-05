import React, { useContext } from 'react'
import SidebarRow from "./SidebarRow"

import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import TodayIcon from '@mui/icons-material/Today';
import GroupsIcon from '@mui/icons-material/Groups';
import StorefrontIcon from '@mui/icons-material/Storefront';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import FlagIcon from '@mui/icons-material/Flag';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


import "./Sidebar.css"
import { AuthContext } from '../Auth';

function Sidebar() {
  const { currentUser } = useContext(AuthContext);
  return (
    <section className="sidebar">
      <SidebarRow
        src={currentUser.photoURL}
        title={currentUser.displayName} />
      <SidebarRow
        Icon={PeopleAltIcon}
        title="Friends" />
      <SidebarRow
        Icon={TodayIcon}
        title="Most Recent" />
      <SidebarRow
        Icon={GroupsIcon}
        title="Groups" />
      <SidebarRow
        Icon={StorefrontIcon}
        title="MarketPlace" />
      <SidebarRow
        Icon={OndemandVideoIcon}
        title="Watch" />
      <SidebarRow
        Icon={AccessTimeFilledIcon}
        title="Memories" />
      <SidebarRow
        Icon={BookmarkIcon}
        title="Saved" />
      <SidebarRow
        Icon={FlagIcon}
        title="Pages" />
      <SidebarRow
        Icon={VideoLibraryIcon}
        title="Reels" />
      <SidebarRow
        Icon={KeyboardArrowDownIcon}
        title="See More" />

    </section>
  )
}

export default Sidebar