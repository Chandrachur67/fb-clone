import React from 'react'

import { Avatar } from '@mui/material';

import "./SidebarRow.css"
import { fontSize } from '@mui/system';

function SidebarRow({src, Icon, title}) {
  return (
    <section className="sidebarRow">
        {src && <Avatar src={src}/>}
        {Icon && <Icon />}
        <p>{title}</p>
    </section>
  )
}

export default SidebarRow