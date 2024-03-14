<script lang="ts" setup>
import {useDrop, XYCoord} from 'vue3-dnd'
import {ItemTypes} from './ItemTypes'
import Box from './Box.vue'
import type {DragItem} from './interfaces'
import {reactive, ref} from 'vue'
import ItemCard from "@/components/ItemCard.vue";
import AvailableResources from "@/components/AvailableResources.vue";
import {useBoxesStore} from "@/stores/useBoxesStore";
import {storeToRefs} from "pinia";

const store = useBoxesStore()
const { boxes } = store
const moveBox = (id: string, left: number, top: number, title?: string, emoji?: string) => {
  if (id) {
    Object.assign(boxes[id], {left, top})
  } else {
    const key = Math.random().toString(36).substring(7);
    boxes[key] = {top, left, title, emoji}
    console.log(boxes)

  }
}

const containerElement = ref<HTMLElement | null>(null)

const [, drop] = useDrop(() => ({
  accept: ItemTypes.BOX,
  drop(item: DragItem, monitor) {
    if (item.id && item.left !== null && item.top !== null) {
      const delta = monitor.getDifferenceFromInitialOffset() as XYCoord
      if(delta && delta.x && delta.y){
        const left = Math.round((item.left) + delta.x)
        const top = Math.round((item.top) + delta.y )
        moveBox(item.id, left, top)
      }
    } else {
      const delta = monitor.getClientOffset() as XYCoord
      // current mouse position relative to drop
      const containerCoords = containerElement.value.getBoundingClientRect()
      if(delta && delta.x && delta.y){
        const left = Math.round(delta.x - containerCoords.left - 40)
        const top = Math.round(delta.y - containerCoords.top - 15)
        moveBox(null, left, top, item.title, item.emoji)
      }
    }
    return undefined
  },
}))
</script>

<template>
  <div ref="containerElement">

    <main class="flex gap-x-3">
      <div class="w-3/4">
        <div :ref="drop" class="container">
          <Box
              v-for="(value, key) in boxes"
              :id="key"
              :key="key"
              :left="value.left"
              :top="value.top"
              :loading="value.loading"
          >
            <ItemCard size="large" :id="key" :title="value.title" :emoji="value.emoji"/>
          </Box>
        </div>
      </div>
      <div class="w-1/4 bg-white shadow px-4 py-3 border-gray-200 border rounded-lg overflow-y-scroll max-h-[80vh]">
        <h2 class="font-semibold">Resources</h2>
        <AvailableResources></AvailableResources>
      </div>
    </main>


  </div>

</template>

<style scoped>
.container {
  position: relative;
  width: 100%;
  height: 90vh;
}
</style>
