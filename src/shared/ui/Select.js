export function Select({ options = [], className = '' } = {}) {
  const element = document.createElement('select')

  options.forEach(({ value, label }) => {
    const option = document.createElement('option')
    option.value = String(value)
    option.textContent = label
    element.append(option)
  })

  if (className) {
    element.className = className
  }

  return element
}
