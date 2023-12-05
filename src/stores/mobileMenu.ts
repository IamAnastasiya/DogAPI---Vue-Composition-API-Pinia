import { defineStore } from "pinia";

export const useMobilemMenuStore = defineStore("mobileMenu", {
    state: () => {
        return { isOpen: false }
    },
    actions: {
        toggleMenuVisibility () {
            this.isOpen = !this.isOpen;
        }
    }
});