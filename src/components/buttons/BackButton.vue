<script setup lang="ts">
    import { useRouter } from 'vue-router';
    const router = useRouter();

    const handleGoBack = () => {
        router.back();
    }
</script>


<template>
    <button class="back-btn" type="button" @click="handleGoBack"></button>
</template>


<style lang="scss" scoped>
   .back-btn {
        background-color: $pale-coral;
        @include button-40;
        background-image: url('../../assets/icons/back-icon.svg');
    }

    .back-btn:hover {
        background-color: $bright-colar;
        background-image: url('../../assets/icons/back-icon-white.svg');
    }
    
</style>