<script setup lang="ts">
import {useDrop} from "vue3-dnd";
import {ItemTypes} from "@/components/ItemTypes";
import {DragItem} from "@/components/interfaces";
import {useBoxesStore} from "@/stores/useBoxesStore";
import axios from "axios";
import {useResourcesStore} from "@/stores/useResourcesStore";
import {storeToRefs} from "pinia";
import {twMerge} from "tailwind-merge";

const props = defineProps<{
  title: string;
  emoji: string;
  id: string;
  size: 'small' | 'large';
}>()

const store = useBoxesStore()
const {removeBox, addBox} = store
const {resources} = storeToRefs(useResourcesStore())
const {addResource} =useResourcesStore()

const [, drop] = useDrop(() => ({
  accept: ItemTypes.BOX,
  async drop(item: DragItem, monitor) {
    if (item.id !== props.id) {
      const droppedId = item?.id;
      const secondTitle = store.boxes[droppedId]?.title ?? item?.title
      if(droppedId){
        removeBox(droppedId);
      }
      store.boxes[props.id].loading = true
      const response = await axios.post('http://127.0.0.1:3000/', {
        first: store.boxes[props.id].title,
        second: secondTitle
      })

      const resultAnswer = response.data.result !== '' ? response.data.result : store.boxes[props.id].title
      const resultEmoji = response.data.emoji !== '' ? response.data.emoji : store.boxes[props.id].emoji

      addBox({
        title: resultAnswer,
        emoji: resultEmoji,
        left: store.boxes[props.id].left,
        top: store.boxes[props.id].top
      })
      if(!resources.value.find((resource: { title: string; }) => resource.title === resultAnswer)){
        addResource({
          title: resultAnswer,
          emoji: resultEmoji
        })
      }
      removeBox(props.id);
    }
  },
}))

</script>
<template>
  <div :ref="drop"
       :class="twMerge(props.size === 'large' ? 'text-2xl space-x-2.5 py-2.5 px-4' : 'space-x-1.5 px-3 py-1','border-gray-200 bg-white shadow hover:bg-gray-100 cursor-pointer transition inline-block font-medium border rounded-lg ')">
          <span>
          {{ emoji }}
        </span>
      <span>
        {{ title }}
      </span>
  </div>

</template>

<style scoped>

</style>