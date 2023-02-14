<template>
  <div>
    <div class="controls">
      <div>Speed:{{ gameSpeed }}</div>
      <input
        type="range"
        class="range"
        ref="range"
        min="0"
        max="50"
        v-model="gameSpeed"
      />
    </div>
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useCanvas } from "@/hooks/useCanvas";
import { buildLayer } from "@/hooks/layers/buildLayer";

const canvas = ref(null);
const { ctx, canvasWidth, canvasHeight } = useCanvas(canvas);

// initLayersImages
const layers = ref([]);
const initLayersImages = () => {
  for (let i = 1; i <= 5; i++) {
    const bgLayer = new Image();
    bgLayer.src = require(`@/assets/layers/layer-${i}.png`);
    const layer = buildLayer(bgLayer, (i / 10) * 0.5);
    layers.value.push(layer);
  }
};
onMounted(initLayersImages);

// animate
const gameSpeed = ref(20);
const animate = () => {
  ctx.value.clearRect(0, 0, canvasWidth.value, canvasHeight.value);
  layers.value.forEach((layer) => {
    layer.update(gameSpeed.value);
    layer.draw(ctx.value);
  });
  requestAnimationFrame(animate);
};
onMounted(animate);
</script>

<style land="scss" scoped>
canvas {
  display: block;
  /* border: 1px solid #000; */
}
.controls {
  position: absolute;
  top: 10px;
  left: 10px;

  color: #000;
  text-align: left;
}
.range {
  width: 400px;
}
</style>
