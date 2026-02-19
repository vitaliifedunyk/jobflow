export function Button({ label = 'Button', type = 'button', className = '' } = {}) {
  const element = document.createElement('button')
  element.type = type
  element.textContent = label

  if (className) {
    element.className = className
  }

  return element
}

