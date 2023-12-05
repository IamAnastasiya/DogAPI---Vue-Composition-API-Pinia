import { defineStore } from "pinia";
import { ref } from 'vue';
import { getAllFavorites } from "../services/favorites-api";
import { getCookie } from "../helpers/helpers";
import ImageData from "../models/ImageData";

export const useFavoritesStore = defineStore("userFavorites",  () => {
         
    const favorites = ref<ImageData[]>([]);
    const error= ref(false);

    const getUserFavorites = async() => {
        const userId = getCookie('userId');
        try {
            const data = await getAllFavorites(userId);
            if (data.hasError) {
                throw new Error('failed to fetch favorites')
            } else {
                if (data && data.length) {
                    favorites.value = data.map((item: ImageData) => ({ ...item, isFav: true}));
                }
            }
        } catch (er) {
            console.warn('Error in API request:', er);
            error.value = true;
        } 

    }


    return {favorites, error, getUserFavorites}
});