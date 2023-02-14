import { reactive } from "vue";
import { useImage } from "@/hooks/NPC/useImage";

export function useEnemy(ctx, canvasWidth, canvasHeight) {
  const { ghostImg, spiderImg, wormImg } = useImage();

  // WORM ===========================
  const worm = reactive({
    type: "worm",
    image: wormImg.image,
    spriteWidth: wormImg.spriteWidth,
    spriteHeight: wormImg.spriteHeight,
    width: wormImg.spriteWidth / 2,
    height: wormImg.spriteHeight / 2,
    x: canvasWidth.value,
    y: canvasHeight.value - wormImg.spriteHeight / 2,
    markedForDeletion: false,
    vx: Math.random() * 0.1 + 0.1,
    frameX: 0,
    maxFrames: wormImg.frames - 1,
    frameInterval: 100,
    frameTimer: 0,
  });
  // GHOST ===========================
  const ghost = reactive({
    type: "ghost",
    image: ghostImg.image,
    spriteWidth: ghostImg.spriteWidth,
    spriteHeight: ghostImg.spriteHeight,
    width: ghostImg.spriteWidth / 2,
    height: ghostImg.spriteHeight / 2,
    x: canvasWidth.value,
    y: Math.random() * canvasHeight.value * 0.6,
    markedForDeletion: false,
    vx: Math.random() * 0.2 + 0.1,
    angle: 0,
    curve: Math.random() * 3,
    opacity: 0.5,
    frameX: 0,
    maxFrames: ghostImg.frames - 1,
    frameInterval: 100,
    frameTimer: 0,
  });
  function _updateGhost(enemy) {
    enemy.y += Math.sin(enemy.angle) * enemy.curve;
    enemy.angle += 0.04;
  }
  function _drawGhost(enemy) {
    ctx.value.save();
    ctx.value.globalAlpha = enemy.opacity;
    _drawImage(enemy);
    ctx.value.restore();
  }
  // SPIDER ===========================
  const spider = reactive({
    type: "spider",
    image: spiderImg.image,
    spriteWidth: spiderImg.spriteWidth,
    spriteHeight: spiderImg.spriteHeight,
    width: spiderImg.spriteWidth / 2,
    height: spiderImg.spriteHeight / 2,
    x: Math.random() * canvasWidth.value,
    y: 0 - spiderImg.spriteHeight / 2,
    markedForDeletion: false,
    vx: 0,
    vy: Math.random() * 0.1 + 0.1,
    maxLength: Math.random() * canvasHeight.value,
    frameX: 0,
    maxFrames: spiderImg.frames - 1,
    frameInterval: 100,
    frameTimer: 0,
  });
  function _updateSpider(enemy, deltaTime) {
    if (enemy.y < 0 - enemy.height * 2) enemy.markedForDeletion = true;
    enemy.y += enemy.vy * deltaTime.value;
    if (enemy.y > enemy.maxLength) enemy.vy *= -1;
  }
  function _drawSpider(enemy) {
    ctx.value.beginPath();
    ctx.value.moveTo(enemy.x + enemy.width / 2, 0);
    ctx.value.lineTo(enemy.x + enemy.width / 2, enemy.y + 10);
    ctx.value.stroke();
    _drawImage(enemy);
  }

  function _drawImage(enemy) {
    ctx.value.drawImage(
      enemy.image,
      enemy.frameX * enemy.spriteWidth,
      0,
      enemy.spriteWidth,
      enemy.spriteHeight,
      enemy.x,
      enemy.y,
      enemy.width,
      enemy.height
    );
  }
  const updateEnemy = (enemy, deltaTime) => {
    enemy.x -= enemy.vx * deltaTime.value;
    if (enemy.type === "ghost") _updateGhost(enemy);
    if (enemy.type === "spider") _updateSpider(enemy, deltaTime);
    if (enemy.x < 0 - enemy.width) enemy.markedForDeletion = true;
    if (enemy.frameTimer > enemy.frameInterval) {
      if (enemy.frameX < enemy.maxFrames) enemy.frameX++;
      else enemy.frameX = 0;
      enemy.frameTimer = 0;
    } else {
      enemy.frameTimer += deltaTime.value;
    }
  };
  const drawEnemy = (enemy) => {
    if (enemy.type === "ghost") _drawGhost(enemy);
    if (enemy.type === "spider") _drawSpider(enemy);
    if (enemy.type === "worm") _drawImage(enemy);
  };

  return {
    worm,
    ghost,
    spider,
    updateEnemy,
    drawEnemy,
  };
}
