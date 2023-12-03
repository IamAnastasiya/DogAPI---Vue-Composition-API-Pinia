<script setup lang="ts">
    import { useRouter } from 'vue-router';
    import { ref } from 'vue';
    const router = useRouter();
    const searchInput = ref('');

    const handleSearchInput = async () => {
        await router.push(`/search?breed=${searchInput.value}`);
        searchInput.value = "";
    }

</script>


<template>
    <form class="search" @submit.prevent="handleSearchInput">
            <input class="search-input"
                type="text"
                placeholder="Search for breeds by name"
                v-model="searchInput"
            />
        <button class="search-btn"></button>
    </form>
</template>


<style lang="scss" scoped>

    .search {
        border-radius: 20px;
        height: 60px;
        box-sizing: border-box;
        border: 2px solid #FFF;
        background: #FFF;
        display: flex;
        width: 100%;
        justify-content: space-between;
        padding: 10px 10px 10px 20px;
    }

    .search:hover {
        border: 2px solid $pale-coral;
    }

    .search:active {
        border: 2px solid $bright-colar;
    }

    .search-input {
        border: none;
        padding: 0;
        max-width: 380px;
        width: 100%;
        @include size-color-weight-height(20px,  $dark-grey, 400, 30px);
    }

    .search-input:focus {
        outline: none;
    }

    .search-input::placeholder {
        @include size-color-weight-height(18px,  $dark-grey, 400, 30px);
    }

    .search-btn {
        background-color: $pale-coral;
        @include button-40();    
        background-image: url('../../assets/icons/search.svg');
    }

    .search-btn:hover {
        background-color: $bright-colar;
        background-image: url('../../assets/icons/search-white.svg');
    }

    @media (max-width: 768px) {
        .search {
            padding: 10px;
        }
    }

    @media (max-width: 378px) {
        .search-input::placeholder {
            @include size-color-weight-height(14px,  $dark-grey, 400, 22px);
        }
    }

</style>