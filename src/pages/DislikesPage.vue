<script setup lang="ts">
    import { ref, onMounted } from 'vue';

    import ImageData from '../models/ImageData';
    import BackButton from '../components/buttons/BackButton.vue';
    import GridLayout from '../components/layout/GridLayout.vue';
    import LoaderSpinner from '../components/loader/LoaderSpinner.vue';

    import { getAllVotes } from '../services/votes-api';
    import { getCookie } from '../helpers/helpers';

    const userId = getCookie('userId');
    const dislikes = ref([]);
    const isLoading = ref(false);
    const hasError = ref(false);


    onMounted (async () => {
        isLoading.value = true;
        try {
            const response = await getAllVotes(userId);
            if (response.status !== 200) {
                hasError.value = true;
            } else {
                const data = await response.json();
                if (data && data.length) {
                    dislikes.value = data.filter((item: ImageData) => item.value === -1);
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
        <span class="section-title">DISLIKES</span>
    </div> 

    <div v-if="isLoading" class="loader-wrapper">
        <LoaderSpinner ></LoaderSpinner>  
    </div>   

    <GridLayout v-if="dislikes.length !== 0 || hasError"
        :limit="60"
        :images="dislikes" 
        :error="hasError"
    ></GridLayout>

    <p v-if="!dislikes.length && !isLoading && !hasError" class="empty-text">No item found</p>
</template>

