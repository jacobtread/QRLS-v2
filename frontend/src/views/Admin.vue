<template>
  <div class='content'>
    <h1 class='content__title'>
      Configuration Menu
      <router-link :to='{name: "home"}' class='button'>
        Close
      </router-link>
    </h1>
    <p class='content__description'>
      If you are not supposed to be accessing this menu please push the close button at the top of your screen and you
      will be taken back to the normal setup
    </p>
    <Checkbox text='Vaccination Status Mandatory' v-model='mandate' @submit.prevent='addMember' />
    <form class='setting'>
      <h2 class='setting__title'>Manual Member Add</h2>
      <p class='setting__desc'>
        Here you can manually add members who you have verified the vaccination status of
        <b>THIS IS ONLY FOR VACCINATED</b> Not vaccinated members should be signed in using
        the <b>Not Vaccinated</b> button instead
      </p>
      <input type='text' placeholder='Full Name' required v-model='fullName' class='input'>
      <DOBPicker @change='date = $event' class='date-picker' />
      <button type='submit' class='button button--block'>
        Add
      </button>
    </form>
    <form class='setting'>
      <h2 class='setting__title'>Not Vaccinated Message</h2>
      <p class='setting__desc'>Set the message to display to not vaccinated guests</p>
      <textarea name='' id='' cols='30' rows='10' v-model='nvMessage' class='input'></textarea>
      <button type='submit' class='button button--block'>
        Save
      </button>
    </form>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref, toRef, watch } from 'vue';
import Checkbox from '@/components/Checkbox.vue';
import { useStore } from 'vuex';
import DOBPicker from '@/components/DOBPicker.vue';
import { DateTime, Interval } from 'luxon';
import { addMemberAdmin } from '@/api/admin';

export default defineComponent({
  components: { DOBPicker, Checkbox },
  setup() {
    const { state } = useStore();
    const mandate = toRef(state, 'mandate');

    const fullName = ref('');
    const date = ref<DateTime>(DateTime.now());

    const nvMessage = ref('');

    watch(date, () => console.log(date));

    async function addMember() {
      const name = fullName.value;
      const dob = date.value;
      try {
        await addMemberAdmin(name, dob)
      } catch (e) {

      }

    }

    function setNotVaccinatedMessage() {
      const message = nvMessage.value;
    }

    return { mandate, date, fullName, nvMessage, addMember };
  },
});
</script>

<style scoped lang='scss'>
.content {
  padding: 5rem;
  text-align: left;
  overflow: auto;


  &__title {
    margin-bottom: 1rem;
    display: flex;
    gap: 2rem;
    align-items: center;
  }

  &__description {
    color: #777;
    font-size: 1.25rem;
    margin-bottom: 1rem;
  }
}

.setting {
  margin: 1rem 0;

  &__title {
    margin-bottom: 1rem;
  }

  &__desc {
    color: #888;
    font-size: 1.25rem;
    margin-bottom: 1rem;
  }

  .button {
    margin-top: 1rem;
  }
}
</style>