<script setup lang="ts">
    import { ref, onMounted, defineAsyncComponent } from 'vue';

    const ActionLog = defineAsyncComponent(() => import('../components/action-log/ActionLog.vue'))

    import { getCookie, getCurrentTime } from '../helpers/helpers';

    import { userLogsStore } from '../stores/userLogs.ts';
    import { useFavoritesStore } from '../stores/userFavorites';
    const logStore = userLogsStore();
    const favoritesStore = useFavoritesStore();
    const { addToFavoritesLog } = logStore;

    const userId = getCookie('userId');
    const isLoading = ref(false);


    onMounted( async () => {
        isLoading.value = true;
        await favoritesStore.fetchUserFavorites(userId);
        isLoading.value = false;
    });

    const deleteImage = async (id: string) => {
        const favoriteItem = favoritesStore.favorites.find((item) => item.image_id === id);
        if (!favoriteItem || !favoriteItem.id) return;

        favoritesStore.deleteFromFavorites(favoriteItem.id, id);        
        addToFavoritesLog({id: id, action: 'remove', category: 'favorites', time: getCurrentTime()});
    }

    const handleErrorCase = async () => {
        await favoritesStore.fetchUserFavorites(userId);
    }

</script>


<template>
    <div class="title-wrapper">
        <back-button></back-button>
        <span class="section-title">FAVORITES</span>
    </div>

    <div v-if="isLoading" class="loader-wrapper">
        <loading-spinner />
    </div>  

    <div v-if="!isLoading && favoritesStore.favorites.length !== 0 || favoritesStore.error" class="grid-wrapper">
        <grid-layout 
            :limit="30"
            coverMode="fav"
            :images="favoritesStore.favorites"
            @update-favorite="deleteImage"
            @error-handling="handleErrorCase"
            :error="favoritesStore.error"
        ></grid-layout>
    </div>

    <p v-if="!favoritesStore.favorites.length && !isLoading && !favoritesStore.error" class="empty-text">No item found</p>

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