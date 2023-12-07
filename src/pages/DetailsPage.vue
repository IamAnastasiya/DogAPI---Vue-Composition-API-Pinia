<script setup lang="ts">
    import { ref, reactive, onMounted, defineAsyncComponent } from 'vue';

    const ThePagination = defineAsyncComponent(() => import('../components/pagination/ThePagination.vue'))
    const BreedInfo = defineAsyncComponent(() => import('../components/breed-info/BreedInfo.vue'))

    import BreedData from '../models/BreedData';

    import {getImagesByBreed, getImageDetails } from '../services/breeds-api.ts';
    import { getIdFromImageUrl } from '../helpers/helpers.ts';

    const props = defineProps({ breedId: String})

    const isLoading = ref(false);
    const fetchedData = ref<{images: []}>({images: []});
    const imageNumber = ref<number>(0);
    const hasError = ref(false);
    let details = reactive<BreedData>({
        description: '',
        name: '',
        temperament: '',
        origin: '',
        weight: { metric: '' },
        life_span: ''
    });

    onMounted( async () => {
        isLoading.value = true;
        try {
            const imagesByBreed = await getImagesByBreed(props.breedId!);

            if (imagesByBreed.error) {
                hasError.value = true;
            }

            if (imagesByBreed.length !== 0) {
                const imagesArr = imagesByBreed.slice(0, 5).map((item: {url: string}) => item.url);
                fetchedData.value.images = imagesArr;

                const firstImage = getIdFromImageUrl(imagesArr[0]);
                const breedDetails = await getImageDetails(firstImage);

                details = {
                    id: breedDetails.breeds[0].id || '',
                    description: breedDetails.breeds[0].bred_for || '', 
                    name: breedDetails.breeds[0].name || '',
                    temperament: breedDetails.breeds[0].temperament  || '', 
                    origin: breedDetails.breeds[0].origin || '', 
                    weight: { metric: breedDetails.breeds[0].weight.metric  || '' },
                    life_span: breedDetails.breeds[0].life_span  || ''
                }
            }
        } catch {
            hasError.value = true;
        } finally {
            isLoading.value = false;
        }
    })

    const showNextImage = (index: number) => {
         imageNumber.value = index;
    };

</script>


<template>
     <div class="title-wrapper">
        <back-button></back-button>
        <span class="section-title">BREEDS</span>
        <div class="section-id">{{ details.id }}</div>
    </div>

    <div v-if="fetchedData.images.length" class="image-wrapper">
        <div v-if="isLoading" class="loader-wrapper"><loader-spinner/></div>
        <img 
            :src="fetchedData.images[imageNumber]" 
            alt="dog image" 
            class="image"
            :class="!isLoading ? 'visible' : ''"
        />
        <ThePagination :count="fetchedData.images.length" :active="imageNumber" @set-pagination="showNextImage"/>
    </div>

    <BreedInfo v-if="fetchedData.images.length" :info="details"></BreedInfo>

    <div v-if="!fetchedData.images.length && !isLoading && !hasError" >
        <p class="not-found">Breed with such an ID was not found.<br> 
            Please look for required on our <router-link to="/breeds">Breeds</router-link> Page.</p>
    </div>

    <div v-if="hasError" class="error-wrapper">
        <span class="error">Something went wrong, please try to reload</span>
    </div>
</template>



<style lang="scss" scoped>
    .section-id {
        background-color: $bright-colar;
        @include size-color-weight-height(20px, #FFF, 500, 30px);
        letter-spacing: 2px;
        border-radius: 10px;
        padding: 5px 30px;
    }

    .image-wrapper {
        display: flex;
        position: relative;
        margin-bottom: 50px;
        max-width: 640px;
        width: 100%;
        height: 360px; 
        justify-content: center;
        overflow: hidden;
        border-radius: 20px;
    }

    .image {
        object-fit: cover;
        display: none;
        height: 100%;
        border-radius: 20px;
    }

    .visible {
        display: block;
    }

    .image::after {
        content: "";
        position: absolute;
        top: 0;
        bottom: -140px;
        max-width: 90px;
        width: 50px;
        background-color: #FFF;
        height: 30px;
        z-index: 1;
    }

    .not-found {
        @include size-color-weight-height(18px, $dark-grey, 500, 25px);
        padding: 10px 0;
        text-align: center;
    }

    @media (max-width: 500px) {
        .section-title {
            padding: 5px 20px;
        }

        .section-id {
            padding: 5px 10px;
        }
    }


@media (max-width: 375px) {

    .title-wrapper {
        flex-shrink: 1;
    }
}

</style>