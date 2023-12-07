import { createRouter, createWebHistory } from 'vue-router';
import { defineAsyncComponent } from 'vue';

import VotingPage from './pages/VotingPage.vue';
import HomePage from './pages/HomePage.vue';
import BreedsPage from './pages/BreedsPage.vue';
import GalleryPage from './pages/GalleryPage.vue';
const DetailsPage = defineAsyncComponent(() => import('./pages/DetailsPage.vue'));
const LikesPage = defineAsyncComponent(() => import('./pages/LikesPage.vue'));
const DislikesPage = defineAsyncComponent(() => import('./pages/DislikesPage.vue'));
const FavoritesPage = defineAsyncComponent(() => import('./pages/FavoritesPage.vue'));
const SearchPage = defineAsyncComponent(() => import('./pages/SearchPage.vue'));


const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', name: 'Home', component: HomePage },
        { path: '/voting', name: 'Voting', component: VotingPage },
        { path: '/breeds', name: 'Breeds', component: BreedsPage },
        { path: '/breeds/:breedId', name: 'Details', component: DetailsPage, props: true },
        { path: '/gallery', name: 'Gallery', component: GalleryPage },
        { path: '/likes', name: 'Likes', component: LikesPage },
        { path: '/dislikes', name: 'Dislikes', component: DislikesPage },
        { path: '/favorites', name: 'Favorites', component: FavoritesPage },
        { path: '/search', name: 'Search', component: SearchPage },
        { path: '/:notFound(.*)', redirect: '/' }
    ]
});


export default router;
