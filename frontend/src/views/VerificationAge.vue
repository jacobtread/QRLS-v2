<template>
  <div class='age'>
    <div class='block'>
      <Logo class='logo' />
      <router-link :to='{name: "home"}' class='button back'>
        Go Back
      </router-link>
    </div>
    <div class='block section-buttons'>
      <h1>I am...</h1>
      <router-link :to='{name: "verification-u12"}' class='section-button'>
        Under 12 Years Old
        <p class='section-button__desc'>
          If you are under 12 Years <span>(+3 months)</span> old
        </p>
      </router-link>
      <router-link :to='{name: "verification-o12"}' class='section-button'>
        Over 12 Years Old
        <p class='section-button__desc'>
          If you are over 12 Years <span>(+3 months)</span> old
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

.age {
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