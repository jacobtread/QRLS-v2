<template>
  <div class='home'>
    <div class='block'>
      <Logo class='logo' />
      <p class='description'>
        Welcome to <b>Questionable Research Labs</b> if you are under 12 years <span>(+3 months)</span> old please push
        the button with the
        title <b>Under 12 Years</b> if you are <b>Not</b> Vaccinated please push the <b>Not Vaccinated</b> Button.
        If you are Vaccinated and have already verified your Vaccine Pass click the <b>Already Verified</b> Button.
        Otherwise push the <b>Not Verified</b> button

      </p>
    </div>
    <div class='block section-buttons'>
      <h1>I am...</h1>
      <router-link to='' class='section-button'>
        Verified
        <p class='section-button__desc'>
          If you have already gone through the verification process
        </p>
      </router-link>
      <router-link to='' class='section-button'>
        Not Verified
        <p class='section-button__desc'>
          If you have not already gone through the verification process
        </p>
      </router-link>
      <router-link to='' class='section-button'>
        Not Vaccinated
        <p class='section-button__desc'>
          If you are not vaccinated and are above the age of 12 years <span>(+3 months)</span>
        </p>
      </router-link>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import Logo from '@/assets/logo.svg?inline';

export default defineComponent({
  components: { Logo },
});
</script>

<style lang='scss' scoped>
.logo {
  height: 250px;
  margin-bottom: 5rem;
}

.home {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 100%;
}

.description {
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
    transform: scale(0.9);
  }
}

.section-buttons {
  display: flex;
  flex-flow: column;
  gap: 2rem;
}

.block {
  display: flex;
  flex-flow: column;
}

</style>