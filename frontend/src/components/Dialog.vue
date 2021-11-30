<template>
  <div class='dialog-wrapper' v-if='visible'>
    <div class='dialog'>
      <slot />
      <Logo class='dialog__logo' />
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import Logo from '@/assets/logo.svg?inline';

export default defineComponent({
  components: { Logo },
  props: { visible: Boolean, title: String, message: String },
  setup() {
  },
});
</script>

<style scoped lang='scss'>
.dialog {

  background: #222;
  padding: 2rem;
  border-radius: 1rem;

  &-wrapper {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    z-index: 99;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.7);
  }

  &__logo {
    height: 100px;
    display: block;
    margin: 2rem auto 0;
  }

  :deep(.dialog__title) {
    margin-bottom: 0.5em;
    font-size: 2.2rem;
  }

  :deep(.dialog__message) {
    font-size: 1.5rem;
    max-width: 500px;
    color: #999;
    margin-bottom: 1em;
  }
}


</style>