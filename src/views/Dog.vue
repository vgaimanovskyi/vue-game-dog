<template>
  <div>
    <div class="controls">
      <label for="animation"> Choose Animation:</label>
      <select id="animation" v-model="select">
        <option
          v-for="state in states"
          :key="`state-${state.name}`"
          :value="state.name"
          v-html="state.name"
        ></option>
      </select>
    </div>
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useCanvas } from "@/hooks/useCanvas";
import { useImage } from "@/hooks/dog/useImage";
import { useSpriteData } from "@/hooks/dog/useSpriteData";
import { useAnimation } from "@/hooks/dog/useAnimation";

const canvas = ref(null);
const { ctx, canvasWidth, canvasHeight } = useCanvas(canvas);
const { playerImage } = useImage();
const { spriteData, states } = useSpriteData();
const select = ref(states.value[0].name);
const spriteState = computed(() => spriteData.value[select.value]);

useAnimation(ctx, canvasWidth, canvasHeight, playerImage, spriteState);
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
}
.controls,
select,
option {
  font-size: 25px;
}
</style>
