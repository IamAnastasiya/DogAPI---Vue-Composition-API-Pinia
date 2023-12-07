<script setup lang="ts">
    import { ref } from 'vue';
    
    import ModalLog from '../modal/ModalLog.vue';
    import LoaderSpinner from '../loader/LoaderSpinner.vue';
    import { useModalStore } from '../../stores/modal.ts';

    import { sendNewImage } from '../../services/gallery-api';
    import { getCookie } from '../../helpers/helpers';


    const modalStore = useModalStore();
    const { toggleVisibility } = modalStore;

    const userId = getCookie('userId');

    const uploadStatus = ref('new');
    const file = ref<File | null>(null);
    const imageSrc = ref('');
    const fileName = ref('');
    const isLoading = ref(false);
    


     const onFileSelect = (event: Event) => {
        const inputElement = event.target as HTMLInputElement;
        const selectedFile = inputElement.files && inputElement.files[0];
        
        if (!selectedFile) return;

        if (selectedFile.type && selectedFile.type.indexOf('image') === -1) {
            console.log('File is not an image.');
            return;
        }

        uploadStatus.value = 'upload';

        const fileReader = new FileReader();
        fileReader.addEventListener("load", (event) => {
            if (event.target) {
                fileName.value = selectedFile.name;
                file.value = selectedFile;
                imageSrc.value = event.target.result as string;
            }
        });

        fileReader.readAsDataURL(selectedFile); 
    }


    const onUploadHandler = async () => {
        isLoading.value = true;
        
        if (file.value) {
            if (!fileName.value.includes('.png') && !fileName.value.includes('.jpg')) {
                uploadStatus.value = 'wrong-format';
                isLoading.value = false;
                return;
            }

            try {
                const data = await sendNewImage(file.value, userId);
                if (!data.ok) {
                    throw new Error('Failed to send image');
                }

                uploadStatus.value = 'success';
            } catch (error) {
                uploadStatus.value = 'error';
                console.error('Network Error:', error);
            } finally {
                isLoading.value = false;
            }
        }
};

    const cancelModalHandler = () => {
        toggleVisibility();
    }

    const handleError = () => {
        uploadStatus.value = 'new';
        isLoading.value = false;
    }

</script>


<template>
    <button class="cross" @click="cancelModalHandler"></button>
    <h2 class="title">Upload a .jpg or .png Dog Image</h2>
    <p class="text">Any uploads must comply with the 
    <a href='https://thecatapi.com/privacy' target="_blank"> upload guidelines </a>
    or face deletion.</p>

    <form v-if="['new', 'success'].includes(uploadStatus)" class="drag-area">
        <label class="text"><span>Drag here</span> your file or <span>Click here</span> to upload</label>
        <input 
            type="file" 
            accept="image/*" 
            @change.prevent="onFileSelect" 
            @click="() => ( uploadStatus = 'new')"/>
    </form>


    <div v-if="['upload', 'error', 'wrong-format'].includes(uploadStatus) && imageSrc" 
        :class="['img-area', uploadStatus === 'error' || uploadStatus === 'wrong-format' ? 'rejected' : '']">
        <img :src="imageSrc" alt="cat image"/>
    </div>

    <p v-if="['new', 'success'].includes(uploadStatus)" class="text">No file selected</p>
    <p v-if="uploadStatus === 'upload'" class="text">Image File Name: {{fileName}}</p>

    <button v-if="uploadStatus === 'upload'" class="upload-btn" 
        @click="onUploadHandler">
        <LoaderSpinner v-if="isLoading" small/>
        UPLOAD PHOTO
    </button>
    
    <ModalLog :result="uploadStatus" @error-handling="handleError"/>
</template>


<style lang="scss" scoped>
    .cross {
        align-self: flex-end;
        border: none;
        @include bg-image-repeat-position(url('../../assets/icons/cross-colar-20.svg'), no-repeat, center);
        background-color: #FFF;
        border-radius: 10px;
        max-width: 40px;
        width: 100%;
        flex-basis: 40px;
        cursor: pointer;
        margin-bottom: 40px;
    }

    .cross:hover {
        background-color: $bright-colar;
        background-image: url('../../assets/icons/cross-white-20.svg');
    }

    .title {
        margin: 0 0 10px 0;
        @include size-color-weight-height(36px, #1D1D1D, 500, 52px);
        text-align: center
    }

    .drag-area {
        width: 100%;
        text-align: center;
        padding: 145px 0 145px;
        border: 2px dashed $pale-coral;
        border-radius: 20px;
        background-color: #FFF;
        @include bg-image-repeat-position(url('../../assets/icons/upload-img.svg'), no-repeat, center);
        margin-bottom: 20px;
        cursor: pointer;
        position: relative;
        overflow: hidden;   
    }


    .drag-area input {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        cursor: pointer;
    }

    .img-area {
        width: 100%;
        padding: 18px 41px;
        border: 2px dashed $pale-coral;
        box-sizing: border-box;
        border-radius: 20px;
        background-color: #FFF;
        margin-bottom: 20px;
        overflow: hidden;
    }

    .img-area img {
        border: none;
        width: 100%;
        max-height: 280px;
        border-radius: 10px;
        object-fit: cover;
        vertical-align: middle;
    }

    .rejected {
        border: 2px dashed $bright-colar;
        background-color: $pale-coral;
    }


    .text {
        @include size-color-weight-height(20px, $dark-grey, 400, 30px);
        margin: 0 0 20px 0;
    }


    .text:first-of-type {
        margin: 0 0 40px 0;
    }

    .text span {
        color: #1D1D1D;
        font-weight: 500;
    }

    .upload-btn {
        border-radius: 10px;
        border: none;
        background-color: $bright-colar;
        max-width: 172px;
        width: 100%;
        padding: 12px 0;
        @include size-color-weight-height(12px, #FFF, 500, 16px);
        letter-spacing: 2px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
    }


    @media (max-width: 765px) {
        .drag-area {
            padding: 100px 0 100px;
        }


    }

    @media (max-width: 375px) {

        .cross {
            max-width: 60px;
            flex-basis: 60px;
            margin-bottom: 20px;
            background-image: url('../../assets/icons/cross-colar-60.svg');
        }
        
        .title {
            @include size-color-weight-height(20px, #1D1D1D, 500, 30px);
        }
        
        .guidelines-text {
            @include size-color-weight-height(20px, $dark-grey, 400, 30px);
            margin-bottom: 20px;

        }
        
        .drag-area {
            padding: 54px 0 54px;
            background-image: url('../../assets/icons/upload-img-100.svg');
            margin-bottom: 10px;
        }

        
        .img-area {
            padding: 20px 10px;
            margin-bottom: 10px;
        }
        
        .img-area img {
            max-height: 248px;
        }
        
        
        .upload-btn {
            max-width: 335px;
        }
    }

</style>