<script setup lang="ts">
    import ImageData from '../models/ImageData';
    import BackButton from '../components/buttons/BackButton.vue';
    import GridLayout from '../components/layout/GridLayout.vue';
    import LoaderSpinner from '../components/loader/LoaderSpinner.vue';

    import { getAllVotes } from '../services/votes-api';
    import { getCookie } from '../helpers/helpers';

    import { ref, onMounted } from 'vue';


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
        <BackButton></BackButton>
        <span class="section-title">LIKES</span>
    </div>

    <div v-if="isLoading" class="loader-wrapper">
        <LoaderSpinner ></LoaderSpinner>  
    </div>  

    <GridLayout v-if="userLikes.length !== 0 || hasError"
        :limit="60"
        :images="userLikes" 
        :error="hasError"
    ></GridLayout>
    
    <p v-if="!userLikes.length && !isLoading && !hasError" class="empty-text">No item found</p>
</template>
