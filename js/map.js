function Map() {
  this.SIZE = 32;
  this.cells = [];
  this.assets = {};
  this.hero = new Sprite();
}

Map.prototype.load = function(map) {
  for (var i = 0; i < map.length; i++) {
    this.cells[i] = [];
    for (var j = 0; j < map[i].length; j++) {
      switch (map[i][j]) {
        case 9:
          this.cells[i][j] = 0;
          this.hero = new Sprite();
          this.hero.name = "Hero";
          this.hero.map = this;
          this.hero.moveTo(j, i);
          break;
        default:
          this.cells[i][j] = map[i][j];

      }
    }
  }
};

Map.prototype.draw = function(ctx) {
  for (var i = 0; i < this.cells.length; i++) {
    for (var j = 0; j < this.cells[i].length; j++) {
      switch (this.cells[i][j]) {
        case 0:
          //this.drawSquare(ctx,i,j,"darkgrey","black");
          this.drawTile(ctx, i, j, 5, 7, "floors");
          ctx.strokeStyle = "rgba(20,20,20,0.4)";
          ctx.strokeRect(j * this.SIZE, i * this.SIZE, this.SIZE, this.SIZE);
          break;
        case 1:
          //this.drawSquare(ctx,i,j,"lightgrey","darkgrey");
          this.drawTile(ctx, i, j, 8, 6, "floors");
          this.drawTile(ctx,i,j,0,3,"limits");
          //this.drawTile(ctx,i,j,0,9,"walls");
          break;
        case 2:
          //this.drawSquare(ctx,i,j,"lightgrey","darkgrey");
          this.drawTile(ctx, i, j, 6, 5, "floors");
          this.drawTile(ctx,i,j,0,0,"limits");
          break;
        case 3:
          //this.drawSquare(ctx,i,j,"lightgrey","darkgrey");
          this.drawTile(ctx, i, j, 8, 5, "floors");
          this.drawTile(ctx,i,j,2,2,"limits");
          //this.drawTile(ctx,i,j,7,8,"walls");
          break;
        case 4:
          //this.drawSquare(ctx,i,j,"lightgrey","darkgrey");
          this.drawTile(ctx, i, j, 6, 7, "floors");
          this.drawTile(ctx,i,j,1,4,"limits");
          //this.drawTile(ctx,i,j,2,8,"walls");
          break;
        case 5:
          this.drawTile(ctx, i, j, 5, 5, "floors");
          this.drawTile(ctx,i,j,2,1,"limits");
          //this.drawTile(ctx,i,j,7,9,"walls");
          break;
        case 6:
          this.drawTile(ctx, i, j, 7, 5, "floors");
          this.drawTile(ctx,i,j,1,1,"limits");
          break;
        case 7:
          this.drawTile(ctx, i, j, 7, 6, "floors");
          this.drawTile(ctx,i,j,1,0,"limits");
          break;
        case 8:
          this.drawTile(ctx, i, j, 5, 6, "floors");
          this.drawTile(ctx,i,j,2,0,"limits");
          break;
        case 10:
          this.drawTile(ctx, i, j, 2, 1, "walls");
          this.drawTile(ctx, i, j, 0, 5, "walls");
          break;
        case 11:
          this.drawTile(ctx, i, j, 2, 1, "walls");
          this.drawTile(ctx, i, j, 0, 1, "walls");
          break;
        case 12:
          this.drawTile(ctx, i, j, 2, 1, "walls");
          this.drawTile(ctx, i, j, 0, 0, "walls");
          break;

        default:

      }
    }
  }
  //this.hero.drawAsCircle(ctx);
  this.hero.drawAsImage(ctx, this.assets["soldier"]);
};

Map.prototype.drawSquare = function(ctx, i, j, bg, st) {
  ctx.strokeStyle = st;
  ctx.fillStyle = bg;
  ctx.fillRect(j * this.SIZE, i * this.SIZE, this.SIZE, this.SIZE);
  ctx.strokeRect(j * this.SIZE, i * this.SIZE, this.SIZE, this.SIZE);
}

Map.prototype.drawTile = function(ctx, i, j, ki, kj, key) {
  ctx.drawImage(this.assets[key],
    ki * 32, kj * 32, 32, 32,
    j * this.SIZE, i * this.SIZE, this.SIZE, this.SIZE);
}


Map.prototype.loadImage = function(key, url) {
  this.assets[key] = new Image();
  this.assets[key].src = url;
}
