import { defineStore } from "pinia";
import { getAllBreeds } from "../services/breeds-api";

export const useAllBreedsStore = defineStore("allBreeds", {
    state: () => {
        return { 
            allBreeds: [],
            error: null 
        }
    },
    actions: {
        async getAllBreeds () {
            try {
                const breeds = await getAllBreeds();
                this.allBreeds = breeds.map((item: {name: string; id: string}) => ({ name: item.name, value: item.id }));
            } catch (error) {
                return error;
            }
        }
    }
});