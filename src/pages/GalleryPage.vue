<script setup lang="ts">
    import { ref, onMounted } from 'vue';

    import BackButton from '../components/buttons/BackButton.vue';
    import UploadButton from '../components/buttons/UploadButton.vue';
    import SelectList from '../components/select/SelectList.vue';
    import LoaderSpinner from '../components/loader/LoaderSpinner.vue';
    import GridLayout from '../components/layout/GridLayout.vue';
    import ModalContainer from '../components/modal/ModalContainer.vue';
    import ModalContent from '../components/modal/ModalContent.vue';

    import ApiImageData from '../models/ApiImageData';
    import ImageData from '../models/ImageData';

    import { ORDER_OPTIONS, TYPE_OPTIONS, GALERY_LIMITS } from '../constants/constants.ts';

    import { getSetOfImages } from '../services/breeds-api';
    import { getAllFavorites, addToApiFavorites, deleteFromApiFavorites } from '../services/favorites-api';
    import { getCookie } from '../helpers/helpers';

    import { useAllBreedsStore } from '../stores/allBreeds.ts';
    import { useModalStore } from '../stores/modal';
    const breedsStore = useAllBreedsStore();
    const modalStore = useModalStore();

    const userId = getCookie('userId');

    const isLoading = ref(true);
    const error = ref(false);
    const order = ref('RAND');
    const type = ref('gif,jpg,png');
    const chosenBreed = ref('');
    const limit = ref(5);
    const baseUrl = ref("images/search?&has_breeds=1&limit=5&order=RAND");
    let userFavorites = ref<{images: ImageData[]}>({images: []});

    const images = ref<ImageData[]>([]);

    const fetchFavorites = ( async () => {
        try {
            const data = await getAllFavorites(userId);
            if (data.hasError) {
                throw new Error('failed to fetch favorites')
            } else {
                if (data && data.length) {
                    userFavorites.value.images = data.map((item: ImageData) => ({ ...item, isFav: true}));
                }
            }
        } catch (er) {
            console.warn('Error in API request:', er);
            error.value = true;
        } 
    });

    const fetchImages = async (url: string) => {
        isLoading.value = true;
        try {
            const response = await getSetOfImages(url);
            if (!response.ok) {
                throw new Error( "Failed to fetch");
            } 

            const data = await response.json();
            const newImages = data.map((item: ApiImageData) => ({
                image: { url: item.url }, 
                image_id: item.id,
                isFav: userFavorites.value.images ? 
                    userFavorites.value.images.some((favorite: ImageData) => favorite.image_id === item.id) : false
            }));   
            images.value = newImages;

        } catch (er) {
            console.warn('Error in API request:', er);
            error.value = true;
        } finally {
            isLoading.value = false;
        }
    }


    onMounted( async () => {
        await fetchFavorites();
        await fetchImages(baseUrl.value);
    })

    const handleUpdateAction = async () => {
        images.value = [];
        error.value = false;
        const breed = (!chosenBreed.value || chosenBreed.value === 'None') ? '' : `&breed_ids=${chosenBreed.value}`;
        baseUrl.value = `images/search?&has_breeds=${!breed ? 0 : 1}&limit=${limit.value}&order=${order.value}&mime_types=${type.value}${breed}`;
        await fetchImages(baseUrl.value);
    }

    const updateFavoriteStatus = async (id: string) => {
        const favoriteImageIds = userFavorites.value.images.map(favorite => favorite.image_id);

        if (favoriteImageIds.includes(id)) {
            const favoriteItem = userFavorites.value.images.find((item) => item.image_id === id);

            if (!favoriteItem || !favoriteItem.id) return;

            try {
                const data = await deleteFromApiFavorites(favoriteItem.id);
                if (data.status !== 200) {
                    throw new Error('Failed to delete favorite');
                }
            } catch (err) {
                console.error('Error deleting favorite:', err);
            }
           
        } else {
            addToApiFavorites({"image_id": id, "sub_id": userId})
        }

        const updatedImages = images.value.map(image =>
            image.image_id === id ? { ...image, isFav: !image.isFav } : image
        );     

        images.value = updatedImages;    
    }



</script>


<template>
    <div class="title-wrapper">
        <div class="back-block">
            <BackButton></BackButton>
            <div class="section-title">GALLERY</div>
        </div>
        <UploadButton></UploadButton>
        <ModalContainer v-if="modalStore.isVisible"><ModalContent /> </ModalContainer>
    </div>

    <div class="filters-wrapper">
        <SelectList 
            :options="ORDER_OPTIONS" 
            :width="290"
            :initial="ORDER_OPTIONS[0]"
            name="ORDER" 
            bgColor="white" 
            :onSetValue="(value) => order = value"
        ></SelectList>
        <SelectList 
            :options="TYPE_OPTIONS" 
            :width="290" 
            :initial="TYPE_OPTIONS[0]"
            name="TYPE" 
            bgColor="white" 
            :onSetValue="(value) => type = value"
        ></SelectList>
        <SelectList 
            :options="breedsStore.allBreeds"
            defaultText="None"
            :width="290" 
            name="BREED" 
            bgColor="white"   
            :onSetValue="(value) => chosenBreed = value"
        ></SelectList>
        <div>
            <SelectList 
                :options="GALERY_LIMITS" 
                :width="240" 
                :initial="GALERY_LIMITS[0]"
                name="LIMIT" 
                bgColor="white" 
                :onSetValue="(value) => limit = +value"
            ></SelectList>
            <button class="action-button" @click="handleUpdateAction"></button>
        </div>

    </div>

    <div v-if="isLoading" class="loader-wrapper"><LoaderSpinner /></div>
    <div v-if=" !isLoading && !error && !images.length" class="empty-text">No item found</div>

    <GridLayout v-if="!isLoading && (images.length || error)"
        :limit="20" 
        :images="images"
        :error="error"
        coverMode="fav"
        @onFavoriteUpdate="updateFavoriteStatus"
    ></GridLayout>

</template>


<style lang="scss" scoped>

    .title-wrapper {
        display: flex;
        margin-bottom: 20px;
        justify-content: space-between;
    }
    .back-block {
        display: flex;
        gap: 10px;
    }

    .filters-wrapper {
        background-color: $background-grey;
        border-radius: 20px;
        padding: 10px 20px 20px;
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
        margin-bottom: 20px;
    }

    .filters-wrapper div {
        flex-basis: 45%;
        flex-grow: 1;
    }

    .filters-wrapper div:nth-child(4) {
        display: flex;
        gap: 10px;
    }

    .page-btns {
        margin: auto;
        display: flex;
        max-width: 400px;
        width: 100%;
        justify-content: space-between;
        padding-top: 20px;
    }

    .page-btns button {
        max-width: 100px;
        width: 100%;
        border: none;
        border-radius: 10px;
        padding: 10px 20px;
        @include size-color-weight-height(12px, $bright-colar, 500, 16px);
        background-color: $pale-coral;
        cursor: pointer;
    }

    .page-btns button:hover {
        background-color: $bright-colar;
        @include size-color-weight-height(12px, white, 500, 16px);
    }

    .page-btns .disabled, .page-btns .disabled:hover {
        background-color: $background-grey;
        cursor: default;
        @include size-color-weight-height(12px, $dark-grey, 500, 16px);
    }

    .action-button {
        @include button-40();
        background-color: #FFF;
        background-image: url('../assets/icons/action-colar.svg');
        align-self: flex-end;
    }

    .action-button:hover {
        background-color: $bright-colar;
        background-image: url('../assets/icons/action-white.svg');
    }


    @media (max-width: 600px) {

        .filters-wrapper div {
            max-width: 540px;
            flex-basis: 100%;
        }

        .filters-wrapper div:nth-child(4) {
            flex-direction: column;
        }

        .action-button {
            align-self: center;
            width: 100%;
            flex-shrink: 1;
            min-height: 36px;
        }
    }

    @media (max-width: 400px) {
        .action-button:hover {
            background-color: #FFF;
            background-image: url('/icons/action-colar.svg');
        }
}


</style>