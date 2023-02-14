import { reactive } from "vue";
export function useRaven(ctx, canvasWidth, canvasHeight) {
  const raven = reactive({
    width: 100,
    height: 50,
    x: canvasWidth.value,
    directionX: Math.random() * 5 + 3,
    diractionY: Math.random() * 5 - 2.5,
  });
  raven.y = Math.random() * (canvasHeight.value - raven.height);

  function updateRaven(raven) {
    raven.x -= raven.directionX;
  }
  function drawRaven(ctx, raven) {
    ctx.value.fillRect(raven.x, raven.y, raven.width, raven.height);
  }

  return {
    raven,
    updateRaven,
    drawRaven,
  };
}
