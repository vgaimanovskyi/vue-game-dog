import { ref } from "vue";
import sprite from "@/assets/sprite.png";

export function useImage() {
  const playerImage = ref(new Image());
  playerImage.value.src = sprite;

  return {
    playerImage,
  };
}
