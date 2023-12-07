<script setup lang="ts">

    import { ref } from 'vue';

    const emit = defineEmits(['setValue']);

    interface Props {
        options: {name: string, value: string}[]; 
        initial?: {name: string, value: string}; 
        bgColor: string; 
        defaultText?: string; 
        name?: string; 
        width: number;
    }
    
    const props = defineProps<Props>(); 
    const selectedValue = ref<string | undefined>(props.initial?.value || props.defaultText);

    const handleChange = (event: Event) => {
        const target = event.target as HTMLSelectElement;
        emit('setValue', target.value);
    };


</script>


<template>
    <div :class="['select-wrapper', 'width-' + props.width]">
    <span v-if="props.name" class="select-name">{{props.name}}</span>
    <select 
        :name="props.name"
        :class="['select', 'background-' + props.bgColor]"
        v-model="selectedValue"
        @change="handleChange"
    >
        <option v-if="props.defaultText" :value="props.defaultText">{{props.defaultText}}</option>
        <option v-for="(item, index) in props.options" :key="index" :value="item.value">
            {{item.name}}
        </option>
    </select>
  </div>
</template>


<style lang="scss" scoped>
    .select-wrapper {
        display: flex;
        flex-direction: column;
        flex-basis: 100%;
        flex-shrink: 1;
    }

    .select-name {
        @include size-color-weight-height(10px, black, 500, 18px);
        padding-left: 10px;
    }

    .select {
        border-radius: 10px;
        box-sizing: border-box;
        padding: 0 20px 0 10px;
        min-height: 40px;
        min-width: 95px;
        width: 100%;
        appearance: none;
        cursor: pointer;
        @include bg-image-repeat-position(url('../../assets/icons/arrow-down.svg'), no-repeat, right 10px top 50%);
        @include size-color-weight-height(16px, $dark-grey, 400, 24px);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .background-white {
        background-color: #FFF;
        border: 2px solid #FFF;
    }

    .background-gray {
        background-color: $background-grey;
        border: 2px solid $background-grey;
        color: $dark-grey;
    }

    .select:hover {
        border: 2px solid $pale-coral;
    }

    .select:focus {
        border: 2px solid $bright-colar;
        outline: none;
    }

    .width-290 {
        max-width: 290px;
    }

    .width-240 {
        max-width: 240px;
    }

    .width-226 {
        max-width: 226px;
    }

    .width-101 {
        max-width: 101px;
    }


    @media (max-width: 700px) {
        .width-226 {
            max-width: 600px;
        }

        .width-101 {
            max-width: 500px;
        }

    }

</style>