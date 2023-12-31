<script setup lang="ts">
    import { computed } from 'vue';

    import ImageData from '../../models/ImageData';
    import GridItem from './GridItem.vue';
    const emit = defineEmits(['updateFavorite', 'errorHandling']);

    interface Props {
        images: ImageData[];
        limit?: number;
        coverMode?: 'breed' | 'fav';
        error?: boolean;
    }
    const props = defineProps<Props>(); 

    const limitedImages = computed(() => props.images ? props.images!.slice(0, props.limit) : []);

</script>


<template>
    <div v-if="props.error" class="error-wrapper">
        <span class="error">Something went wrong, please try again</span>
        <button class="reload-button" @click="$emit('errorHandling')"></button>
    </div>

   <ul class="grid-layout">
        <li v-for="(image, index) in limitedImages" :key="image.image_id" class="grid-item">

            <router-link v-if="props.coverMode === 'breed'" :to="'/breeds/' + image.breeds!.breedId" class="grid-link">
                <GridItem 
                    :index="index"
                    :coverMode="props.coverMode" 
                    :item="image"
                />
            </router-link>
            <GridItem v-else
                :index="index"
                :coverMode="props.coverMode || ''" 
                :item="image"
                @update-favorite="$emit('updateFavorite', image.image_id)"
            />
        </li>
    </ul>
    
</template>


<style lang="scss" scoped>
    .grid-layout {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;
        padding: 0;
        margin-bottom: 10px;
    }

    .grid-item {
        height: 140px;
        position: relative;
        overflow: hidden;
        border-radius: 20px;
        background-color: rgb(253, 246, 237);
    }

    .grid-link {
        display: block;
        position: relative;
        height: 100%;
    }

    .grid-item:nth-child(10n + 1) {
        grid-row: span 2;
        height: 300px;
    }

    .grid-item:nth-child(10n + 4) {
        grid-column: span 2;
        grid-row: span 2;
        height: 300px;
    }

    .grid-item:nth-child(10n + 8) {
        grid-row: span 2;
        height: 300px;
    }

    .grid-item:nth-child(10n + 9)  {
        grid-column: span 2;
        grid-row: span 2;
        height: 300px;
    }


    @media (max-width: 630px) {
        .grid-layout {
            grid-template-columns: 1fr;
        }

        .grid-item {
            height: 300px;
        }

        .grid-item:nth-child(10n + 1),
        .grid-item:nth-child(10n + 4),
        .grid-item:nth-child(10n + 8),
        .grid-item:nth-child(10n + 9) {
            grid-column: auto;
            grid-row:  auto;
            height: 300px;
        }
    }

</style>