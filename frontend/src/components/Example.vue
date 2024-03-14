<script setup lang="ts">
import Container from './Container.vue'

import { DndProvider } from 'vue3-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

</script>

<template>
  <div>
    <DndProvider :backend="HTML5Backend">
      <Container />
    </DndProvider>
  </div>
</template>
