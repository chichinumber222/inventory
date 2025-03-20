<template>
    <div class="add-item">
      <div class="add-item__content">
        <h2 class="add-item__title">Добавить новый предмет</h2>
  
        <form class="add-item__form" @submit.prevent="submitForm">
          <label class="add-item__label" for="itemName">Название:</label>
          <input
            id="itemName"
            class="add-item__input"
            type="text"
            v-model="itemName"
            required
            placeholder="Название предмета"
          />
  
          <label class="add-item__label" for="itemDesc">Описание:</label>
          <textarea
            id="itemDesc"
            class="add-item__input"
            rows="3"
            v-model="itemDesc"
            required
            placeholder="Описание предмета"
          />
  
          <div class="add-item__buttons">
            <button class="add-item__save" type="submit">Сохранить</button>
            <button class="add-item__cancel" type="button" @click="$emit('close')">Отмена</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { defineEmits } from 'vue';
  import type { InventoryItem } from '../store/inventory';
  
  const emit = defineEmits<{ 'close': []; 'item-added': [InventoryItem] }>();
  
  const itemName = ref('');
  const itemDesc = ref('');
  
  function submitForm() {
    const newItem: InventoryItem = {
      id: Date.now(),
      name: itemName.value,
      description: itemDesc.value,
    };
  
    emit('item-added', newItem);
    itemName.value = '';
    itemDesc.value = '';
  }
  </script>
  
  <style scoped lang="scss">
  .add-item {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 20;
  
    &__content {
      background: #fff;
      padding: 1rem;
      border-radius: 6px;
      min-width: 300px;
    }
  
    &__title {
      margin: 0 0 1rem 0;
      font-size: 1.2rem;
    }
  
    &__form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  
    &__label {
      font-weight: bold;
      margin-bottom: 0.5rem;
    }
  
    &__input {
      width: 100%;
      box-sizing: border-box;
      padding: 0.5rem;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
  
    &__buttons {
      display: flex;
      gap: 0.5rem;
      justify-content: flex-end;
    }
  
    &__save {
      background-color: #4caf50;
      color: #fff;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
    }
  
    &__cancel {
      background-color: #757575;
      color: #fff;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
    }
  
    &__save:hover {
      background-color: #43a047;
    }
  
    &__cancel:hover {
      background-color: #616161;
    }
  }
  </style>