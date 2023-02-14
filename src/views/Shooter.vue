<template>
  <div>
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useCanvas } from "@/hooks/useCanvas";
import { useRaven } from "@/hooks/shooter/useRaven";

const canvas = ref(null);
const { ctx, canvasWidth, canvasHeight } = useCanvas(canvas);

// raven
const { updateRaven, drawRaven } = useRaven(ctx, canvasWidth, canvasHeight);
const ravens = reactive([]);

// animate
const timeToNextRaven = ref(0);
const ravenInterval = ref(500);
const lastTime = ref(0);
const animate = (timeStamp) => {
  ctx.value.clearRect(0, 0, canvasWidth.value, canvasHeight.value);
  const deltaTime = ref(timeStamp - lastTime.value);
  lastTime.value = timeStamp;
  timeToNextRaven.value += deltaTime.value;
  if (timeToNextRaven.value > ravenInterval.value) {
    const { raven } = useRaven(ctx, canvasWidth, canvasHeight);
    ravens.push(raven);
  }
  updateRaven(raven);
  drawRaven(ctx, raven);
  requestAnimationFrame(animate);
};
onMounted(() => {
  animate(0);
});
</script>

<style land="scss" scoped>
canvas {
  display: block;
  /* border: 1px solid #000; */
}
</style>
