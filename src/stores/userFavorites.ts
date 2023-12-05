import { defineStore } from "pinia";
import { ref } from 'vue';
import { getAllFavorites, deleteFromApiFavorites, addToApiFavorites } from "../services/favorites-api";
import ImageData from "../models/ImageData";

export const useFavoritesStore = defineStore("userFavorites",  () => {
         
    const favorites = ref<ImageData[]>([]);
    const error = ref(false);

    const fetchUserFavorites = async(userId: string) => {
        try {
            const data = await getAllFavorites(userId);
            if (data.hasError) {
                throw new Error('failed to fetch favorites')
            } else {
                if (data && data.length) {
                    favorites.value = data.map((item: ImageData) => ({ ...item, isFav: true}));
                }
            }
        } catch {
            error.value = true;
        } 

    }

    const deleteFromFavorites = async(fav_id: number, image_id: string) => {
        await deleteFromApiFavorites(fav_id);
        favorites.value = favorites.value.filter((item) => item.image_id !== image_id);
    }

    const addToFavorites = async (id: string, userId: string) => {
        await addToApiFavorites({"image_id": id, "sub_id": userId});
    }

    return {favorites, error, fetchUserFavorites, deleteFromFavorites, addToFavorites}
});