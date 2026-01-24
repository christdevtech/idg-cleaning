import React from 'react'
import * as FaIcons from 'react-icons/fa6'
import * as MdIcons from 'react-icons/md'
import * as IoIcons from 'react-icons/io5'
import * as BiIcons from 'react-icons/bi'

// Combine all icons into a single registry
export const iconRegistry: Record<
  string,
  React.ComponentType<{ size?: number; className?: string }>
> = {
  ...FaIcons,
  ...MdIcons,
  ...IoIcons,
  ...BiIcons,
}

export type IconName = keyof typeof iconRegistry
