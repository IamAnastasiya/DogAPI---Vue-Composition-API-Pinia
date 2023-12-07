<script setup lang="ts">
    import { useRoute } from 'vue-router';
    import GridLayout from '../components/layout/GridLayout.vue';
    import BackButton from '../components/buttons/BackButton.vue';
    import LoaderSpinner from '../components/loader/LoaderSpinner.vue';

    import ImageData from '../models/ImageData';

    import { getImagesByBreed } from '../services/breeds-api';
    import { getBreedId } from '../helpers/helpers';
    import {useAllBreedsStore } from '../stores/allBreeds.ts';

    const store = useAllBreedsStore();
    // const { allBreeds } = store;

    import { ref, onMounted, computed, watch } from 'vue';

    const fetchedData = ref<{images: ImageData[]}>({images: []});
    const isLoading = ref(false);

    const route = useRoute();
    let searchInput = computed(() => route.query.breed as string);

    const fetchImages = async () => {
        isLoading.value = true;
        fetchedData.value.images = [];

        try {
            const userInput = searchInput.value;
            const breed = getBreedId(store.allBreeds, userInput);

            await handleSearch(breed);
        } catch (error) {
            console.error(error);
        } finally {
            isLoading.value = false;;
        }

    }

    onMounted(async () => {
        // if ( !allBreeds.length ) {
        //     await getBreeds();
        // }
        fetchImages();
    })

    
    watch(searchInput,  () => {
        fetchImages();
    });

    const handleSearch = async(breed: {name: string, value: string}) => {
        if (breed.value  === '') {
            isLoading.value = false;
            return;
        }

        const data = await getImagesByBreed(breed.value);
        const newImage = [{
            image: { url: data[0].url }, 
            image_id: data[0].id,
            breeds: { name: breed.name, breedId: breed.value} 
        }]
        fetchedData.value.images = newImage;
        isLoading.value = false;
    }

</script>


<template>
    <div class="title-wrapper">
        <BackButton></BackButton>
        <span class="section-title">SEARCH</span>
    </div>

    <p class="result-text">Search results for: &apos;<span class="input">{{searchInput}}</span> &apos;</p>              
    <div v-if="isLoading" class="loader-wrapper"><LoaderSpinner /></div>

    <GridLayout v-if="!isLoading && fetchedData.images.length !== 0" 
        :limit="1" 
        :images="fetchedData.images" 
        coverMode="breed"
    ></GridLayout>

    <div v-if="!isLoading && !fetchedData.images.length" class="empty-text">No item found</div>  
</template>


<style lang="scss" scoped>

    .result-text {
        @include size-color-weight-height(16px, $dark-grey, 400, 24px);
        margin: 0 5px 20px;
    }

    .input {
        @include size-color-weight-height(18px, black, 500, 26px);
    }

</style>