<script setup lang="ts">
    import { capitalize } from '../../helpers/helpers';

    const props = defineProps({
        id: String,
        action: String,
        category: String,
        time: String,
    });

    const logActionText = ` was ${props.action === 'add' ? 'added to' : 'removed from'} ${capitalize(props.category!)}`;
    const iconPath = new URL(`../../assets/icons/${props.category}-20-icon.svg`, import.meta.url).href;

</script>


<template>
    <div class="log-wrapper">
        <span class="log-time">{{ props.time }}</span>
        <span class="log-name">Image ID: <span class="bold">{{ props.id }}</span>{{ logActionText }}</span>
        <img 
            v-if="action === 'add'"
            class="icon" 
            :src="iconPath"
            :alt="`${props.category} icon`" 
        />
    </div>
</template>


<style lang="scss" scoped>
    .log-wrapper {
        background-color: $background-grey;
        padding: 15px 20px 15px 15px;
        border-radius: 10px;
        margin-bottom: 10px;
        display: flex;
        align-items: center;
    }

    .log-time {
        align-self: center;
        padding: 3px 10px;
        background-color: #FFFFFF;
        margin-right: 20px;
        border-radius: 5px;
    }

    .log-name {
        color: $dark-grey;
        max-width: 640px; 
        width: 100%;
        margin-right: 10px;
        vertical-align: middle;
    }

    .bold {
        color: #1D1D1D;
        font-weight: 500;
    }

    .icon {
        align-self: center;
    }

    @media (max-width: 500px) {
        .log-wrapper {
            flex-wrap: wrap;
            justify-content: space-between;
            row-gap: 10px;
        }

        .log-name {
            order: 3;
        }

        .icon {
            align-self: right;
        }
    }

</style>