<template>
  <div class='content'>
    <form @submit.prevent='verify'>
      <h1 class='content__title'>Enter Admin Password</h1>
      <p class='content__text'>This screen is protected by an administrator password please enter it to continue</p>
      <input class='input' type='password' @keydown='resetTimer' placeholder='Password' autocomplete='off'
             v-model='password' required>
      <div class='button-group'>
        <button class='button' type='submit'>
          Done
        </button>
        <router-link :to='{name: "home"}' class='button'>
          Go Back
        </router-link>
      </div>
    </form>
  </div>
</template>

<script lang='ts'>
import { defineComponent, onMounted, ref } from 'vue';
import Loader from '@/components/Loader.vue';
import Dialog from '@/components/Dialog.vue';
import DOBPicker from '@/components/DOBPicker.vue';
import { setRedirectIn } from '../../tools';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default defineComponent({
  components: { DOBPicker, Dialog, Loader },
  setup() {

    const { state } = useStore();
    const { push } = useRouter();
    const password = ref('');

    function verify() {
      if (password.value == state.admin) {
        push({ name: 'admin' });
      } else {
        alert('INCORRECT PASSWORD');
      }
    }

    function resetTimer() {
      setRedirectIn('home', 10);
    }

    resetTimer();

    return { password, resetTimer, verify };
  },
});
</script>

<style scoped lang='scss'>
.content {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  &__title {
    margin-bottom: 1rem;
  }

  &__text {
    line-height: 1.5;
    font-size: 1.25rem;
    max-width: 700px;
    margin: 1rem auto;
    color: #999;
  }

  &__logo {
    height: 150px;
    margin-top: 2rem;
  }

  .button-group {
    width: 100%;
    margin-top: 1em;

    .button {
      flex: auto;
    }
  }
}

</style>