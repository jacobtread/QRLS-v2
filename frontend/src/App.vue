<template>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component" class='page'/>
    </transition>
  </router-view>
</template>

<style lang="scss">
@import "assets/css/global";

.page {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
</style>
