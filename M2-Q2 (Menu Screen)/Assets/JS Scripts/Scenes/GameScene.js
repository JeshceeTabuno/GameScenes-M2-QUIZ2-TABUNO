//Interactable Objects
var player;
var coins;
var bombs;

//Overworld
var platforms;

//Mouse Cursors
var cursors;

//Text Collections
var score = 0;
var scoreText;
var collectText;
var collectCoins = 0;

//Color Variables.
var colors = [0xFF0000, 0xFF8F00, 0xF7FF00, 0x0AE936, 0x0A62E9, 0x2615D1, 0xAA32DE];
var colorIndex = 0;

class GameScene extends Phaser.Scene{ 

  constructor(){
    super('GameScene');
}

preload(){
  this.load.image("bg", "Assets/Images/CyberPunk.jpg");
  this.load.image("ground", "Assets/Images/Platform.png");
  this.load.image("coin", "Assets/Images/Coin.png");
  this.load.image("bomb", "Assets/Images/bomb.png");
  this.load.spritesheet("dude", "Assets/Images/Character sheet.png", {
      frameWidth: 32,
      frameHeight: 48,
    });
}

create(){
  this.add.image(400, 300, "bg");

  //  The platforms 
  platforms = this.physics.add.staticGroup();

  //Create Platforms
 //Scaling
  platforms.create(400, 650, "ground").setScale(3).refreshBody();

  // Create some ledges
  platforms.create(600, 240, "ground");
  platforms.create(150, 360, "ground");
  platforms.create(700, 450, "ground");
 

  // The player and its settings
  player = this.physics.add.sprite(200, 450, "dude");

  //  Player physics properties. Giving the sprite a slight bounce.
  player.setBounce(0.2);
  player.setCollideWorldBounds(true);

  //  The player animations, turning, walking left and walking right.
  this.anims.create({
    key: "left",
    frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "turn",
    frames: [{ key: "dude", frame: 4 }],
    frameRate: 20,
  });

  this.anims.create({
    key: "right",
    frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1,
  });

  //  Input Events
  cursors = this.input.keyboard.createCursorKeys();

  //  Some coins to collect
  coins = this.physics.add.group({
    key: "coin",
    repeat: 13,
    setXY: { x: 12, y: 0, stepX: 70 },
  });

  coins.children.iterate(function (child) {
    //  Give each Coin a slightly different bounce
    child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
  });

  bombs = this.physics.add.group();

  //  The score
  scoreText = this.add.text(16, 16, "Score: 0", {
    fontSize: "32px",
    fill: "#070707",
  });

  //Collected Coins
  collectText = this.add.text(600, 16, "Collected Coins: 0", {
    fontSize: "32px",
    fill: "#070707",
  });


  //  Collide the player and the coins  with the platforms
  this.physics.add.collider(player, platforms);
  this.physics.add.collider(coins, platforms);
  this.physics.add.collider(bombs, platforms);

  //  Checks to see if the player overlaps with any of the coins.
  this.physics.add.overlap(player, coins, collectCoin, null, this);

  this.physics.add.collider(player, bombs, hitBomb, null, this);
}

update() {
 
  if (cursors.left.isDown) {
    player.setVelocityX(-160);

    player.anims.play("left", true);
  } else if (cursors.right.isDown) {
    player.setVelocityX(160);

    player.anims.play("right", true);
  } else {
    player.setVelocityX(0);

    player.anims.play("turn");
  }

  if (cursors.up.isDown && player.body.touching.down) {
    player.setVelocityY(-330);
  }
}

}
