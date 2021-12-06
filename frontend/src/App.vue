<template>
  <router-view v-slot='{ Component }'>
    <transition name='fade'>
      <component :is='Component' class='page' />
    </transition>
  </router-view>
  <router-link :to='{name: "auth"}' class='button--floating top right'>
    <SettingsIcon/>
  </router-link>
  <transition name="fade">
    <router-link :to='{name: "home"}' class='button--floating top left' v-if="$route.name!=='home'">
      <HomeIcon/>
    </router-link>
  </transition>
</template>

<script>
import { defineComponent } from 'vue';

import SettingsIcon from '@/assets/settings.svg?inline';
import HomeIcon from '@/assets/home.svg?inline'

export default defineComponent({
  components: { SettingsIcon, HomeIcon },
});
</script>

<style lang='scss'>
@import "assets/css/global";

.page {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.button--floating {
  position: fixed;

  width: 3rem;
  height: 3rem;
  color: white;
  border-radius: 100%;
  background: #111;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;

  $edge-spacing: 1rem;

  &.top {
    top: $edge-spacing;
  }
  &.left {
    left: $edge-spacing;
  }
  &.right {
    right: $edge-spacing;
  }
}



</style>
