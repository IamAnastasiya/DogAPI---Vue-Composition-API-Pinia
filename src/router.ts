import { createRouter, createWebHistory } from 'vue-router';

import VotingPage from './pages/VotingPage.vue';
import HomePage from './pages/HomePage.vue';
import BreedsPage from './pages/BreedsPage.vue';
import DetailsPage from './pages/DetailsPage.vue';
import GalleryPage from './pages/GalleryPage.vue';
import LikesPage from './pages/LikesPage.vue';
import DislikesPage from './pages/DislikesPage.vue';
import FavoritesPage from './pages/FavoritesPage.vue';
import SearchPage from './pages/SearchPage.vue';


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
