<template>
  <div class="app">
    <header class="app__header">
      <h1 class="app__title">Инвентарь</h1>
    </header>
    <button class="app__add-button" @click="toggleForm">+ Добавить предмет</button>
    <AddItemForm v-if="showForm" @close="toggleForm" @item-added="handleNewItem" />
    <Inventory />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Inventory from './components/Inventory.vue';
import AddItemForm from './components/AddItemForm.vue';
import type { InventoryItem } from './store/inventory';
import { useInventoryStore } from './store/inventory';

const store = useInventoryStore();

const showForm = ref<boolean>(false);

const toggleForm = () => {
  showForm.value = !showForm.value;
};

const handleNewItem = (newItem: InventoryItem) => {
  store.addItem(newItem);
  showForm.value = false;
};
</script>

<style scoped lang="scss">
.app {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;

  &__header {
    margin-bottom: 1rem;
  }

  &__title {
    font-size: 2rem;
    margin: 0;
  }

  &__add-button {
    margin-bottom: 1rem;
    background-color: #4caf50;
    color: #fff;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;

    &:hover {
      background-color: #43a047;
    }
  }
}
</style>