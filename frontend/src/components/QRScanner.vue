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
  emits: ['scanned'],
  setup(_, {emit}) {

    const videoRef = ref<HTMLVideoElement | null>(null);

    onMounted(async () => {
      console.log('MOunted')
      const scanner = new QrScanner(videoRef.value as HTMLVideoElement, result => {
        if (result.length < 1) return;
        emit('scanned', result)
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
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
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