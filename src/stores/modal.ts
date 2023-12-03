import { defineStore } from "pinia";

export const useModalStore = defineStore("modal", {
    state: () => {
        return { isVisible: false }
    },
    actions: {
        toggleVisibility() {
            this.isVisible = !this.isVisible;
        }
    }
});