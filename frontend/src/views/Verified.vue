<template>
  <div class='content-wrapper'>
    <div class='content'>
      <Logo class='content__logo' />
      <h1 class='content__title'>Enter Your Name</h1>
      <p class='content__text'>If you have not verified yourself yet please use the <b>Not Verified</b> or <b>Not
        Vaccinated</b> buttons
        instead otherwise your name will not appear in this list. Pressing enter will select the first
        person in the list. You can also click a person and hit enter to select them otherwise you can select them and
        push the <b>Done</b> button
      </p>
      <input
        class='input' type='text'
        placeholder='Your Full Name' autocomplete='off'
        v-model='name' required
        @keydown='inputKey' @input='sortList' tabindex='1'
        @focus='selected = -1'
      >
      <div class='button-group'>
        <button class='button' @click='done'>Done</button>
        <router-link class='button' :to='{name: "home"}'>Back</router-link>
      </div>
      <div class='list' tabindex='2' id='membersList'>
        <div v-for='(value, index) in visibleMembers' :key='index' :tabindex='index + 3'
             :class='{"list__item": true, "list__item--selected": selected === index}'
             @click='selectIndex(index)'
             @focus='selectIndex(index)'
             @keydown='enterFocusRow($event, value)'
        >
          {{ value.name }}
        </div>
      </div>
    </div>
    <Loader v-if='state === "loading"' title='Marking Attendance' message='Please wait while we mark your attendance' />
    <Dialog v-if='state === "complete"'>
      <h1 class='dialog__title'>Success!</h1>
      <p class='dialog__message'>
        You have been marked as attending for today. You can now head on in.
      </p>
      <p class='dialog__message'>This will automatically close in 2 seconds</p>
      <div class='button-group'>
        <button class='button' @click='undo'>
          Undo
        </button>
        <router-link :to='{name: "home"}' class='button'>
          Close
        </router-link>
      </div>
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
    <Dialog v-if='state === "verify-expired"'>
      <h1 class='dialog__title'>Verification Expired</h1>
      <p class='dialog__message'>
        Your verification has expired. Please go through the verification process again in order
        to be able to use this list. Press the <b>Okay</b> button to return to the main menu
      </p>
      <p class='dialog__message'>This message will automatically close in 10s</p>
      <router-link class='button' :to='{name: "home"}'>
        Okay
      </router-link>
    </Dialog>
    <Dialog v-if='state === "error-message"'>
      <h1 class='dialog__title'>Error</h1>
      <p class='dialog__message'>
        An unknown error occurred when attempting to mark your attendance
        Please push the retry button to try again. If this problem persists please
        find a facilitator and let them know about the problem.
      </p>
      <button class='button' @click='state = "initial"'>
        Retry
      </button>
    </Dialog>
  </div>
</template>

<script lang='ts'>
import { defineComponent, onMounted, ref } from 'vue';
import { getList } from '@/api/verify';
import Logo from '@/assets/logo.svg?inline';
import { clearRedirect, setRedirectIn } from '../../tools';
import Loader from '@/components/Loader.vue';
import { clearMarkedVerified, markVisitVerified } from '@/api/visit';
import Dialog from '@/components/Dialog.vue';

export default defineComponent({
  components: { Dialog, Loader, Logo },
  setup() {
    const name = ref('');

    const members = ref<VerifyList>([]);

    const selected = ref(-1);

    const visibleMembers = ref<VerifyList>([]);

    const state = ref('initial');

    let lastMarked: VerifyListItem | null = null;

    function sortList() {
      resetTimer();

      visibleMembers.value = members.value
        .filter(v => nameRank(v.name.toLowerCase()) > 0)
        .sort(rankSort);
    }

    function nameRank(v: string): number {
      const n = name.value.toLowerCase();
      let rank = 0;
      if (n === v) rank += 12;
      if (v.startsWith(n)) rank += 2;
      if (v.indexOf(n) >= 0) rank += 1;
      return rank;
    }

    function rankSort(a: VerifyListItem, b: VerifyListItem): number {
      return nameRank(b.name.toLowerCase()) - nameRank(a.name.toLowerCase());
    }


    onMounted(async () => {
      members.value = await getList();
    });

    async function inputKey(e: KeyboardEvent) {
      if (e.code === 'Enter' && visibleMembers.value.length > 0) {
        await markAttendance(visibleMembers.value[0]);
      }
    }

    function resetTimer() {
      setRedirectIn('home', 10);
    }

    async function enterFocusRow(e: KeyboardEvent, row: VerifyListItem) {
      if (e.code === 'Enter') {
        await markAttendance(row);
      }
    }

    async function done() {
      if (selected.value === -1) return;
      const item = visibleMembers.value[selected.value];
      await markAttendance(item);
    }

    function complete() {
      state.value = 'complete';
      setRedirectIn('home', 2);
    }

    async function markAttendance(item: VerifyListItem) {
      state.value = 'loading';
      lastMarked = item;
      try {
        clearRedirect();
        const timeStart = performance.now();
        await markVisitVerified(item._id, item.name);
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
          } else if (status === 403) {
            state.value = 'verify-expired';
            resetTimer();
          }
        } else {
          state.value = 'error-message';
        }
      }
    }

    function selectIndex(index: number) {
      selected.value = index;
      resetTimer();
    }

    resetTimer();

    function undo() {
      if (lastMarked != null) {
        clearMarkedVerified(lastMarked._id);
        state.value = 'initial';
        resetTimer();
      }
    }

    return {
      name, inputKey, visibleMembers,
      done, selected, sortList, enterFocusRow,
      selectIndex, state, undo,
    };
  },
});
</script>

<style scoped lang='scss'>

.content {
  justify-content: center;
  margin: 1em auto;
  max-width: 1200px;

  &-wrapper {
    overflow: auto;
  }

  &__title {
    margin-bottom: 1rem;
  }

  &__logo {
    height: 240px;
    margin-bottom: 2rem;
    margin-top: 1rem;
  }

  &__text {
    line-height: 1.5;
    font-size: 1.25rem;
    max-width: 700px;
    margin: 1rem auto;
    color: #999;
  }

  .button-group {
    margin-top: 1rem;

    .button {
      flex: auto;
    }
  }

}


.list {
  background: #333;
  margin-top: 1rem;
  padding: 1rem;
  display: flex;
  flex-flow: column;

  &__item {
    display: block;
    font-size: 1.25rem;
    text-align: left;
    padding: 1rem;
    background: #272727;

    &--selected {
      background: #1f1f1f;
    }

    input {
      opacity: 0;
    }
  }
}
</style>