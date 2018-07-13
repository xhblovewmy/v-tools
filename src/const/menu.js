import { routes } from '@/router'

const menus = routes.reduce((prev, next) => {
  if (!next.children) {
    if (!next.isMenu) return prev
    return [...prev, {
      name: next.name,
      title: next.meta ? next.meta.title : '',
      iconClass: next.meta ? next.meta.iconClass : ''
    }]
  }
  const children = next.children.map(item => {
    if (!item.isMenu) return null
    return {
      name: item.name,
      title: item.meta ? item.meta.title : '',
      iconClass: item.meta ? item.meta.iconClass : ''
    }
  }).map(f => f)
  return [...prev, ...children]
}, [])

export default menus
