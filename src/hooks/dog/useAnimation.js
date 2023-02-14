import { onMounted } from "vue";

export function useAnimation(
  ctx,
  canvasWidth,
  canvasHeight,
  playerImage,
  spriteState
) {
  let gameFrame = 0;
  const straggerFrames = 5; // speed animation

  const animate = () => {
    ctx.value.clearRect(0, 0, canvasWidth.value, canvasHeight.value);
    const position =
      Math.floor(gameFrame / straggerFrames) % spriteState.value.loc.length;
    const frameWidth = spriteState.value.loc[position].width;
    const frameHeight = spriteState.value.loc[position].height;
    const frameX = frameWidth * position;
    const frameY = spriteState.value.loc[position].y;

    ctx.value.drawImage(
      playerImage.value,
      frameX,
      frameY,
      frameWidth,
      frameHeight,
      0,
      0,
      frameWidth,
      frameHeight
    );
    gameFrame++;
    requestAnimationFrame(animate);
  };
  onMounted(animate);
}
