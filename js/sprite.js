function Sprite() {
  this.map = null;
  this.x = 0;
  this.y = 0;
  this.radius = 8;
  this.color = "blue";
}

Sprite.prototype.moveTo = function (x,y) {
  this.x = (0.5+x)*this.map.SIZE;
  this.y = (0.5+y)*this.map.SIZE;
};

Sprite.prototype.drawAsCircle = function (ctx) {
  ctx.fillStyle = this.color;
  ctx.strokeStyle = "black";
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI,false);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
};
