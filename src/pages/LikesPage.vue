<script setup lang="ts">
    import { ref, onMounted } from 'vue';

    import ImageData from '../models/ImageData';

    import { getAllVotes } from '../services/votes-api';
    import { getCookie } from '../helpers/helpers';

    const userId = getCookie('userId');
    const userLikes = ref([]);
    const isLoading = ref(false);
    const hasError = ref(false);

    onMounted( async () => {
        isLoading.value = true;
        try {
            const response = await getAllVotes(userId);
            if (response.status !== 200) {
                hasError.value = true;
            } else {
                const data = await response.json();
                if (data && data.length) {
                    userLikes.value = data.filter((item: ImageData) => item.value === 1);
                }
            }
            isLoading.value = false;
        } catch (error) {
            console.warn('Error in API request:', error);
            hasError.value = true;
            isLoading.value = false;
        }
    });

</script>


<template>
    <div class="title-wrapper">
        <back-button></back-button>
        <span class="section-title">LIKES</span>
    </div>

    <div v-if="isLoading" class="loader-wrapper">
        <loading-spinner /> 
    </div>  

    <grid-layout v-if="userLikes.length !== 0 || hasError"
        :limit="60"
        :images="userLikes" 
        :error="hasError"
    ></grid-layout>
    
    <p v-if="!userLikes.length && !isLoading && !hasError" class="empty-text">No item found</p>
</template>
