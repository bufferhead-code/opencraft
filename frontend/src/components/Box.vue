<script lang="ts" setup>
import {useDrag} from 'vue3-dnd'
import {ItemTypes} from './ItemTypes'
import {toRefs} from '@vueuse/core'

const props = defineProps<{
  id: any
  left: number
  top: number
  hideSourceOnDrag?: boolean
  loading?: boolean
}>()

const [collect, drag] = useDrag(() => ({
  type: ItemTypes.BOX,
  item: {id: props.id, left: props.left, top: props.top},
  collect: monitor => ({
    isDragging: monitor.isDragging(),
  }),
}))
const {isDragging} = toRefs(collect)
</script>

<template>
  <div v-if="isDragging && hideSourceOnDrag" :ref="drag"/>
  <div
      v-else
      :ref="drag"
      class="absolute"
      :style="{ left: `${left}px`, top: `${top}px` }"
      role="Box"
      data-testid="box"
  >
    <div v-if="loading">
      <div
          class="border-gray-200 shadow hover:bg-gray-100 cursor-pointer transition inline-flex items-center text-2xl space-x-2.5 py-2.5 px-4 font-medium border rounded-lg ">
        <svg class="animate-spin -ml-1 mr-2 h-6 w-6 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span>
          Loading
        </span>
      </div>
    </div>
    <slot v-else></slot>
  </div>
</template>

<style scoped>

</style>
