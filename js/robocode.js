var robocode;
var srcElement;

document.addEventListener("DOMContentLoaded", function(){
  robocode = new RoboCode();
  robocode.init();
}, false);

function RoboCode(){
  this.srcElement = null;
}

RoboCode.prototype.init = function () {
  this.commands = document.querySelectorAll(".command");

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
  console.log("handleDragStart"+this);
  this.style.opacity = 0.4;
  srcElement = this;
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', this.innerHTML);
}
handleDragOver = function(e){
  console.log("handleDragOver");
  if (e.preventDefault) e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
  return false;
}
handleDragEnter = function(e){
  console.log("handleDragEnter");
  this.classList.add('over');
}
handleDragLeave = function(e){
  console.log("handleDragLeave");
  this.classList.remove('over');
}
handleDrop = function(e){
  console.log("handleDrop");
  if(this.stopPropagation) this.stopPropagation();
  if(srcElement!==this){

    srcElement.innerHTML = this.innerHTML;
    this.innerHTML = e.dataTransfer.getData("text/html");
  }
  return false;
}

handleDragEnd = function(e){
  console.log("handleDragEnd");
  document.querySelectorAll(".command").forEach(function(comm){
    comm.classList.remove('over');
    comm.style.opacity = 1;
  });
}
