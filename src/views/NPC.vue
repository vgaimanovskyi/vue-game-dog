<template>
  <div>
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useCanvas } from "@/hooks/useCanvas";
import { useGame } from "@/hooks/NPC/useGame";

const canvas = ref(null);
const { ctx, canvasWidth, canvasHeight } = useCanvas(canvas);

// game
const { game } = useGame(ctx, canvasWidth, canvasHeight);

// animate
let lastTime = ref(1);
const animate = (timeStamp) => {
  ctx.value.clearRect(0, 0, canvasWidth.value, canvasHeight.value);
  const deltaTime = ref(timeStamp - lastTime.value);
  lastTime.value = timeStamp;
  game.update(deltaTime);
  game.draw();
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
