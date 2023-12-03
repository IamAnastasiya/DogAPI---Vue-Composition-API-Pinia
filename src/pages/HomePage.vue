<script setup lang="ts">
    import MainNavigation from '../components/navigation/MainNavigation.vue';
    import Logo from '../components/header/TheLogo.vue';

</script>

<template>
    <section class="nav-container">
        <header>
            <Logo/>
        </header>
        <MainNavigation></MainNavigation>
    </section>
    <div class="image-container">
       <img src="../assets/images/girl-and-pet.png" 
            width="775"
            height="840"
            alt="girl with a cat" 
            class="home-image" />
    </div>
</template>

<style scoped lang="scss"> 

    .nav-container {
        display: none;
    }
    .image-container {
        position: relative;
        background-color: $pale-coral;
        border-radius: 20px;
        max-width: 680px;
        width: 100%;
        min-height: 840px;
        contain: layout;
    }

    .home-image {
        position: absolute;
        top: -30px;
        left: -65px;
    }

@media (max-width: 1200px) {

    .nav-container {
        display: block;
        flex-basis: 446px;
        margin: 0 auto;
        padding: 0 30px 0;
    }

    .image-container {
        display: none;
    }
}


@media (max-width: 368px) {
    .nav-container {
        max-width: 335px;
        width: 100%;
    }
}

</style>