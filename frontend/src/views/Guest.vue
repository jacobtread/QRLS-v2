<template>
  <div class='content'>
    <form @submit.prevent='verify'>
      <h1 class='content__title'>Welcome</h1>
      <p class='content__text'>Please enter your full name in the box below and then press the <b>Done</b> button when
        you are done</p>
      <input class='input' type='text' @keydown='resetTimer' placeholder='Your Full Name' autocomplete='off'
             v-model='name' required>
      <div class='button-group'>
        <button class='button' type='submit'>
          Done
        </button>
        <router-link :to='{name: "home"}' class='button'>
          Go Back
        </router-link>
      </div>
      <Loader v-if='state === "loading"' title='Verifying' message='Please wait while we verify you' />
    </form>

    <Dialog v-if='state === "complete"'>
      <h1 class='dialog__title'>Success!</h1>
      <p class='dialog__message'>
        Your attendance has been marked successfully today you may now enter.
      </p>

      <p class='dialog__message'>This will automatically close in 10 seconds</p>

      <router-link :to='{name: "home"}' class='button'>
        Close
      </router-link>
    </Dialog>
    <Dialog v-if='state === "already-marked"'>
      <h1 class='dialog__title'>You are already marked for today</h1>
      <p class='dialog__message'>
        You have already been marked as present today you do not need to mark yourself again.
        Please press the <b>Okay</b> button and we will
        take you back to the main page
      </p>
      <p class='dialog__message'>This message will automatically close in 10s</p>
      <router-link class='button' :to='{name: "home"}'>
        Okay
      </router-link>
    </Dialog>
    <Dialog v-if='state === "error-message"'>
      <h1 class='dialog__title'>Error</h1>
      <p class='dialog__message'>
        An unknown error occurred when attempting to verify your information.
        Please push the retry button to try again. If this problem persists please
        find a facilitator and let them know about the problem.
      </p>
      <button class='button' @click='state = "scanning"'>
        Retry
      </button>
    </Dialog>
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