import { reactive } from "vue";
import ghost from "@/assets/enemies/ghost.png";
import spider from "@/assets/enemies/spider.png";
import worm from "@/assets/enemies/worm.png";

export function useImage() {
  const ghostImg = reactive({
    image: new Image(),
    frames: 6,
  });
  ghostImg.image.src = ghost;
  ghostImg.spriteWidth = ghostImg.image.width / ghostImg.frames;
  ghostImg.spriteHeight = ghostImg.image.height;

  const spiderImg = reactive({
    image: new Image(),
    frames: 6,
  });
  spiderImg.image.src = spider;
  spiderImg.spriteWidth = spiderImg.image.width / spiderImg.frames;
  spiderImg.spriteHeight = spiderImg.image.height;

  const wormImg = reactive({
    image: new Image(),
    frames: 6,
  });
  wormImg.image.src = worm;
  wormImg.spriteWidth = wormImg.image.width / wormImg.frames;
  wormImg.spriteHeight = wormImg.image.height;

  return {
    ghostImg,
    spiderImg,
    wormImg,
  };
}
