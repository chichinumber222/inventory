import { defineStore } from 'pinia'

export interface InventoryItem {
    id: number
    name: string
    description: string
}

interface InventoryState {
    items: InventoryItem[]
}

export const useInventoryStore = defineStore('inventory', {
    state: (): InventoryState => ({
        items: JSON.parse(localStorage.getItem('inventory') || '[]') as InventoryItem[],
    }),
    actions: {
        addItem(item: InventoryItem): void {
            this.items.push(item)
            this.saveToLocalStorage()
        },
        removeItem(index: number): void {
            this.items.splice(index, 1)
            this.saveToLocalStorage()
        },
        moveItem(fromIndex: number, toIndex: number): void {
            const item = this.items.splice(fromIndex, 1)[0]
            this.items.splice(toIndex, 0, item)
            this.saveToLocalStorage()
        },
        saveToLocalStorage(): void {
            localStorage.setItem('inventory', JSON.stringify(this.items))
        },
    },
})