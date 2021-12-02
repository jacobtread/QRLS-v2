<template>
  <div class='content'>
    <h1 class='content__title'>
      Attendance Menu
      <router-link :to='{name: "home"}' class='button'>
        Close
      </router-link>
    </h1>
    <div class='list'>
      <div v-for='(value, index) in attending' :key='index' class='list__value'>
        <span class='list__value__name'>{{ value.guestName }}</span>
        <div class='list__value__right'>
          <span class='list__value__time'>{{ formatTime(value.time) }}</span>
          <span class='list__value__verified' v-if='value.member'>Verified</span>
          <button class='button list__value__button' @click='removeVisit(value)'>
            Remove
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, onMounted, ref } from 'vue';
import Checkbox from '@/components/Checkbox.vue';
import { useStore } from 'vuex';
import DOBPicker from '@/components/DOBPicker.vue';
import { DateTime } from 'luxon';
import { getAllForDate, removeVisit } from '@/api/visit';

export default defineComponent({
  components: { DOBPicker, Checkbox },
  setup() {
    const { state } = useStore();

    const attending = ref<VisitList>([]);
    const date = DateTime.now();

    onMounted(async () => {
      try {
        const { data } = await getAllForDate(DateTime.now());
        attending.value = data;
      } catch (e) {
        alert('Failed to load attending list: ' + e);
      }
    });

    async function removeVisitC(item: VisitListItem) {
      try {
        await removeVisit(date, item);
        attending.value = attending.value.filter(v => v._id !== item._id);
      } catch (e) {
        alert('Failed to load attending list: ' + e);
      }
    }

    function formatTime(time: string) {
      return DateTime.fromISO(time).toLocaleString(DateTime.TIME_SIMPLE);
    }

    return { attending, formatTime, removeVisit: removeVisitC };
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


.list {
  background: #333;
  padding: 1rem;
  display: flex;
  flex-flow: column;
  max-width: 1200px;
  margin: 1rem auto;

  &__value {
    display: flex;
    align-items: center;
    gap: 2rem;
    font-size: 1.25rem;
    text-align: left;
    padding: 1rem;
    background: #272727;

    &__name {
      font-size: 1.25rem;
    }

    &__verified, &__time {
      padding: 1.25rem;
      background: #424f53;
    }

    &__right {
      flex: auto;
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }

  }
}
</style>