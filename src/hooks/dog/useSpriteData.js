import { ref } from "vue";

export function useSpriteData() {
  const spriteWidth = 575;
  const spriteHeight = 523;
  const spriteData = ref({});

  const animationStates = ref([
    { name: "idle", frames: 7 },
    { name: "jump", frames: 7 },
    { name: "fall", frames: 7 },
    { name: "run", frames: 9 },
    { name: "dizzy", frames: 11 },
    { name: "sit", frames: 5 },
    { name: "roll", frames: 7 },
    { name: "bit", frames: 7 },
    { name: "ko", frames: 12 },
    { name: "getHit", frames: 4 },
  ]);
  animationStates.value.forEach((state, idx) => {
    const frame = {
      loc: [],
    };

    for (let j = 0; j < state.frames; j++) {
      const posX = j * spriteWidth;
      const posY = idx * spriteHeight;
      frame.loc.push({
        x: posX,
        y: posY,
        width: spriteWidth,
        height: spriteHeight,
      });
    }
    spriteData.value[state.name] = frame;
  });
  return {
    spriteData,
    states: animationStates,
  };
}
