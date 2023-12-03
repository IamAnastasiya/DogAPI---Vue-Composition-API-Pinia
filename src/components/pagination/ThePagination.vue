<script setup lang="ts">
    import { computed } from 'vue';

    const props = defineProps({
        count: Number,
        active: Number,
        setPagination: Function
    })

    const paginationDots = computed(() => {
        const dots: number[] = [];
        for (let i = 1; i <= props.count!; i++) {
            dots.push(i);
        }
        return dots;
    });


</script>


<template>
    <ul class="pagination">
        <li v-for="(dot, index) in paginationDots" 
            :key="String(dot)" 
            :class="['pagination-dot', index === props.active ? 'active' : '']" 
            @click="props.setPagination!(index)">
        </li>
    </ul>
</template>


<style lang="scss" scoped>
    .pagination {
        background-color: #FFF;
        list-style: none;
        padding: 0;
        margin: 0;
        max-width: 90px;
        width: 100%;
        min-height: 30px;
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
        position: absolute;
        bottom: -10px;
        left: 50%;
        transform: translateX(-50%);
        @include flex-centered;
        gap: 5px;
    }

    .pagination-dot {
        height: 10px;
        width: 10px;
        border-radius: 50%;
        background-color: $pale-coral;
        cursor: pointer;
    }

    .pagination-dot:hover,
    .active {
        background-color: $bright-colar;
    }

</style>