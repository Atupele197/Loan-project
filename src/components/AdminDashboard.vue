<script setup lang="ts">
import Menu from 'primevue/menu'
import { ref } from 'vue'

const items = ref([
  { label: 'New', icon: 'pi pi-plus' },
  { label: 'Search', icon: 'pi pi-search' },
])
</script>

<template>
  <div>
    <Menu :model="items" />
  </div>
</template>
