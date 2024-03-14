import {ref} from 'vue'
import {defineStore} from 'pinia'
import {useLocalStorage} from "@vueuse/core";

export interface ResourceStoreEntry {
    title: string
    emoji: string
}

export const useResourcesStore = defineStore('resources', () => {
    const resources =
            useLocalStorage<ResourceStoreEntry[]>('opencraft/resources', [
                {title: 'Fire', emoji: '🔥'},
                {title: 'Water', emoji: '💧'},
                {title: 'Earth', emoji: '🌍'},
                {title: 'Air', emoji: '💨'},
            ]);
    function addResource(box: ResourceStoreEntry) {
        resources.value.push(box)
    }

    return { resources, addResource}
})
