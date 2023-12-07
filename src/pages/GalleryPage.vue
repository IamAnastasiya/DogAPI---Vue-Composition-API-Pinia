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
    import { getCookie } from '../helpers/helpers';

    import { useAllBreedsStore } from '../stores/allBreeds.ts';
    import { useModalStore } from '../stores/modal';
    import { useFavoritesStore } from '../stores/userFavorites';
    const breedsStore = useAllBreedsStore();
    const modalStore = useModalStore();
    const favoritesStore = useFavoritesStore();

    const userId = getCookie('userId');

    const isLoading = ref(true);
    const error = ref(favoritesStore.error);
    const order = ref('RAND');
    const type = ref('gif,jpg,png');
    const chosenBreed = ref('');
    const limit = ref(5);
    const baseUrl = ref("images/search?&has_breeds=1&limit=5&order=RAND");
    const images = ref<ImageData[]>([]);


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
                isFav: favoritesStore.favorites ? 
                    favoritesStore.favorites.some((favorite: ImageData) => favorite.image_id === item.id) : false
            }));   
            images.value = newImages;

        } catch (er) {
            console.warn('Error in API request:', er);
            error.value = true;
        } finally {
            isLoading.value = false;
        }
    }


    onMounted(async () => {
        await favoritesStore.fetchUserFavorites(userId);
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
        const favoriteImageIds = favoritesStore.favorites.map(favorite => favorite.image_id);

        if (favoriteImageIds.includes(id)) {
            const favoriteItem = favoritesStore.favorites.find((item) => item.image_id === id);
            if (!favoriteItem || !favoriteItem.id) return;
            await favoritesStore.deleteFromFavorites(favoriteItem.id, id);
        } else {
            await favoritesStore.addToFavorites(id, userId);
        }

        await favoritesStore.fetchUserFavorites(userId);

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
            @set-value="(value) => order = value"
        ></SelectList>
        <SelectList 
            :options="TYPE_OPTIONS" 
            :width="290" 
            :initial="TYPE_OPTIONS[0]"
            name="TYPE" 
            bgColor="white" 
            @set-value="(value) => type = value"
        ></SelectList>
        <SelectList 
            :options="breedsStore.allBreeds"
            defaultText="None"
            :width="290" 
            name="BREED" 
            bgColor="white"   
            @set-value="(value) => chosenBreed = value"
        ></SelectList>
        <div>
            <SelectList 
                :options="GALERY_LIMITS" 
                :width="240" 
                :initial="GALERY_LIMITS[0]"
                name="LIMIT" 
                bgColor="white" 
                @set-value="(value) => limit = +value"
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
        @update-favorite="updateFavoriteStatus"
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