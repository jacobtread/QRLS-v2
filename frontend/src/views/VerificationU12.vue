<template>
  <div class='content'>
    <div>
      <h1 class='content__title'>Welcome</h1>
      <p class='content__text'>Please enter your full name in the box below and select your date of birth in the box
        under that and then press the <b>Done</b> button when you are done</p>
      <input class='input' type='text' placeholder='Your Full Name' autocomplete='off' v-model='name'>
      <DOBPicker @change='changeDate' class='date-picker' />
      <button class='button' @click='verify'>
        Done
      </button>
      <Logo class='content__logo' />
      <Loader v-if='state === "loading"' title='Verifying' message='Please wait while we verify you' />
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue';
import Logo from '@/assets/logo.svg?inline';
import Loader from '@/components/Loader.vue';
import Dialog from '@/components/Dialog.vue';
import DOBPicker from '@/components/DOBPicker.vue';

import { DateTime, Interval } from 'luxon';
import { confirmVerify } from '@/api/verify';

export default defineComponent({
  components: { DOBPicker, Dialog, Loader, Logo },
  setup() {

    const state = ref('initial');

    const date = ref<DateTime | null>(null);
    const name = ref('');

    function changeDate(data: DateTime) {
      date.value = data;
      console.log(isValidDate());
    }

    function isValidDate(): boolean {
      if (date.value == null) return false;
      const now = DateTime.now();
      const other = date.value as DateTime;
      console.log(other.toISODate());
      const diff = Interval.fromDateTimes(other, now);
      const years = diff.length('years');
      return years <= 12.3; // added the extra .05 because floating points go yes
    }

    async function verify() {
      state.value = 'loading';

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

  .button {
    display: block;
    width: 100%;
    margin-top: 2rem;
  }
}

</style>