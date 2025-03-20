<template>
    <div class="item-details">
      <div class="item-details__content">
        <h2 class="item-details__title">{{ item.name }}</h2>
        <p class="item-details__desc">{{ item.description }}</p>
  
        <div class="item-details__buttons">
          <button class="item-details__delete" @click="$emit('remove', index)">Удалить</button>
          <button class="item-details__close" @click="$emit('close')">Закрыть</button>
        </div>
      </div>
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
  const emit = defineEmits<{ remove: [index: number]; close: [] }>();

  // временный лайфхак от жалоб линтера на неиспользуемые переменные
  console.log('props :>> ', props);
  console.log('emit :>> ', emit);
  </script>
  
  <style scoped lang="scss">
  .item-details {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
  
    &__content {
      background: #fff;
      padding: 1rem;
      border-radius: 6px;
      min-width: 300px;
    }
  
    &__title {
      margin: 0 0 0.5rem 0;
      font-size: 1.2rem;
    }
  
    &__desc {
      margin: 0;
    }
  
    &__buttons {
      display: flex;
      gap: 0.5rem;
      margin-top: 1rem;
    }
  
    &__delete {
      background-color: #e53935;
      color: #fff;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
    }
  
    &__close {
      background-color: #757575;
      color: #fff;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
    }
  
    &__delete:hover {
      background-color: #c62828;
    }
  
    &__close:hover {
      background-color: #616161;
    }
  }
  </style>