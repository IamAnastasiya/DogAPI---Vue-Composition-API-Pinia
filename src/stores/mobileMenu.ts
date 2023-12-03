import { defineStore } from "pinia";

export const useMbilemMenuStore = defineStore("mobileMenu", {
    state: () => {
        return { isOpen: false }
    },
    actions: {
        toggleMenuVisibility () {
            this.isOpen = !this.isOpen;
        }
    }
});