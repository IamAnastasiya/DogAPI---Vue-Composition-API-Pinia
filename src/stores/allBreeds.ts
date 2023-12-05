import { defineStore } from "pinia";
import { ref } from 'vue';
import { getAllBreeds } from "../services/breeds-api";

export const useAllBreedsStore = defineStore("allBreeds",  () => {
    const allBreeds = ref([]);
    const error = ref(false);

    const getBreeds = async() => {
        try {
            const breeds = await getAllBreeds();
            allBreeds.value = breeds.map((item: {name: string; id: string}) => ({ name: item.name, value: item.id }));
        } catch {
            error.value = true;
        }
    }

    return {allBreeds, error, getBreeds};
});
