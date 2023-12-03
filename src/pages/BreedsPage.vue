<script setup lang="ts">
    import BackButton from '../components/buttons/BackButton.vue';
    import GridLayout from '../components/layout/GridLayout.vue';
    import SelectList from '../components/select/SelectList.vue';
    import LoaderSpinner from '../components/loader/LoaderSpinner.vue';

    import {useAllBreedsStore } from '../stores/allBreeds.ts';
    import { getSetOfImages } from '../services/breeds-api';
    import { BREEDS_DEFAULT, BREED_LIMITS } from '../constants/constants.ts';

    import ImageData from '../models/ImageData';
    import ApiImageData from '../models/ApiImageData';

    const store = useAllBreedsStore();
    // const { getAllBreeds } = store;

    import { ref, onMounted, watch } from 'vue';

    const fetchedData = ref<{images: ImageData[]}>({images: []});
    const isLoading = ref(false);
    const hasError = ref(false);
    const baseUrl = ref(`images/search?&has_breeds=1&limit=10&order=RAND`);

    const fetchImages = async (url: string) => {
        try {
            const response = await getSetOfImages(url);
            if (!response.ok) {
                throw new Error( "Failed to fetch");
            } 

            const data = await response.json();
            fetchedData.value.images = data
                .filter((item: ApiImageData) => item.breeds.length > 0)
                .map((item: ApiImageData) => ({
                    image: { url: item.url }, 
                    image_id: item.id, 
                    breeds: { name: item.breeds[0].name, breedId: item.breeds[0].id }
                }));

        } catch (error) {
            console.warn('Error in API request:', error);
            hasError.value = true;
        } finally {
            isLoading.value = false;
        }
    }

    onMounted(() => {
        isLoading.value = true;
        fetchImages(baseUrl.value);
    })

    watch(baseUrl, async (newBaseUrl) => {
        setLoadingState(); 
        fetchImages(newBaseUrl);
    });


    const setLoadingState = () => {
        fetchedData.value.images = [];
        hasError.value = false;
        isLoading.value = true;
    }


    const handleErrorCase = () => {
        setLoadingState(); 
        fetchImages(baseUrl.value);
    }

    const breedSelectHandler = (value: string) => {
        setLoadingState(); 
        const defaultValue = value === BREEDS_DEFAULT ? '' : `&breed_ids=${value}`;

        baseUrl.value.includes('breed_ids') ?
            baseUrl.value = baseUrl.value.replace(/&breed_ids=[^&]+/, defaultValue) :
            baseUrl.value = baseUrl.value.concat(`&breed_ids=${value}`);
    }

    
    const limitSelectHandler = (value: string) => {
        setLoadingState();
        baseUrl.value = baseUrl.value.replace(/limit=(\d+)/, `limit=${value}`);
    }

    const sortingHandler = (value: string) => {
        if (baseUrl.value.includes(value)) return;

        setLoadingState();
        baseUrl.value = baseUrl.value.replace(/&order=[^&]+/, `&order=${value}`);
    }

</script>


<template>
    <div class="title-wrapper">
        <BackButton></BackButton>
        <span class="section-title">BREEDS</span>
        <SelectList                         
            :options="store.allBreeds" 
            :defaultText="BREEDS_DEFAULT" 
            :width="226"
            bgColor="gray"
            :onSetValue="breedSelectHandler"
        ></SelectList>
        <div>
            <SelectList 
                :options="BREED_LIMITS" 
                :initial="BREED_LIMITS[1]"
                :width="101"
                bgColor="gray" 
                :onSetValue="limitSelectHandler"
            ></SelectList>
            <button class="filter-ZA" @click="() => sortingHandler('DESC')"></button>
            <button class="filter-AZ" @click="() => sortingHandler('ASC')"></button>
        </div>
    </div>

    <div v-if="isLoading" class="loader-wrapper"><LoaderSpinner /></div>

    <GridLayout v-if="!isLoading && (fetchedData.images.length || hasError)" 
        :images="fetchedData.images" 
        :limit="30"
        coverMode="breed" 
        :error="hasError"
        @onErrorHandling="handleErrorCase"
    ></GridLayout>
    
    <div v-if="!hasError && !fetchedData.images.length && !isLoading" class="empty-text">No item found</div>

</template>


<style scoped lang="scss">

    .title-wrapper div:nth-child(4) {
        display: flex;
        gap: 10px;
        max-width: 201px;
        width: 100%;
    }

    .image-wrapper {
        position: relative;
        margin-bottom: 52px;
    }

    .filter-ZA {
        @include button-40;
        background-image: url('../assets/icons/filterZA.svg');
        background-color: $background-grey;
        box-sizing: border-box;
        border: 2px solid $background-grey;
        flex-shrink: 0;
    }

    .filter-AZ {
        @include button-40;
        background-image: url('../assets/icons/filterAZ.svg');
        background-color: $background-grey;
        box-sizing: border-box;
        border: 2px solid $background-grey;
        flex-shrink: 0;
    }

    .filter-ZA:hover {
        background-image: url('../assets/icons/filterZA-colar.svg');
        border: 2px solid $pale-coral;
    }

    .filter-AZ:hover {
        background-image: url('../assets/icons/filterAZ-colar.svg');
        border: 2px solid $pale-coral;
    }

    @media (max-width: 1200px) {
        .image-wrapper img {
            width: 100%;
        }
    }

    @media (max-width: 700px) {
        .title-wrapper {
            flex-wrap: wrap;
            gap: 10px; 
        } 

        .title-wrapper div:nth-child(4)   {
            max-width: 600px;
        }
    }

</style>