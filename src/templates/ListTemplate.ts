import FullList from "../model/FullList"

type FilterType = 'all' | 'active' | 'completed'

interface DOMList {
    ul: HTMLUListElement,
    clear(): void,
    render(fullList: FullList, filter: FilterType): void,
}

export default class ListTemplate implements DOMList {

    ul: HTMLUListElement
    fullListRef: FullList | null = null
    filterRef: FilterType = 'all'

    static instance: ListTemplate = new ListTemplate()

    private constructor() {
        this.ul = document.getElementById("listItems") as HTMLUListElement
        
        // Event delegation: handle ALL checkbox changes on the ul
        this.ul.addEventListener('change', (event: Event) => {
            const target = event.target as HTMLInputElement
            if (target.type === 'checkbox' && this.fullListRef) {
                console.log('checkbox change delegated', { id: target.id, checked: target.checked })
                
                // Find the item by id and update it
                const item = this.fullListRef.list.find(i => i.id === target.id)
                if (item) {
                    item.checked = target.checked
                    this.fullListRef.save()
                    console.log('item updated and saved', { id: item.id, checked: item.checked })
                    this.render(this.fullListRef, this.filterRef)
                }
            }
        })

        // Also handle delete button clicks
        this.ul.addEventListener('click', (event: Event) => {
            const target = event.target as HTMLButtonElement
            if (target.className === 'button' && target.textContent === 'X' && this.fullListRef) {
                const li = target.closest('li')
                const checkbox = li?.querySelector('input[type="checkbox"]') as HTMLInputElement
                if (checkbox) {
                    console.log('delete button clicked', checkbox.id)
                    this.fullListRef.removeItem(checkbox.id)
                    this.render(this.fullListRef, this.filterRef)
                }
            }
        })
    }

    clear(): void {
        this.ul.innerHTML = ''
    }

    render(fullList: FullList, filter: FilterType = 'all'): void {
        console.log('ListTemplate.render', { filter, fullListLength: fullList.list.length })
        this.fullListRef = fullList
        this.filterRef = filter
        
        this.clear()
        const itemsToShow = fullList.list.filter(item => {
            console.log('filtering item', { id: item.id, checked: item.checked, filter })
            if (filter === 'active') return !item.checked
            if (filter === 'completed') return item.checked
            return true
        })

        itemsToShow.forEach(item => {
            const li = document.createElement("li") as HTMLLIElement
            li.className = "item"

            const check = document.createElement("input") as HTMLInputElement
            check.type = "checkbox"
            check.id = item.id
            check.checked = item.checked

            const label = document.createElement("label") as HTMLLabelElement
            label.append(check)
            label.append(" " + item.item)
            
            li.append(label)

            const button = document.createElement("button") as HTMLButtonElement
            button.className = 'button'
            button.textContent = 'X'
            li.append(button)

            console.log('render item', { id: item.id, checked: item.checked, filter })
            
            this.ul.append(li)
        })
    }

}