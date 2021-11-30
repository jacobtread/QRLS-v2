<template>
  <div class='date-picker'>
    <label class='date-picker__value-label'>Year
      <select v-model='date.year' class='date-picker__value'>
        <option v-for='(value, index) in years' :key='index' :value='value'>{{ value }}</option>
      </select>
    </label>
    <label class='date-picker__value-label'>Month
      <select v-model='date.month' class='date-picker__value'>
        <option v-for='(value, index) in months' :key='index' :value='value'>{{ value }}</option>
      </select>
    </label>
    <label class='date-picker__value-label'>Date
      <select v-model='date.date' class='date-picker__value'>
        <option v-for='(value, index) in days' :key='index' :value='value'>{{ value }}</option>
      </select>
    </label>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, ref, watch } from 'vue';
import { DateTime } from 'luxon';

export default defineComponent({
  emits: [ 'change' ],
  setup(_, { emit }) {

    const now = new Date();

    const date = reactive({
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      date: now.getDate(),
    });

    const years = possibleYears();
    const months = possibleMonths();
    const days = ref(possibleDays());

    watch(date, () => days.value = possibleDays());

    function possibleYears() {
      return listOfNumbers(2003, now.getFullYear());
    }

    function possibleMonths() {
      return listOfNumbers(1, 12);
    }

    function possibleDays() {
      const total = new Date(date.year, date.month, 0).getDate();
      if (date.date > total) date.date = total;
      return listOfNumbers(1, total);
    }

    function listOfNumbers(min: number, max: number) {
      const list = [];
      for (let i = min; i <= max; i++) {
        list.push(i);
      }
      return list;
    }

    watch(date, () => emit('change', DateTime.fromObject({ year: date.year, month: date.month, day: date.date })));

    return { years, months, days, date };
  },
});
</script>

<style scoped lang='scss'>
.date-picker {
  display: flex;
  gap: 2rem;
  justify-content: center;
  margin-top: 1rem;
  width: 100%;

  &__value {
    border: none;
    padding: 1rem 3rem;
    font-size: 1.25rem;
    background: #333;
    color: white;
    flex: auto;
    border-radius: 0.25rem;

    &-label {
      display: flex;
      flex-flow: column;
      text-align: left;
      gap: 0.5rem;
      font-size: 1.2rem;
      flex: auto;
    }
  }
}
</style>