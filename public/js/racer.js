  function Controller(){
  "use strict";

  var $ = function(element) {
    return document.getElementById(element);
  };

  function Model(){

    function Player(playerName, keyCode){
      this.position = 0;
      this.score = 0;
      this.keyCode = keyCode;
      this.playerName = playerName;
      this.move = function() {
        this.position = this.position + 20
      };
      this.resetPosition = function() {
        this.position = 0
      };
    };

    this.resetAll = function(){
      for (var i = 0; i < this.players.length; i++) {
        var player = this.players[i]
        this.players[i].position = 0;
      }
    };

    this.getPlayerFor = function (keyCode) {
      for (var i=0; i<this.players.length; i++) {
        var player = this.players[i];
        if (player.keyCode === keyCode){
          return player
        }
      }
    }

    this.players = [new Player("sub1", 76), new Player("sub2", 65)];

    this.checkWinner = function() {
      for (var i=0; i < this.players.length; i++) {
        var player = this.players[i];
        if (player.position >= 600) {
          console.log("player score before" + player.score)
          player.score = player.score + 1
          console.log("player score after" + player.score)
          alert("Player " + player.playerName + " Wins!");
        }
      }
    };
  }

  function View(container){
     this.container = container;
     this.render = function(model){
      for (var i=0; i<model.players.length; i++) {
        var player = model.players[i];
        $(player.playerName).style.left = player.position + "px"
      }
    };
  }

  this.run = function(){
    document.addEventListener('keyup', this.keyupHandler.bind(this), false)
    document.getElementById("reset").addEventListener("click", this.resetAllHandler.bind(this));
    this.view.render(this.model);
  };

  this.keyupHandler = function(argument) {
    var player = this.model.getPlayerFor(argument.keyCode);
    if(player) {
      player.move();
      this.view.render(this.model);
      this.model.checkWinner();
    }
  };

  this.resetAllHandler = function() {
    this.model.resetAll();
    this.view.render(this.model);
  }

  this.model = new Model();
  this.view = new View($('board'));
}

(new Controller()).run();




