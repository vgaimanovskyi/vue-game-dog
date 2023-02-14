class Layer {
  constructor(image, speedModifier) {
    this.x = 0;
    this.y = 0;
    this.image = image;
    this.width = image.width;
    this.height = image.height;
    this.speedModifier = speedModifier;
  }
  update(gameSpeed) {
    const speed = gameSpeed * this.speedModifier;
    if (this.x <= -this.width) this.x = 0;
    this.x = Math.floor(this.x - speed);
  }
  draw(ctx) {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx.drawImage(
      this.image,
      this.x + this.width,
      this.y,
      this.width,
      this.height
    );
  }
}

export function buildLayer(image, speedModifier) {
  return new Layer(image, speedModifier);
}
