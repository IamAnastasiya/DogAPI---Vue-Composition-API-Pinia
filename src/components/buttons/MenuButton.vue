<script setup lang="ts">
    import { useMobilemMenuStore } from '../../stores/mobileMenu';
    const store = useMobilemMenuStore();
    const { toggleMenuVisibility } = store;

</script>


<template>
    <button class="menu" @click="toggleMenuVisibility"></button>
</template>


<style lang="scss" scoped>
    .menu {
        background-image: url('../../assets/icons/menu.svg');
        @include button-60();
        display: inline-block;
        background-color: #FFF;
    }

    .header-btn:hover {
        background-color: $pale-coral;
        color: $bright-colar;
    }
    
</style>