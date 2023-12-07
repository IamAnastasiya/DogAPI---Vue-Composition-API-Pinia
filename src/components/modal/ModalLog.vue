<script setup lang="ts">

    const emit = defineEmits(['errorHandling']);
    const props = defineProps({ result: String});

</script>


<template>
    <p v-if="props.result === 'success'" 
        class="success-text">Thanks for the Upload - Dog found!
    </p>
    <p v-if="props.result === 'error'" @click="$emit('errorHandling')"
        class="error-text">No dog found - try a different one
    </p>
    <p v-if="props.result === 'wrong-format'" @click="$emit('errorHandling')"
        class="error-text">Only .jpg or .png files are accepted 
    </p>
</template>


<style lang="scss" scoped>
    .success-text, .error-text {
        background-color: #FFF;
        @include size-color-weight-height(18px, $dark-grey, 400, 20px);
        margin: 0;
        padding: 15px 0;
        border-radius: 10px;
        width: 100%;
        animation: slide-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
        display: flex;
        align-items: center;
    }

    .success-text::before {
        content: url('../../assets/icons/round-check-green.svg');
        margin-right: 7px;
        margin-left: 15px;
    }

    .error-text::before {
        content: url('../../assets/icons/error-20.svg');
        margin-right: 10px;
        margin-left: 15px;
    }

    .error-text::after {
        content: url('../../assets/icons/action-colar.svg');
        margin-left: 10px;
    }

    @keyframes slide-left {
        0% {
            transform: translateX(100px);
        }
        100% {
            transform: translateX(0);
        }
    }

    
    @media (max-width: 400px) {
        .success-text, .error-text {
            font-size: 16px;
        }

    }

</style>