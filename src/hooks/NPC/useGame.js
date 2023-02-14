import { reactive } from "vue";
import { useEnemy } from "@/hooks/NPC/useEnemy";

export function useGame(ctx, canvasWidth, canvasHeight) {
  const { updateEnemy, drawEnemy } = useEnemy(ctx, canvasWidth, canvasHeight);

  const game = reactive({
    ctx: ctx.value,
    width: canvasWidth.value,
    height: canvasHeight.value,

    enemyTypes: ["ghost", "worm", "spider"],
    enemies: [],
    enemyInterval: 1000,
    enemyTimer: 0,

    update: updateGame,
    draw: drawGame,
  });

  function _addNewEmeny() {
    const randomEnemy = _getRandomEnemy();
    const { ghost, worm, spider } = useEnemy(ctx, canvasWidth, canvasHeight);
    if (randomEnemy === "spider") game.enemies.push(spider);
    else if (randomEnemy === "ghost") game.enemies.push(ghost);
    else if (randomEnemy === "worm") game.enemies.push(worm);
    game.enemies.sort((a, b) => a.y - b.y);
  }
  function _getRandomEnemy() {
    return game.enemyTypes[Math.floor(Math.random() * game.enemyTypes.length)];
  }

  function updateGame(deltaTime) {
    game.enemies = game.enemies.filter((enemy) => !enemy.markedForDeletion);

    if (game.enemyTimer > game.enemyInterval) {
      _addNewEmeny();
      game.enemyTimer = 0;
    } else {
      game.enemyTimer += deltaTime.value;
    }
    game.enemies.forEach((enemy) => updateEnemy(enemy, deltaTime));
  }

  function drawGame() {
    game.enemies.forEach(drawEnemy);
  }

  return {
    game,
  };
}
