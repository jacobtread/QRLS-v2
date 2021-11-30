<template>
  <div class='loader-wrapper' v-if='loading'>
    <div class='loader'>
      <div class='loader__spinner'></div>
      <h1 class='loader__title'>{{ title }}</h1>
      <p class='loader__message'>{{ message }}</p>
      <Logo class='loader__logo' />
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import Logo from '@/assets/logo.svg?inline';

export default defineComponent({
  components: { Logo },
  props: { loading: Boolean, title: String, message: String },
  setup() {
  },
});
</script>

<style scoped lang='scss'>
.loader {

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
  }

  &__title {
    margin-bottom: 0.5em;
    font-size: 2.2rem;
  }

  &__message {
    font-size: 1.5rem;
    max-width: 500px;
    color: #999;
    margin-bottom: 1em;
  }

  &__spinner {
    display: inline-block;
    margin: 1rem auto;
    width: 120px;
    height: 120px;
    border-radius: 120px;
    border:  5px solid #111;
    border-top: 5px solid white;
    animation: spinner 1s linear infinite;
    animation-delay: 0s;
  }

}

@keyframes spinner {
  0%{
    transform: rotateZ(0deg);
  }
  100% {
    transform: rotateZ(360deg);
  }
}

</style>