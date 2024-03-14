import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import {reactive} from "vue";

export interface BoxStoreEntry {
    top: number
    left: number
    title: string
    emoji: string
    loading?: boolean
}

export const useBoxesStore = defineStore('counter', () => {
  const boxes = reactive<{
    [key: string]: BoxStoreEntry
  }>({
    a: {top: 20, left: 80, title: 'Fire', emoji: '🔥'},
  })

  function addBox(box: BoxStoreEntry) {
    const randomId = Math.random().toString(36).substr(2, 5)
    boxes[randomId] = box
  }

  function removeBox(id: string) {
    delete boxes[id]
  }

  return { boxes , removeBox, addBox}
})
