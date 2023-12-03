<script setup lang="ts">
    import SectionHeader from '../header/SectionHeader.vue';
    import { useRoute } from 'vue-router';
    import { computed } from 'vue';

    const route = useRoute();

    const isHomePage = computed(() => {
        return route.path === '/';
    })
    
</script>


<template>
    <section v-if="!isHomePage" class="section-wrapper">
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
</style>