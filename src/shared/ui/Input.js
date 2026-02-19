export function Input({ type = 'text', placeholder = '', className = '' } = {}) {
  const element = document.createElement('input')
  element.type = type
  element.placeholder = placeholder

  if (className) {
    element.className = className
  }

  return element
}
