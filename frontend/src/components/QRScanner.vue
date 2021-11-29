<template>
  <div>
    <div class='wrapper'>
      <video ref='videoRef' width='600' height='600' />
      <div class='alignment'></div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, onMounted, ref } from 'vue';
import QrScanner from 'qr-scanner';

export default defineComponent({
  setup() {

    const videoRef = ref<HTMLVideoElement | null>(null);

    onMounted(async () => {
      console.log('MOunted')
      const scanner = new QrScanner(videoRef.value as HTMLVideoElement, result => {
        console.log(result);
      });
      await scanner.start();
    });

    return { videoRef };
  },
});
</script>

<style scoped lang='scss'>
.wrapper {
  position: relative;
  width: 600px;
  height: 600px;
}

.alignment {

  position: absolute;
  left: calc(50% - 200px);
  top: calc(50% - 200px);
  width: 400px;
  height: 400px;
  border: 2px solid red;

}
</style>