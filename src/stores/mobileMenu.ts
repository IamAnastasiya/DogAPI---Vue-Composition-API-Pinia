import { defineStore } from "pinia";
import { ref } from 'vue';

export const useMobilemMenuStore = defineStore("mobileMenu", () => {
    const isOpen = ref(false);

    const toggleMenuVisibility = () => {
        isOpen.value = !isOpen.value
    }

    return {isOpen, toggleMenuVisibility}
});
