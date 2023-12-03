<script setup lang="ts">
    import NavigationItem from '../navigation/NavigationItem.vue';
    import { useMbilemMenuStore } from '../../stores/mobileMenu';
    const store = useMbilemMenuStore();
    const { toggleMenuVisibility } = store;
    const votingIconPath = new URL(`../../assets/images/vote-table.png`, import.meta.url).href;
    const breedsIconPath = new URL(`../../assets/images/pet-breeds.png`, import.meta.url).href;
    const galleryIconPath = new URL(`../../assets/images/images-search.png`, import.meta.url).href;

</script>


<template>
    <div v-if="store.isOpen" class="mobile-menu">
        <button class="cross" @click="toggleMenuVisibility"></button>
        <ul class="nav-list">
            <NavigationItem href="voting" :image="votingIconPath" />
            <NavigationItem href="breeds" :image="breedsIconPath" />
            <NavigationItem href="gallery" :image="galleryIconPath" />
        </ul>
    </div>
</template>


<style lang="scss" scoped>
    .mobile-menu {
        display: none;
        flex-direction: column;
        box-sizing: border-box;
        width: 100%;
        height: 90vh;
        position: absolute;
        z-index: 10;
        top: 10px;
        left: 50%;
        transform: translateX(-50%);
        background-color: $background-grey;
    }

    .cross {
        align-self: flex-end;
        margin-right: 0;
        @include button-40;
        background-color: #FFF;
        background-image: url('../../assets/icons/cross-colar-20.svg');
        margin-bottom: 120px;
    }

    .cross:hover {
        background-color: $bright-colar;
        background-image: url('../../assets/icons/cross-white-20.svg');
    }

    .nav-list {
        align-self: center;
        display: flex;
        column-gap: 16px;
        list-style: none;
        padding: 0;
    }


    @media (max-width: 1200px) {
        .mobile-menu {
            display: flex;
        }
    }

    @media (max-width: 500px) {
        .mobile-menu {
            padding-right: 5px;
        }

        .nav-list  {
            flex-direction: column;
            box-sizing: border-box;
            row-gap: 20px;
            padding: 15px;
            width: 100%;
        }
    }

    
    @media (max-width: 375px) {
        .mobile-menu {
            padding-right: 10px;
        }
    }

</style>