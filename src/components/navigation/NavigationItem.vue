<script setup lang="ts">
    import { useRoute } from 'vue-router';
    import { computed } from 'vue';
    const route = useRoute();
    import { useMbilemMenuStore } from '../../stores/mobileMenu';
    const store = useMbilemMenuStore();

    const props = defineProps({
        image: String,
        href: String
    })

    const isActive = computed(() => {
       return route.path.includes(props.href!);
    })

    const handleMobileMenuClick = () => {
        store.toggleMenuVisibility();
    }

</script>


<template>
   <li class="list-item" @click="handleMobileMenuClick" >
        <router-link :to="`/${props.href}`" :class="`list-image ${props.href}`">
            <img :src="props.image" :alt="`go to ${props.href} page`" />
        </router-link>
        <router-link :to="`/${props.href}`">
            <button :class="`main-nav-btn ${isActive ? 'active' : ''}`">{{props.href!.toUpperCase()}}</button>
        </router-link>
    </li>
</template>

<style scoped lang="scss">
    .list-item {
        display: flex;
        flex-direction: column;
        row-gap: 10px;
    }

    .list-image {
        @include flex-centered;
        width: 138px;
        height: 190px;
        box-sizing: border-box;
        border-radius: 20px;
        border: 4px solid rgba(255, 255, 255, 0.60);
        &.voting {
            background-color: $soft-lilac;
        }
        &.breeds {
            background-color: $light-green;
        }
        &.gallery {
            background-color: $dark-yellow;
        }
    }

    .list-image:active {
        border: 4px solid $pale-coral; 
    }

    .main-nav-btn {
        @include size-color-weight-height(12px, $bright-colar, 500, 16px);
        text-align: center;
        padding: 10px 0;
        background-color: #FFF;
        letter-spacing: 2px;
        border-radius: 10px;
        width: 100%;
        border: 1px solid #fff;
        cursor: pointer;
    }

    .main-nav-btn:hover {
        background-color: $pale-coral;
        color: $bright-colar;
    }

    .main-nav-btn:active {
        background-color: $bright-colar;
        color: #FFFFFF;
    }

    .active {
        background-color: $bright-colar;
        color: #FFFFFF;
    }


    @media (max-width: 500px) {
        .list-image {
            display: none;
        }
    }
</style>
