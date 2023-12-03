<script setup lang="ts">
    import { useRoute } from 'vue-router';
    import { computed } from 'vue';
    import BaseButton from '../buttons/BaseButton.vue';
    import SearchBar from '../search/SearchBar.vue';
    import MenuButton from '../buttons/MenuButton.vue';

    const route = useRoute();

    const isHomePage = computed(() => {
        return route.path === '/';
    })
    
</script>


<template>
<div v-if="!isHomePage" class='header-wrapper'>
        <div class="menu">
            <MenuButton/>
        </div>

        <div class='search-wrapper'>
            <SearchBar/>
        </div>


        <div class='btns-wrapper'>
            <BaseButton 
                href="/likes" 
                mode="header-btn" 
                icon="likes">
            </BaseButton>

            <BaseButton 
                href="/favorites" 
                mode="header-btn" 
                icon="favorites">
            </BaseButton>

            <BaseButton 
                href="/dislikes" 
                mode="header-btn" 
                icon="dislikes">
            </BaseButton>
        </div>
    </div>
</template>


<style lang="scss" scoped>
    .header-wrapper {
        display: flex;
        column-gap: 10px;
        margin-bottom: 10px;
    }

    .search-wrapper {
        display: flex;
        flex-basis: 470px;
    }

    .btns-wrapper {
        display: flex;
        column-gap: 10px;
    }

    .menu {
        display: none;
    }

        
    @media (max-width: 1200px) {
        .menu {
            display: block;
        }
    }

    @media (max-width: 768px) {
        .header-wrapper {
            flex-wrap: wrap;
            justify-content: space-between;
            row-gap: 10px;
        }

        .search-wrapper {
            order: 5;
            flex-basis: 640px;
            width: 100%;
        }
    }
    
</style>