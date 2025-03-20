<template>
    <div class="inventory">
      <div class="inventory__grid">
        <InventoryItem
          v-for="(item, index) in store.items"
          :key="item.id"
          :item="item"
          :index="index"
          @open="openItem"
          @move="moveItem"
        />
      </div>
      <transition name="fade">
        <ItemDetails
          v-if="selectedItem"
          :item="selectedItem"
          :index="selectedIndex!"
          @remove="removeItem"
          @close="closeDetails"
        />
      </transition>
    </div>
</template>
  
<script setup lang="ts">
  import { ref } from 'vue';
  import { useInventoryStore, type InventoryItem as InventoryItemType } from '../store/inventory';
  import InventoryItem from './InventoryItem.vue';
  import ItemDetails from './ItemDetails.vue';
  
  const store = useInventoryStore();

  const selectedItem = ref<InventoryItemType | null>(null);
  const selectedIndex = ref<number | null>(null);
  
  const openItem = (index: number) => {
    selectedItem.value = store.items[index];
    selectedIndex.value = index;
  };
  
  const closeDetails = () => {
    selectedItem.value = null;
    selectedIndex.value = null;
  };
  
  const moveItem = (fromIndex: number, toIndex: number) => {
    store.moveItem(fromIndex, toIndex);
  };
  
  const removeItem = (index: number) => {
    store.removeItem(index);
    closeDetails();
  };
</script>
  
<style scoped lang="scss">
  .inventory {
    position: relative;
  
    &__grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
      gap: 1rem;
      max-width: 600px;
    }
  }
  
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s;
  }
  
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>