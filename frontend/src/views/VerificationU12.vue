<template>
  <div class='content'>
    <form @submit.prevent='verify'>
      <h1 class='content__title'>Welcome</h1>
      <p class='content__text'>Please enter your full name in the box below and select your date of birth in the box
        under that and then press the <b>Done</b> button when you are done</p>
      <input class='input' type='text' placeholder='Your Full Name' autocomplete='off' v-model='name' required>
      <DOBPicker @change='changeDate' class='date-picker' />
      <div class='button-group'>
        <button class='button' type='submit'>
          Done
        </button>
        <router-link :to='{name: "verification"}' class='button'>
          Go Back
        </router-link>
      </div>
      <Loader v-if='state === "loading"' title='Verifying' message='Please wait while we verify you' />
    </form>

    <Dialog v-if='state === "complete"'>
      <h1 class='dialog__title'>Success!</h1>
      <p class='dialog__message'>
        We have successfully verified your name and DOB you have automatically been marked
        as attending for today. For further logins please use the <b>Verified</b> button instead.
        You may now enter the building.
      </p>

      <p class='dialog__message'>This will automatically close in 10 seconds</p>

      <router-link :to='{name: "home"}' class='button'>
        Close
      </router-link>
    </Dialog>
    <Dialog v-if='state === "too-old"'>
      <h1 class='dialog__title'>Too Old</h1>
      <p class='dialog__message'>
        You are too old to use this option. You cannot be older than 12 years <span>(+3 months)</span> old.
        You must select the over 12 years old option and verify your Vaccine Pass. Or if you are Not Vaccinated
        you can click the Not Vaccinated button
      </p>

      <p class='dialog__message'>This message will automatically close in 10s</p>
      <div class='button-group'>
        <router-link :to='{name: "home"}' class='button'>
          Close
        </router-link>
        <router-link :to='{name: "verification-o12"}' class='button'>
          Verify Pass
        </router-link>
        <router-link :to='{name: "not-vaccinated"}' class='button'>
          Not Vaccinated
        </router-link>
      </div>
    </Dialog>
    <Dialog v-if='state === "already-verified"'>
      <h1 class='dialog__title'>You are already Verified</h1>
      <p class='dialog__message'>
        You have already been <b>Verified</b> in our system. You do not have to verify again.
        Please use the <b>Verified</b> button. Please press the <b>Okay</b> button and we will
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

import { DateTime, Interval } from 'luxon';
import { verifyU12 } from '@/api/verify';
import { useRouter } from 'vue-router';
import { setRedirectIn } from '../../tools';

export default defineComponent({
  components: { DOBPicker, Dialog, Loader },
  setup() {

    const state = ref('initial');

    const date = ref<DateTime>(DateTime.now());
    const name = ref('');

    const { push } = useRouter();

    const error = ref('');

    function changeDate(data: DateTime) {
      date.value = data;
    }

    function isValidDate(): boolean {
      const now = DateTime.now();
      const other = date.value as DateTime;
      const diff = Interval.fromDateTimes(other, now);
      const years = diff.length('years');
      return years <= 12.3; // added the extra .05 because floating points go yes
    }

    function complete() {
      state.value = 'complete';
      setRedirectIn('home', 10);
    }

    async function verify() {
      if (!isValidDate()) {
        state.value = 'too-old';
        setRedirectIn('home', 10);
        return;
      }
      state.value = 'loading';
      try {
        const timeStart = performance.now();
        await verifyU12(name.value, date.value as DateTime);
        const duration = performance.now() - timeStart;
        if (duration < 2000) {
          setTimeout(complete, 2000 - duration);
        } else {
          complete();
        }
      } catch (e: any) {
        if (e.response) {
          const { status } = e.response;
          if (status === 422) {
            state.value = 'already-verified';
            setRedirectIn('home', 10);
          }
        } else {
          state.value = 'error-message';
          error.value = `
          An unknown error occurred when attempting to verify your information.
          Please push the retry button to try again. If this problem persists please
          find a facilitator and let them know about the problem.
          `;
        }
      }
    }

    return { date, changeDate, name, verify, state };
  },
});
</script>

<style scoped lang='scss'>
.content {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  &__title {
    margin-bottom: 1rem;
  }

  &__text {
    line-height: 1.5;
    font-size: 1.25rem;
    max-width: 700px;
    margin-bottom: 1rem;
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