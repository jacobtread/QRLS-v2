<template>
  <div class='content'>
    <div>
      <h1>Not Vaccinated Notice</h1>
      <p class='content__text' v-html='$store.state.nvMessage.replace("\n", "<br/>")'></p>
      <router-link class='button button--block' :to='{name: "home"}'>Go Back</router-link>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue';
import Loader from '@/components/Loader.vue';
import Dialog from '@/components/Dialog.vue';
import DOBPicker from '@/components/DOBPicker.vue';
import { clearRedirect, setRedirectIn } from '../../tools';
import { markVisitGuest } from '@/api/visit';

export default defineComponent({
  components: { DOBPicker, Dialog, Loader },
  setup() {

    const state = ref('initial');
    const name = ref('');

    function complete() {
      state.value = 'complete';
      setRedirectIn('home', 10);
    }

    async function verify() {
      state.value = 'loading';
      try {
        clearRedirect();
        const timeStart = performance.now();
        await markVisitGuest(name.value);
        const duration = performance.now() - timeStart;
        if (duration < 1000) {
          setTimeout(complete, 1000 - duration);
        } else {
          complete();
        }
      } catch (e: any) {
        if (e.response) {
          const { status } = e.response;
          if (status === 422) {
            state.value = 'already-marked';
            resetTimer();
          } else {
            state.value = 'error-message';
          }
        } else {
          state.value = 'error-message';
        }
      }
    }

    function resetTimer() {
      setRedirectIn('home', 10);
    }

    resetTimer();

    return { name, resetTimer, verify, state };
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

  &__text {
    line-height: 1.5;
    font-size: 1.25rem;
    max-width: 700px;
    margin: 1rem auto;
    color: #999;
    display: block;
  }

  .button {
    display: block;
  }
}

</style>