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
    });

    return { videoRef };
  },
});
</script>

<style scoped lang='scss'>
.wrapper {
  display: flex;
  align-items: center;
  position: relative;
  width: 400px;
  height: 400px;
  overflow: hidden;
  -webkit-transform: scale(-1.5, 1.5);
  transform: scale(-1.5, 1.5);
  background: black;
}

.alignment {

  position: absolute;
  left: calc(50% - 150px);
  top: calc(50% - 150px);
  width: 300px;
  height: 300px;
  border: 10px solid red;
  border-radius: 5px;

}
</style>