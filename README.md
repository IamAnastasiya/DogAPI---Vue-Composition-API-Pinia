# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support For `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.
   
## Project Description
This is a pet project cteated with Vue.js (Composition API) + Pinia and using theDogAPI as backend; related docs - https://developers.thedogapi.com/ 

With this project You can:
vote for cats images on Voting page (https://dog-api-vue-composition-api-pinia.vercel.app/voting)
see all breeds/filtered breeds on Breeds page (https://dog-api-vue-composition-api-pinia.vercel.app/breeds)
detailed information about a breed on breed details page (e.g https://dog-api-vue-composition-api-pinia.vercel.app/breeds/4)
see cats images in gallery, possible to set filters + add to favorites (https://dog-api-vue-composition-api-pinia.vercel.app/gallery)
possible also to upload Your own cat image on Gallery page with 'Upload' button
see images, that were previously voted for on likes/dislikes/favorites pages (like: https://dog-api-vue-composition-api-pinia.vercel.app/likes)
search for breed  (https://dog-api-vue-composition-api-pinia.vercel.app/search?breed=husk)

## Deploy on Vercel
You can visit the page on: https://dog-api-vue-composition-api-pinia.vercel.app/ 
