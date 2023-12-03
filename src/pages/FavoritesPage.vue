<script setup lang="ts">
    import ImageData from '../models/ImageData';
    import BackButton from '../components/buttons/BackButton.vue';
    import GridLayout from '../components/layout/GridLayout.vue';
    import LoaderSpinner from '../components/loader/LoaderSpinner.vue';
    import ActionLog from '../components/action-log/ActionLog.vue';

    import { getAllFavorites, deleteFromApiFavorites } from '../services/favorites-api';
    import { getCookie, getCurrentTime } from '../helpers/helpers';

    import { userLogsStore } from '../stores/userLogs.ts';
    const logStore = userLogsStore();
    const { addToFavoritesLog } = logStore;

    import { ref, onMounted } from 'vue';

    const userId = getCookie('userId');
    let userFavorites = ref<{images: ImageData[]}>({images: []});
    const isLoading = ref(false);
    const hasError = ref(false);

    onMounted( async () => {
        isLoading.value = true;
        try {
            const data = await getAllFavorites(userId);
            if (data.hasError) {
                throw new Error('failed to fetch favorites')
            } else {
                if (data && data.length) {
                    userFavorites.value.images = data.map((item: ImageData) => ({ ...item, isFav: true}));
                }
            }
        } catch (error) {
            console.warn('Error in API request:', error);
            hasError.value = true;
        } finally {
            isLoading.value = false;
        }
    });

    const deleteFromFav = async (id: string) => {

        const favoriteItem = userFavorites.value.images.find((item) => item.image_id === id);
        if (!favoriteItem || !favoriteItem.id) return;

        deleteFromApiFavorites(favoriteItem.id).then(data => { 
            if (data.status == 200) {
                userFavorites.value.images = userFavorites.value.images.filter(item => item.image_id !== id);
            } else {
                console.error('Failed to delete favorite');  
            }
        });  
        
        addToFavoritesLog({id: id, action: 'remove', category: 'favorites', time: getCurrentTime()});
    }

</script>


<template>
    <div class="title-wrapper">
        <BackButton></BackButton>
        <span class="section-title">FAVORITES</span>
    </div>

    <div v-if="isLoading" class="loader-wrapper">
        <LoaderSpinner ></LoaderSpinner>  
    </div>  

    <div v-if="userFavorites.images.length !== 0 || hasError" class="grid-wrapper">
        <GridLayout 
            :limit="30"
            coverMode="fav"
            :images="userFavorites.images"
            @onFavoriteUpdate="deleteFromFav"
            :error="hasError"
        ></GridLayout>
    </div>

    <p v-if="!userFavorites.images.length && !isLoading && !hasError" class="empty-text">No item found</p>

    <ActionLog v-for="(info, index) in logStore.favoritesLog" 
            :key="index" 
            :id="info.id" 
            :action="info.action" 
            :category="info.category" 
            :time="info.time"
    ></ActionLog>

</template>


<style lang="scss" scoped>

    .grid-wrapper {
        margin-bottom: 40px;
    }

</style>