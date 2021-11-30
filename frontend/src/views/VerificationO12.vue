<template>
  <div class='content'>
    <div class='block'>
      <Logo class='logo' />

      <p class='description'>
        To Verify your <b>Vaccine Pass</b> please place it within the <b>Red</b> square on the camera that has appeared
        after this we will validate that your Vaccine Pass is valid and then you will be signed in automatically.
        For information getting a <b>Vaccine Pass</b> visit
        <b class='link'>https://vaccine.qrl.nz</b>
      </p>

      <router-link :to='{name: "verification"}' class='button back'>
        Go Back
      </router-link>
    </div>
    <div class='block'>
      <QRScanner @scanned='completeScan' v-if='state === "scanning"' />
    </div>
    <Loader v-if='state === "loading"' title='Verifying Pass'
            message='Please wait while we verify that your vaccine pass is valid' />
    <Loader v-if='state === "loading-confirm"' title='Confirming'
            message='We are confirming your verification please wait...' />
    <Dialog v-if='state === "confirm"'>
      <h1 class='dialog__title'>Confirm Details</h1>
      <p class='dialog__message'>Please confirm that the following details are correct</p>

      <div class='details'>
        <span class='details__name'>Name: </span>
        <span class='details__value'>{{ verifyResult.name }}</span>
      </div>

      <div class='details'>
        <span class='details__name'>D.O.B:</span>
        <span class='details__value'>{{ verifyResult.dob }}</span>
      </div>
      <div class='button-group'>
        <button class='button' @click='confirm'>
          Confirm
        </button>
        <button @click='state = "scanning"' class='button'>
          Cancel
        </button>
      </div>
    </Dialog>

    <Dialog v-if='state === "complete"'>
      <h1 class='dialog__title'>Success!</h1>
      <p class='dialog__message'>
        We have successfully verified your Vaccine Pass you have automatically been marked
        as attending for today. For further logins please use the <b>Verified</b> button instead.
        You may now enter the building.
      </p>

      <p class='dialog__message'>This message will automatically close in 10s</p>

      <router-link :to='{name: "home"}' class='button'>
        Close
      </router-link>
    </Dialog>

    <Dialog v-if='state === "invalid-code"'>
      <h1 class='dialog__title'>Incorrect Code</h1>
      <p class='dialog__message'>
        It seems that the QR code you scanned isn't a valid Vaccine Pass Code. Please make
        sure you are using a valid Vaccine Pass. You can find more details about Vaccine Passes
        at <b class='link'>https://vaccine.qrl.nz</b>. If you are sure that this code is correct
        please push the <b>Retry</b> button and try and we will try and scan it again. If you are
        not Vaccinated you can push the <b>Not Vaccinated</b> button instead
      </p>
      <div class='button-group'>
        <button class='button' @click='state = "scanning"'>
          Retry
        </button>
        <router-link class='button' :to='{name: "not-vaccinated"}'>
          Not Vaccinated
        </router-link>
      </div>
    </Dialog>

    <Dialog v-if='state === "error-message"'>
      <h1 class='dialog__title'>Error</h1>
      <p class='dialog__message'>
        {{ error }}
      </p>
      <button class='button' @click='state = "scanning"'>
        Retry
      </button>
    </Dialog>

    <Dialog v-if='state === "already-verified"'>
      <h1 class='dialog__title'>You are already Verified</h1>
      <p class='dialog__message'>
        You have already been <b>Verified</b> in our system. You do not have to verify again.
        Please use the <b>Verified</b> button. Please press the <b>Okay</b> button and we will
        take you back to the main page
      </p>
      <router-link class='button' :to='{name: "home"}'>
        Okay
      </router-link>
    </Dialog>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue';
import QRScanner from '@/components/QRScanner.vue';
import Logo from '@/assets/logo.svg?inline';
import { confirmVerify, startVerify } from '@/api/verify';
import Loader from '@/components/Loader.vue';
import Dialog from '@/components/Dialog.vue';
import { VACCINE_PASS_REGEX } from '@/constants';
import { useRouter } from 'vue-router';

export default defineComponent({
  components: { Dialog, Loader, QRScanner, Logo },
  setup() {
    const state = ref('scanning');

    const verifyResult = ref<VerifyDetails>({ name: '', dob: '' });
    const error = ref('');

    const dataURI = ref('');

    const { push } = useRouter();

    async function completeScan(uri: string) {
      dataURI.value = uri;
      state.value = 'loading';
      if (!VACCINE_PASS_REGEX.test(uri)) {
        state.value = 'invalid-code';
        return;
      }
      try {
        const timeStart = performance.now();
        const { data } = await startVerify(uri);
        const duration = performance.now() - timeStart;
        /*
        * If the request took < 3000ms add the remaining time
        * to give them a false sense of security >:)
        */
        if (duration < 3000) {
          setTimeout(() => nextStep(data), 3000 - duration);
        } else {
          await nextStep(data);
        }
      } catch (e: any) {
        if (e.response) {
          const { data, status } = e.response;
          console.log(status);
          if (status === 422) {
            state.value = 'already-verified';
          } else if (status === 400) {
            state.value = 'invalid-code';
          }
        } else {
          state.value = 'error-message';
          error.value = `
          An unknown error occurred when attempting to verify your Vaccine Pass.
          Please push the retry button to try again. If this problem persists please
          find a facilitator and let them know about the problem.
          `;
        }
      }
    }

    async function nextStep(data: VerifyDetails) {
      state.value = 'confirm';
      verifyResult.value = data;
    }

    async function confirm() {
      const uri = dataURI.value;
      state.value = 'loading-confirm';
      if (!VACCINE_PASS_REGEX.test(uri)) {
        state.value = 'invalid-code';
        return;
      }
      try {
        const timeStart = performance.now();
        await confirmVerify(uri);
        const duration = performance.now() - timeStart;
        if (duration < 3000) {
          setTimeout(complete, 3000 - duration);
        } else {
          complete();
        }
      } catch (e: any) {
        if (e.response) {
          const { status } = e.response;
          if (status === 422) {
            state.value = 'already-verified';
          } else if (status === 400) {
            state.value = 'invalid-code';
          }
        } else {
          state.value = 'error-message';
          error.value = `
          An unknown error occurred when attempting to verify your Vaccine Pass.
          Please push the retry button to try again. If this problem persists please
          find a facilitator and let them know about the problem.
          `;
        }
      }
    }

    function complete() {
      state.value = 'complete';
      setTimeout(() => {
        push({ name: 'home' });
      }, 10 * 1000);
    }

    return { state, verifyResult, error, completeScan, confirm };
  },
});
</script>

<style scoped lang='scss'>
.details {
  display: flex;
  flex-flow: row;
  gap: 1em;
  font-size: 1.25rem;
  margin: 1rem auto;

  &__name {
    color: white;
    font-weight: bold;
  }
  &__value {
    color: #888;
  }
}

.logo {
  height: 250px;
  margin-bottom: 2rem;
}

.description {
  margin-top: 1rem;
  max-width: 500px;
  line-height: 2;
  font-size: 1.25em;
  font-weight: 500;
  color: #cacaca;

  b {
    font-weight: bold;
    color: white;
  }

  span {
    color: #777;
  }

  .link {
    display: block;
    color: #506df3;
  }
}

.content {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 100%;
}

.back {
  margin-top: 1em;
}
</style>