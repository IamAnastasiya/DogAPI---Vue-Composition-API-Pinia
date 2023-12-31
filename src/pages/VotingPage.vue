<script setup lang="ts">
    import { ref, reactive, onMounted, defineAsyncComponent } from 'vue';

    const ActionLog = defineAsyncComponent(() => import('../components/action-log/ActionLog.vue'));
    const VotingActions = defineAsyncComponent(() => import('../components/voting-actions/VotingActions.vue'));

    import VotingLogItem from '../models/VotingLogItem.ts';

    import { userLogsStore } from '../stores/userLogs.ts';
    import { useFavoritesStore } from '../stores/userFavorites';

    import { getRandomImage, sendImageVote } from '../services/votes-api';
    import { getCurrentTime, getCookie } from '../helpers/helpers';

    const logsStore = userLogsStore();
    const favoritesStore = useFavoritesStore();
    const { addToVotingLog } = logsStore;

    const currentPet = reactive({url: '', id: ''});
    const isLoading = ref(false);
    const hasError = ref(false);

    const userId = getCookie('userId');

    const getNewImage = async () => {
        isLoading.value = true;
        try {
            const response = await getRandomImage();
            if (!response.ok) {
                throw new Error('data was not fetched');
            } 
            const data = await response.json();
            currentPet.url = data[0].url;
            currentPet.id = data[0].id;
        } catch(error) {
            console.log(error);
            hasError.value = true;
        } finally {
            isLoading.value = false;
        }
    }

    onMounted(() => {
        getNewImage();
    })

    const showNext = (category: string) => {
        const newVotingLogItem: VotingLogItem = { 
            id: currentPet.id, 
            action: 'add', 
            category: category, 
            time: getCurrentTime()
        };
        getNewImage();
        addToVotingLog(newVotingLogItem);
        category === 'favorite' ? setAsFavorite() : sendVote(category);
    }


    const sendVote = (category: string) => {
        sendImageVote({
            "image_id": currentPet.id,
            "sub_id": userId || '',
            "value": category === 'likes' ? 1 : -1
        });
    }

    const setAsFavorite = () => {
        try {
            favoritesStore.addToFavorites(currentPet.id,  userId);
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }

    const handleErrorCase = () => {
        hasError.value = false;
        getNewImage();
    }

</script>


<template>
    <div v-if="hasError" class="error-wrapper">
        <span class="error">Something went wrong, please try again</span>
        <button class="reload-button" @click="handleErrorCase"></button>
    </div>

    <div v-else>
        <div class="title-wrapper">
            <back-button></back-button>
            <span class="section-title">VOTING</span>
        </div>
        <div class="image-wrapper">
            <img v-if="!isLoading && currentPet.url" :src="currentPet.url" alt="dog"/> 
            
            <loader-spinner v-if="isLoading"/>
            <VotingActions @select-category="showNext"></VotingActions>
        </div>

        <ActionLog v-for="(info, index) in logsStore.votingLog" 
            :key="index" 
            :id="info.id" 
            :action="info.action" 
            :category="info.category" 
            :time="info.time"
        ></ActionLog>
    </div>
</template>


<style lang="scss" scoped>

    .image-wrapper {
        position: relative;
        display: flex;
        justify-content: center;
        margin-bottom: 52px;
        max-width: 640px;
        width: 100%;
        height: 360px;
    }

    .image-wrapper img {
        border-radius: 20px;
        object-fit: cover;
        max-width: 100%;
        background-color: rgb(253, 246, 237);
    }


    @media (max-width: 500px) {
        .image-wrapper, .image-wrapper img {
            max-height: 200px;
        }
    }

</style>