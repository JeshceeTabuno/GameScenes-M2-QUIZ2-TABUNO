var config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 910,
    physics: {
      default: "arcade",
      arcade: {
        gravity: { y: 300 },
        debug: false,
      },
    },
    scene:[MenuScene, GameScene, CreditScene, EndScene]
  };

  var game = new Phaser.Game(config);

  function collectCoin(player, coin) {
    coin.disableBody(true, true);
    //Character changing color
    

    //  Add and update the scores
    score += 10;
    scoreText.setText("Score: " + score);

    collectCoins +=1;
    collectText.setText("Collected Coins: "+collectCoins);

    if (coins.countActive(true) === 0) {
      //  A new batch of coins to collect
      coins.children.iterate(function (child) {
        child.enableBody(true, child.x, 0, true, true);
      });
      //Bomb Creation
      var x =
        player.x < 400
          ? Phaser.Math.Between(400, 800)
          : Phaser.Math.Between(0, 400);

      var bomb = bombs.create(x, 16, "bomb");
      bomb.setBounce(1);
      bomb.setCollideWorldBounds(true);
      bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
      bomb.allowGravity = false;
    }
    //Set color everytime Sprite touches coins
    player.setTint(colors[colorIndex]);
    colorIndex++;
    if(colorIndex >= colors.length) colorIndex = 0;

    if (coins.countActive(true) === 0)
    {
        coins.children.iterate(function (child) {

            child.enableBody(true, child.x, 0, true, true);
        });
    }
}

 
  //Bomb hit function with Game over condition
  function hitBomb(player, bomb) {
    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play("turn");

 
    this.scene.start('EndScene', score, collectCoins);
    
  }
  

