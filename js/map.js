function Map() {
  this.SIZE = 32;
  this.cells = [];
  this.hero = new Sprite();
}

Map.prototype.load = function(map) {
  for (var i = 0; i < map.length; i++) {
    this.cells[i] = [];
    for (var j = 0; j < map[i].length; j++) {
      switch (map[i][j]) {
        case 0:
        case 1:
          this.cells[i][j] = map[i][j];
          break;
        case 2:
          this.cells[i][j] = 0;
          this.hero = new Sprite();
          this.hero.name = "Hero";
          this.hero.map = this;
          this.hero.moveTo(j,i);
          break;
        default:

      }
    }
  }
};

Map.prototype.draw = function (ctx) {
  for (var i = 0; i < this.cells.length; i++) {
    for (var j = 0; j < this.cells[i].length; j++) {
      switch (this.cells[i][j]) {
        case 0:
            ctx.strokeStyle = "black";
            ctx.fillStyle = "darkgrey";
            ctx.fillRect(j*this.SIZE,i*this.SIZE, this.SIZE, this.SIZE);
            ctx.strokeRect(j*this.SIZE,i*this.SIZE, this.SIZE, this.SIZE);
          break;
        case 1:
            ctx.strokeStyle = "darkgrey";
            ctx.fillStyle = "lightgrey";
            ctx.fillRect(j*this.SIZE,i*this.SIZE, this.SIZE, this.SIZE);
            ctx.strokeRect(j*this.SIZE,i*this.SIZE, this.SIZE, this.SIZE);
          break;
        default:

      }
    }
  }
  this.hero.drawAsCircle(ctx);
};
