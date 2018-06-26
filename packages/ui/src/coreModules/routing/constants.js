export const NAVIGATION_ITEMS = [
  {
    exact: true,
    name: 'start',
    path: '/app',
  },
  {
    exact: true,
    name: 'specimens',
    path: '/app/specimens/mammals',
  },
  {
    exact: false,
    name: 'agents',
    path: '/app/agents',
  },
  {
    exact: false,
    name: 'localities',
    path: '/app/localities',
  },
  {
    exact: false,
    name: 'storage',
    path: '/app/storageLocations',
  },
  {
    exact: false,
    name: 'taxon',
    path: '/app/taxa',
  },
  {
    exact: false,
    name: 'scientificNames',
    path: '/app/taxonNames',
  },
  {
    exact: true,
    name: 'registerMammal',
    path: '/app/mammals/register',
  },
  {
    exact: true,
    name: 'lookupMammals',
    path: '/app/mammals/lookup',
  },
  {
    exact: true,
    icon: 'setting',
    name: 'settings',
    path: '/app/settings',
    push: true,
  },
]
