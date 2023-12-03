<script setup lang="ts">
    import NavigationItem from './NavigationItem.vue';
    const votingIconPath = new URL(`../../assets/images/vote-table.png`, import.meta.url).href;
    const breedsIconPath = new URL(`../../assets/images/pet-breeds.png`, import.meta.url).href;
    const galleryIconPath = new URL(`../../assets/images/images-search.png`, import.meta.url).href;

</script>

<template>
    <div class="wrapper">
        <h1 class="main-title">Hi!👋</h1>
        <p class="sub-title"> Welcome to my Pet Project 2023 / Vue.js</p>
        <p class="nav-text">Lets start using The Dog API</p>

        <ul class="nav-list">
            <NavigationItem href="voting" :image="votingIconPath" />
            <NavigationItem href="breeds" :image="breedsIconPath" />
            <NavigationItem href="gallery" :image="galleryIconPath" />
        </ul>
    </div>
</template>

<style scoped lang="scss">
    .wrapper {
        max-width: 446px;
        width: 100%;
    }   

    .main-title {
        @include size-color-weight-height(44px, #1d1d1d, 500, 58px);
        margin: 0 0 10px;
    }

    .sub-title {
        @include size-color-weight-height(20px, $dark-grey, 400, 28px);
        margin: 0 0 60px;
    }

    .nav-text {
        @include size-color-weight-height(26px, #1d1d1d, 500, 28px);
        margin: 0 0 24px;
        opacity: 0.8;
    }

    .nav-list {
        display: flex;
        column-gap: 16px;
        list-style: none;
        padding: 0;
    }

    @media (max-width: 500px) {
        .nav-list  {
            flex-direction: column;
            row-gap: 20px;
        }
    }
</style>
