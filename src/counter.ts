export function setupCounter(element: HTMLButtonElement | null) {
  if (!element) return
  let counter = 0
  const setCounter = (count: number) => {
    counter = count
    element.textContent = `Count is ${counter}`
  }
  element.addEventListener('click', () => setCounter(counter + 1))
  setCounter(0)
}
