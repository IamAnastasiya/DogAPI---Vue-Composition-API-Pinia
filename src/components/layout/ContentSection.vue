<script setup lang="ts">
    import SectionHeader from '../header/SectionHeader.vue';
    import { useRoute } from 'vue-router';
    import { computed } from 'vue';
    import { useMobilemMenuStore } from '../../stores/mobileMenu';
    import {useAllBreedsStore } from '../../stores/allBreeds.ts';
    import { getCookie } from '../../helpers/helpers';
    import { v4 as uuidv4 } from 'uuid';
    const mobileMenuStore = useMobilemMenuStore();
    const breedsStore = useAllBreedsStore();
    const { getAllBreeds } = breedsStore;

    const route = useRoute();

    const isHomePage = computed(() => {
        return route.path === '/';
    })

    const storedUserId = getCookie('userId');

    if (!storedUserId) {
        const uniqueUserId = uuidv4();
        document.cookie = `userId=${uniqueUserId}`
    }

    if ( !breedsStore.allBreeds.length ) {
        getAllBreeds();
    }

    
</script>


<template>
    <section v-if="!isHomePage" class="section-wrapper" :class="mobileMenuStore.isOpen ? 'non-visible' : ''">
        <SectionHeader/>
        <div class="main-content">
            <slot></slot>
        </div>
    </section>
    <slot v-else></slot>
</template>


<style lang="scss" scoped>
    .section-wrapper {
        padding: 0 20px 20px;
        max-width: 680px;
        width: 100%;
        box-sizing: border-box;
        border-radius: 20px;
    }  

    .main-content {
        background-color: #fff;
        padding: 20px;
        border-radius: 20px;
    }

    @media (max-width: 1200px) {
        .non-visible {
        display: none;
    }

}

</style>