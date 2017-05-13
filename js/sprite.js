function Sprite() {
  this.name = "Unknown";
  this.direction = 0;
  this.map = null;
  this.x = 0;
  this.y = 0;
  this.radius = 12;
  this.color = "blue";
}

Sprite.prototype.moveTo = function(x, y) {
  this.x = (0.5 + x) * this.map.SIZE;
  this.y = (0.5 + y) * this.map.SIZE;
};

Sprite.prototype.drawAsCircle = function(ctx) {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
  ctx.closePath();
  ctx.fillStyle = this.color;
  ctx.fill();
  ctx.strokeStyle = "black";
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(this.x, this.y);
  ctx.arc(this.x, this.y, this.radius, this.direction * Math.PI / 2 - Math.PI / 12, this.direction * Math.PI / 2 + Math.PI / 12, false);
  ctx.closePath();
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.stroke();
};

Sprite.prototype.forward = function(n) {
  n = n || 1;
  switch (this.direction) {
    case 0:
      this.x = this.x + this.map.SIZE;
      break;
    case 1:
      this.y = this.y + this.map.SIZE;
      break;
    case 2:
      this.x = this.x - this.map.SIZE;
      break;
    case 3:
      this.y = this.y - this.map.SIZE;
      break;
  }
};

Sprite.prototype.turn = function(s) {
  s = s || 1;
  this.direction += s;
  if(this.direction>3) this.direction -= 4;
  if(this.direction<0) this.direction += 4;
};

Sprite.prototype.say = function(s) {
  console.log(this.name + ": " + s);
};

Sprite.prototype.drawAsImage = function(ctx, img) {
  ctx.drawImage(img,
    0 * 64, (3-this.direction) * 64, 64, 64,
    this.x-32, this.y-54, 64, 64);
};
