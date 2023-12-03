<script setup lang="ts">
    import Logo from '../header/TheLogo.vue';
    import MainNavigation from '../navigation/MainNavigation.vue';
    import ContentSection from './ContentSection.vue';
    import SideBarVue from '../sidebar/SideBar.vue';
    import {useAllBreedsStore } from '../../stores/allBreeds.ts';
    import { getCookie } from '../../helpers/helpers';
    import { v4 as uuidv4 } from 'uuid';

    const storedUserId = getCookie('userId');

    if (!storedUserId) {
        const uniqueUserId = uuidv4();
        document.cookie = `userId=${uniqueUserId}`
    }

    const store = useAllBreedsStore();
    const { getAllBreeds } = store;

    if ( !store.allBreeds.length ) {
        getAllBreeds();
    }

</script>


<template>
    <SideBarVue/>
    <div class="layout-wrapper">
        <section class="navigation-section"> 
            <header class="header">
                <Logo/>
            </header>
            <MainNavigation/>
        </section>
        <ContentSection>
            <router-view></router-view>
        </ContentSection>
    </div>
</template>


<style lang="scss" scoped>
    .layout-wrapper {
        display: flex;
        position: relative;
        padding: 30px;
        justify-content: space-between;
    }

    .navigation-section {
        position: sticky;
        top: 30px;
        display: flex;
        flex-shrink: 1;
        flex-basis: 563px;
        margin-right: 65px;
        flex-direction: column;
        align-items: flex-end;
    }

    .header {
        max-width: 446px;
        width: 100%;
        align-self: flex-end;
    }

    @media (max-width: 1200px) {
        .layout-wrapper {
            justify-content: center;
            padding: 30px 0 0;
        }

        .navigation-section {
            display: none;
        }
    }

    @media (max-width: 368px) {
        .layout-wrapper {
            padding: 30px 0 0;
        }
    }

</style>