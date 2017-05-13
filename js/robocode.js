var robocode;
var srcElement;

document.addEventListener("DOMContentLoaded", function(){
  robocode = new RoboCode();
  robocode.init();
}, false);

function RoboCode(){
  this.lines = [];
  this.commands = [];
  this.srcElement = null;
}

RoboCode.prototype.init = function () {
  this.lines = document.querySelectorAll("#mainProg li");
  this.commands = document.querySelectorAll("#pallete li");

  this.lines.forEach(function(line){
    line.addEventListener('dragstart', handleDragStart, false);
    line.addEventListener('dragenter', handleDragEnter, false);
    line.addEventListener('dragover', handleDragOver, false);
    line.addEventListener('dragleave', handleDragLeave, false);
    line.addEventListener('drop', handleDropInLine, false);
    line.addEventListener('dragend', handleDragEnd, false);
  });
  this.commands.forEach(function(comm){
    comm.addEventListener('dragstart', handleDragStart, false);
    comm.addEventListener('dragenter', handleDragEnter, false);
    comm.addEventListener('dragover', handleDragOver, false);
    comm.addEventListener('dragleave', handleDragLeave, false);
    comm.addEventListener('drop', handleDrop, false);
    comm.addEventListener('dragend', handleDragEnd, false);
  });

};

handleDragStart = function(e){
  this.style.opacity = 0.4;
  srcElement = this;
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', this.innerHTML);
}
handleDragOver = function(e){
  if (e.preventDefault) e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
  return false;
}
handleDragEnter = function(e){
  this.classList.add('over');
}
handleDragLeave = function(e){
  this.classList.remove('over');
}
handleDrop = function(e){
  if(this.stopPropagation) this.stopPropagation();
  if(srcElement!==this){

    srcElement.innerHTML = this.innerHTML;
    this.innerHTML = e.dataTransfer.getData("text/html");
  }
  return false;
}
handleDropInLine = function(e){
  if(this.stopPropagation) this.stopPropagation();
  if(srcElement!==this){
    this.innerHTML = e.dataTransfer.getData("text/html");
  }
  return false;
}

handleDragEnd = function(e){
  document.querySelectorAll("#mainProg li").forEach(function(comm){
    comm.classList.remove('over');
    comm.style.opacity = 1;
  });
  document.querySelectorAll("#pallete li").forEach(function(comm){
    comm.classList.remove('over');
    comm.style.opacity = 1;
  });
}
