<script setup lang="ts">
    import { useRoute } from 'vue-router';
    import { computed } from 'vue';
    const route = useRoute();

    const props = defineProps({
        mode: String,
        href: String as () => string | undefined, 
        icon: String as () => string | undefined, 
        onClick: Function
    });

    const currentPath = computed(() => {
       return route.path.slice(1);
    })

</script>


<template>
        <router-link 
            :to="props.href" 
            :class="[props.mode, props.icon, props.icon === currentPath ? 'active': '']">
        </router-link>
</template>


<style lang="scss" scoped>
    .header-btn {
        @include button-60();
        display: inline-block;
        background-color: #FFF;
    }

    .header-btn:hover {
        background-color: $pale-coral;
        color: $bright-colar;
    }

    .header-btn:active {
        background-color: $bright-colar;
        color: #FFFFFF;
    }

    .likes {
        background-image: url('../../assets/icons/likes-30-colar.svg');
    }

    .likes:active,
    .likes.active {
        background-image: url('../../assets/icons/likes-icon-white.svg');
    }



    .favorites {
        background-image: url('../../assets/icons/favorite-30-colar.svg');
    }

    .favorites:active,
    .favorites.active {
        background-image: url('../../assets/icons/favorite-icon-white.svg');
    }



    .dislikes {
        background-image: url('../../assets/icons/dislikes-30-colar.svg');
    }

    .dislikes:active,
    .dislikes.active {
        background-image: url('../../assets/icons/dislikes-icon-white.svg');
    }

    .active {
        background-color: $bright-colar;
        color: #FFFFFF;
    }
    
</style>