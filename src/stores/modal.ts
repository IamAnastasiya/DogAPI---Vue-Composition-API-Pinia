import { defineStore } from "pinia";
import { ref } from 'vue';

export const useModalStore = defineStore("modal",  () => {
    const isVisible = ref(false);

    const toggleVisibility = () => {
        isVisible.value = !isVisible.value
    }

    return {isVisible, toggleVisibility}
});
