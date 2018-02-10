import { createGetter } from 'utilities/stateHelper'

const leftSidebarOpenGetter = createGetter(['leftSidebar', 'isOpen'])

export const getLocalState = state => state.commonUi
export const getLeftSidebarIsOpen = state => leftSidebarOpenGetter(state)
