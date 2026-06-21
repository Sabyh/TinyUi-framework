// @ts-ignore
import './css/style.css'
import FullList from './model/FullList'
import ListItem from './model/ListItem'
import ListTemplate from './templates/ListTemplate'

const initApp = (): void => {
  const fullList = FullList.instance
  const template = ListTemplate.instance
  let currentFilter: 'all' | 'active' | 'completed' = 'all'

  const itemCount = document.getElementById("itemCount") as HTMLElement
  const showAll = document.getElementById("showAll") as HTMLButtonElement
  const showActive = document.getElementById("showActive") as HTMLButtonElement
  const showCompleted = document.getElementById("showCompleted") as HTMLButtonElement
  const itemEntryForm = document.getElementById("itemEntryForm") as HTMLFormElement
  const clearItems = document.getElementById("clearItemsButton") as HTMLButtonElement

  console.log('initApp started')

  const renderList = (): void => {
    console.log('renderList', { currentFilter, totalItems: fullList.list.length })
    template.render(fullList, currentFilter)
    updateItemCount()
  }

  const updateItemCount = (): void => {
    const totalItems = fullList.list.length
    itemCount.textContent = `${totalItems} items`
  }

  itemEntryForm.addEventListener("submit", (event: SubmitEvent): void => {
    event.preventDefault()

    const input = document.getElementById("newItem") as HTMLInputElement
    const newEntryText: string = input.value.trim()
    if (!newEntryText.length) return

    console.log('submit add item', { newEntryText })

    const itemId: number = fullList.list.length
      ? parseInt(fullList.list[fullList.list.length - 1].id) + 1
      : 1

    const newItem = new ListItem(itemId.toString(), newEntryText)
    fullList.addItem(newItem)
    renderList()
  })

  clearItems.addEventListener('click', (): void => {
    fullList.clearList()
    renderList()
  })

  showAll.addEventListener("click", () => {
    currentFilter = 'all'
    renderList()
  })

  showActive.addEventListener("click", () => {
    currentFilter = 'active'
    renderList()
  })

  showCompleted.addEventListener("click", () => {
    currentFilter = 'completed'
    renderList()
  })

  fullList.load()
  renderList()
}


document.addEventListener("DOMContentLoaded", initApp) 