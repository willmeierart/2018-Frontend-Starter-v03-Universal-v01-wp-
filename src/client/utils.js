import React from 'react'

export const binder=(x,Ms)=>Ms.forEach(m=>x[m]=x[m].bind(x))

export function FirstChild(props) {
  const childrenArray = React.Children.toArray(props.children)
  return childrenArray[0] || null
}
