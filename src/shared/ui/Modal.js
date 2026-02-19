export function Modal({ content = '' } = {}) {
  const element = document.createElement('div')
  element.setAttribute('role', 'dialog')
  element.hidden = true
  element.innerHTML = content

  element.open = () => {
    element.hidden = false
  }

  element.close = () => {
    element.hidden = true
  }

  return element
}
