<script setup lang="ts">
    enum ButtonType {
        Like = 'likes',
        Favorite = 'favorite',
        Dislike = 'dislikes',
    }

    const props = defineProps(['onClick']);

    const handleClick = (buttonType: ButtonType) => {
        props.onClick(buttonType);
    };
</script>


<template>
    <div class="actions-wrapper">
        <button class="like" @click="() => handleClick(ButtonType.Like)"></button>
        <button class="favorite" @click="() => handleClick(ButtonType.Favorite)"></button>
        <button class="dislike" @click="() => handleClick(ButtonType.Dislike)"></button>
    </div>
</template>


<style lang="scss" scoped>
    .actions-wrapper {
        max-width: 244px;
        width: 100%;
        margin: auto;
        background-color: #FFF;
        border-radius: 20px;
        position: absolute;
        bottom: -40px;
        left: 50%;
        transform: translateX(-50%);
        border: 2px solid #FFF;
        box-sizing: border-box;
    }

    .like {
        background-color: $light-green;
        background-image: url('../../assets/icons/likes-icon-white.svg');
        @include action-icon-80;
        border-top-left-radius: 20px;
        border-bottom-left-radius: 20px;
    }

    .favorite {
        background-color: $bright-colar;
        background-image: url('../../assets/icons/favorite-icon-white.svg');
        @include action-icon-80;
    }

    .dislike {
        background-color: $dark-yellow;
        background-image: url('../../assets/icons/dislikes-icon-white.svg');
        @include action-icon-80;
        border-top-right-radius: 20px;
        border-bottom-right-radius: 20px;
    }

    .like:hover {
        background-color: rgba(151, 234, 185, 0.3);
        background-image: url('../../assets/icons/likes-icon-green.svg');
    }

    .favorite:hover {
        background-color: rgba(255, 134, 142, 0.3);
        background-image: url('../../assets/icons/favorite-30-colar.svg');
    }

    .dislike:hover {
        background-color: rgba(255, 210, 128, 0.3);
        background-image: url('../../assets/icons/dislikes-icon-yellow.svg');
    }

    .like:active {
        background-color: $light-green;
        background-image: url('../../assets/icons/likes-icon-white.svg');
    }

    .favorite:active {
        background-color: $bright-colar;
        background-image: url('../../assets/icons/favorite-white-full.svg');
    }


    .dislike:active {
        background-color: $dark-yellow;
        background-image: url('../../assets/icons/dislikes-icon-white.svg');
    }

    @media (max-width: 640px) {
        .actions-wrapper {
            max-width: 182px;
            border: 1px solid #FFF;
        }

        .actions-wrapper button {
            width: 60px;
            height: 60px;
        }
    }

</style>