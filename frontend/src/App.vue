<template>
  <router-view v-slot='{ Component }'>
    <transition name='fade'>
      <component :is='Component' class='page' />
    </transition>
  </router-view>
  <router-link :to='{name: "admin"}' class='button--admin'>
    <Settings/>
  </router-link>
</template>

<script>
import { defineComponent } from 'vue';

import Settings from '@/assets/settings.svg?inline';

export default defineComponent({
  components: { Settings },
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

.button--admin {
  position: fixed;
  left: 1rem;
  top: 1rem;
  padding: 1rem;
  color: white;
  border-radius: 100%;
  background: #111;
  display: flex;
  justify-content: center;
  align-items: center;
}


</style>
