<template>
  <div
    class="inventory-item"
    draggable="true"
    @dragstart="dragStart"
    @dragover.prevent
    @drop="dropItem"
    @click="openDetails"
  >
    <p class="inventory-item__name">{{ item.name }}</p>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import type { InventoryItem } from '../store/inventory';

interface Props {
  item: InventoryItem;
  index: number;
}

const props = defineProps<Props>();
const emit = defineEmits<{ open: [index: number]; move: [fromIndex: number, toIndex: number] }>();

const dragStart = (event: DragEvent): void => {
  event.dataTransfer?.setData('fromIndex', props.index.toString());
};

const dropItem = (event: DragEvent): void => {
  const fromIndex = event.dataTransfer?.getData('fromIndex');
  if (fromIndex !== undefined) {
    emit('move', parseInt(fromIndex, 10), props.index);
  }
};

const openDetails = (): void => {
  emit('open', props.index);
};
</script>

<style scoped lang="scss">
.inventory-item {
  background: #ddd;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  cursor: pointer;
  text-align: center;
  user-select: none;

  &__name {
    font-size: 0.9rem;
    padding: 0.5rem;
  }

  &:hover {
    background: #ccc;
  }
}
</style>