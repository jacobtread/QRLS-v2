<template>
  <div class='verify'>
    <div class='block'>
      <Logo class='logo' />

      <p class='description'>
        To Verify your <b>Vaccine Pass</b> please place it within the <b>Red</b> square on the camera that has appeared
        after this we will validate that your Vaccine Pass is valid and then you will be signed in automatically.
        For information getting a <b>Vaccine Pass</b> visit
        <b class='link'>https://vaccine.qrl.nz</b>
      </p>

      <router-link :to='{name: "home"}' class='button back'>
        Go Back
      </router-link>
    </div>
    <div class='block'>
      <QRScanner @scanned='completeScan' v-if='showScanner' />
    </div>
    <Loader :loading='showLoader' title='Verifying Pass'
            message='Please wait while we verify that your vaccine pass is valid' />
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue';
import QRScanner from '@/components/QRScanner.vue';
import Logo from '@/assets/logo.svg?inline';
import { startVerify } from '@/api/verify';
import Loader from '@/components/Loader.vue';

export default defineComponent({
  components: { Loader, QRScanner, Logo },
  setup() {
    const showLoader = ref(false);
    const showScanner = ref(true);

    async function completeScan(uri: string) {
      showScanner.value = false;
      showLoader.value = true;
      console.log('YES');
      const timeStart = performance.now();
      const { data } = await startVerify(uri);
      const duration = performance.now() - timeStart;
      if (duration < 3000) {
        setTimeout(nextStep, 3000 - duration);
      } else {
        await nextStep();
      }
    }

    async function nextStep() {
      showLoader.value = false;

    }

    return { showScanner, showLoader, completeScan };
  },
});
</script>

<style scoped lang='scss'>
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

.verify {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 100%;
}

.back {
  margin-top: 1em;
}
</style>