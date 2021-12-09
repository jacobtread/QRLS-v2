<template>
  <div class='content'>
    <div class='block'>
      <Logo class='logo' />

      <p class='mandate'>
        <template v-if='mandate'>Vaccine Verification is currently Mandatory</template>
        <template v-else>Vaccine Verification is currently not mandatory</template>
      </p>

      <p v-if='mandate' class='mandate__desc'>We are required to verify your vaccination pass</p>

      <p class='description'>
        Welcome to <b>Questionable Research Labs</b>.<br/>
        Under current covid conditions, it is expected that everyone wears a mask. If you do not have one, there is some "questionable" ones next to the kiosk.<br/>
      </p>
      <p v-if="mandate" class='description'>
          We are currently required to verify your vaccination pass if you are over 12 years old <span>(+3 months)</span>. This means we have a maximum capacity of 100 people.
      </p>
      <p v-else class='description'>
          We are not currently required to verify your vaccination status. This means we have a maximum capacity of 25 people. Please still verify if you can so we can make informed decisions later on.
      </p>
    </div>
    <div class='block section-buttons'>
      <h1>I am...</h1>
      <router-link :to='{name: "verified"}' class='section-button'>
        Already Verified
        <p class='section-button__desc'>
          If you have already gone through the verification process and either showed your vaccine pass or checked your date of birth.
        </p>
      </router-link>
      <div class="setup-container section-buttons">
        <router-link :to='{name: "verification-o12"}' class='section-button'>
          Vaccinated
          <p class='section-button__desc'>
            If you have your My Vaccine Pass.
          </p>
        </router-link>
        <router-link :to='{name: "verification-u12"}' class='section-button'>
          Under 12 Years Old
          <p class='section-button__desc'>
            If you are under 12 Years <span>(+3 months)</span> old
          </p>
        </router-link>
      </div>
      <router-link :to='mandate ? {name:"not-vaccinated"} : {name: "guest"}' class='section-button'>
        Not Vaccinated &amp; Over 12 Years Old 
        <p class='section-button__desc'>
            If you are not vaccinated and are above the age of 12 years <span>(+3 months)</span>
        </p>
      </router-link>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, toRef } from 'vue';
import Logo from '@/assets/logo.svg?inline';
import { useStore } from 'vuex';

export default defineComponent({
  components: { Logo },
  setup() {
    const { state } = useStore();
    const mandate = toRef(state, 'mandate');

    return { mandate };
  },
});
</script>

<style lang='scss' scoped>
.logo {
  height: 250px;
  margin-bottom: 2rem;
}

.mandate {
  font-size: 1.5rem;
  max-width: 550px;
  color: #fd4848;

  &__desc {
    color: #888;
    margin-top: 0.5rem;
  }
}

.content {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 100%;
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
}

.section-button {
  flex: auto;
  display: block;
  color: white;
  text-decoration: none;
  background: #333;
  font-size: 1.5rem;
  padding: 2rem;
  transition: all 0.25s ease;

  &__desc {
    color: #cacaca;
    font-size: 1.2rem;
    margin-top: 0.5rem;
    max-width: 500px;

    span {
      color: #777;
    }
  }

  &:hover {
    background: #555;
    transform: scale(1.05);
  }

  &:active {
    transition: all 0.1s ease;
    transform: scale(0.99);
  }
}

.section-buttons {
  display: flex;
  flex-flow: column;
  gap: 1rem;
}

.block {
  display: flex;
  flex-flow: column;
}

.setup-container {
  outline: white solid 1px;
  outline-offset: 1rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  scale: 1.2;
      position: relative;
  &::before {
    content: "Setup";
    position: absolute;
    left: 50%;
    top: -9%;
    transform: translateX(-50%);
    background: #1e1e1e;
    padding-left: 1rem;
    padding-right: 1rem;

  }
}

</style>