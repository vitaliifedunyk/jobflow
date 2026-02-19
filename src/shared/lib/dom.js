export const qs = (selector, root = document) => root.querySelector(selector)

export const qsa = (selector, root = document) => Array.from(root.querySelectorAll(selector))

export function createElement(tagName, className = '') {
  const element = document.createElement(tagName)

  if (className) {
    element.className = className
  }

  return element
}
