import { ref, onMounted } from "vue";

export function useCanvas(canvas) {
  const ctx = ref(null);
  const canvasWidth = ref(1280);
  const canvasHeight = ref(800);

  onMounted(() => {
    canvas.value.width = canvasWidth.value;
    canvas.value.height = canvasHeight.value;
    ctx.value = canvas.value.getContext("2d");
  });

  return {
    ctx,
    canvasWidth,
    canvasHeight,
  };
}
