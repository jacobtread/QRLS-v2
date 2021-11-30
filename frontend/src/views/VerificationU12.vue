<template>

</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import Logo from '@/assets/logo.svg?inline';
import Loader from '@/components/Loader.vue';
import Dialog from '@/components/Dialog.vue';

export default defineComponent({
  components: { Dialog, Loader, Logo },
  setup() {
    return {};
  },
});
</script>

<style scoped lang='scss'>

</style>