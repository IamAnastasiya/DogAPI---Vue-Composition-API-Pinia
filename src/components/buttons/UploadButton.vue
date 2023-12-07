<script setup lang="ts">
    import { useModalStore } from '../../stores/modal.ts';
    const modalStore = useModalStore();

</script>


<template>
    <button class="upload" type="button" @click="modalStore.toggleVisibility">UPLOAD</button>
</template>


<style lang="scss" scoped>
    .upload {
        @include size-color-weight-height(12px, $bright-colar, 500, 16px);
        border: none;
        text-align: right;
        background-color: $pale-coral;
        max-width: 143px;
        width: 100%;
        padding: 12px 30px;
        letter-spacing: 2px;
        border-radius: 10px;
        gap: 10px;
        position: relative;
        cursor: pointer;
    }

    .upload::before {
        content: url('../../assets/icons/upload-16.svg');
        position: absolute;
        top: 30%;
        left: 20%;
    }

    .upload:hover {
        background-color: $bright-colar;
        color: #FFF;
    }

    .upload:hover::before {
        content: url('../../assets/icons/upload-white-16.svg');
    }


    @media (max-width: 500px) {
        .upload {
            max-width: 380px;
            width: 100%;
            padding-left: 45%;
            text-align: start;
        }

        .upload::before {
            left: 35%;
        }
    }
</style>