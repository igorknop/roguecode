var roguecode;
var srcElement;

document.addEventListener("DOMContentLoaded", function() {
  roguecode = new RogueCode();
  roguecode.init();
  roguecode.setStatus("Stopped");
  roguecode.draw();
  var status = document.getElementsByTagName("span")[0];
  document.getElementById("play").addEventListener("click", function() {
    roguecode.parse();
    roguecode.setStatus("Running");
    roguecode.elements.timer = setInterval(function() {
      roguecode.elements.lines[roguecode.pc].classList.remove("active");
      k = roguecode.execute();
      roguecode.elements.lines[roguecode.pc].classList.add("active");
      roguecode.step();
    }, 1000);
  });
  document.getElementById("pause").addEventListener("click", function() {
    roguecode.setStatus("Paused");
    clearInterval(roguecode.elements.timer);
  });
  document.getElementById("stop").addEventListener("click", function() {
    roguecode.pc = 0;
    roguecode.setStatus("Stopped");
    document.querySelectorAll(".active").forEach(function(e) {
      e.classList.remove("active");
    });

    clearInterval(roguecode.elements.timer);
  });
}, false);

function RogueCode() {
  this.elements = {};
  this.elements.commands = [];
  this.elements.lines = [];
  this.elements.timer = null;
  this.status = "Stopped";
  this.srcElement = null;
  this.pc = 0;
  this.commands = [];
}

RogueCode.prototype.init = function() {
  this.elements.lines = document.querySelectorAll("#mainProg li");
  this.elements.commands = document.querySelectorAll("#pallete li");
  this.canvas = document.querySelectorAll("canvas")[0];
  this.ctx = this.canvas.getContext("2d");
  this.map = new Map();
  this.map.load([
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ]);

  this.elements.lines.forEach(function(line) {
    line.addEventListener('dragstart', handleDragStart, false);
    line.addEventListener('dragenter', handleDragEnter, false);
    line.addEventListener('dragover', handleDragOver, false);
    line.addEventListener('dragleave', handleDragLeave, false);
    line.addEventListener('drop', handleDropInLine, false);
    line.addEventListener('dragend', handleDragEnd, false);
  });
  this.elements.commands.forEach(function(comm) {
    comm.addEventListener('dragstart', handleDragStart, false);
    comm.addEventListener('dragenter', handleDragEnter, false);
    comm.addEventListener('dragover', handleDragOver, false);
    comm.addEventListener('dragleave', handleDragLeave, false);
    comm.addEventListener('drop', handleDrop, false);
    comm.addEventListener('dragend', handleDragEnd, false);
  });

};

RogueCode.prototype.draw = function() {
  this.fillStyle = "black";
  this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  this.map.draw(this.ctx);
};

RogueCode.prototype.step = function(t) {
  dt = t - this.previous;
  this.draw();
  this.previous = t;
};

RogueCode.prototype.setStatus = function(newStatus) {
  this.status = newStatus;
  document.getElementById("status").innerHTML = this.status;
}

RogueCode.prototype.parse = function() {
  this.commands = [];
  for (var i = 1; i < this.elements.lines.length - 1; i++) {
    var text = this.elements.lines[i].innerText;
    if (text == "forward();") {
      this.commands.push("FWD");
    } else if (text == "turnClockWise();") {
      this.commands.push("CW");
    } else if (text == "turnCounterClockWise();") {
      this.commands.push("CCW");
    } else if (t = text.match(/say\("([^"]*)"\);/)) {
      this.commands.push("S" + t[1]);
    }
  }
};

RogueCode.prototype.execute = function() {
  if (this.commands[this.pc]) {
    var command = this.commands[this.pc];
    if (command == "FWD") {
      this.map.hero.forward();
      return this.pc++;
    } else if (command == "CW") {
      this.map.hero.turn(1);
      return this.pc++;
    } else if (command == "CCW") {
      this.map.hero.turn(-1);
      return this.pc++;
    } else if (command[0] == "S") {
      this.map.hero.say(command.substring(1));
      return this.pc++;
    }
  }
};

handleDragStart = function(e) {
  this.style.opacity = 0.4;
  srcElement = this;
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', this.innerHTML);
}
handleDragOver = function(e) {
  if (e.preventDefault) e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
  return false;
}
handleDragEnter = function(e) {
  this.classList.add('over');
}
handleDragLeave = function(e) {
  this.classList.remove('over');
}
handleDrop = function(e) {
  if (this.stopPropagation) this.stopPropagation();
  if (srcElement !== this) {

    srcElement.innerHTML = this.innerHTML;
    this.innerHTML = e.dataTransfer.getData("text/html");
  }
  return false;
}
handleDropInLine = function(e) {
  if (this.stopPropagation) this.stopPropagation();
  if (srcElement !== this) {
    this.innerHTML = e.dataTransfer.getData("text/html");
  }
  return false;
}

handleDragEnd = function(e) {
  document.querySelectorAll("#mainProg li").forEach(function(comm) {
    comm.classList.remove('over');
    comm.style.opacity = 1;
  });
  document.querySelectorAll("#pallete li").forEach(function(comm) {
    comm.classList.remove('over');
    comm.style.opacity = 1;
  });
}
