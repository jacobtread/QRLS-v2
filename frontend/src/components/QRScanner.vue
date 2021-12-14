<template>
  <div>
    <div class='wrapper'>
      <video ref='videoRef' width='400' />
      <div class='alignment'></div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, onMounted, onUnmounted, ref } from 'vue';
import QrScanner from 'qr-scanner';

export default defineComponent({
  emits: [ 'scanned' ],
  setup(_, { emit }) {

    const videoRef = ref<HTMLVideoElement | null>(null);

    let scanner: QrScanner | null = null;

    onMounted(async () => {
      scanner = new QrScanner(videoRef.value as HTMLVideoElement, result => {
        if (result.length < 1) return;
        emit('scanned', result);
      });
      await scanner.start();
    });

    onUnmounted(() => {
      scanner?.stop();
      scanner?.destroy()
    });

    return { videoRef };
  },
});
</script>

<style scoped lang='scss'>
@use "sass:math";

.wrapper {
  $size: 400px;

  display: flex;
  align-items: center;
  position: relative;
  width: $size;
  height: $size;
  overflow: hidden;
  -webkit-transform: scale(-1.5, 1.5);
  transform: scale(-1.5, 1.5);
  background: black;
  display: flex;
  justify-content: center;
  align-items: center;
  video {
    // Assumes 16*9 aspect ratio
    width: ($size*math.div(16, 9));
  }
}

.alignment {

  position: absolute;
  left: calc(50% - 100px);
  top: calc(50% - 100px);
  width: 200px;
  height: 200px;
  border: 5px solid red;
  border-radius: 3px;

}
</style>