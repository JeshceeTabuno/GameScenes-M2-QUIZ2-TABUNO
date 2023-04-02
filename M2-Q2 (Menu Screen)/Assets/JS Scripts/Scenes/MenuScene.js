class MenuScene extends Phaser.Scene{
    constructor(){
        super('MenuScene');
    }

   preload(){
    this.load.image("BG", "Assets/Images/CyberPunk.jpg");

    this.load.image("Play", "Assets/Images/StartButton.png");
    this.load.image("Credits", "Assets/Images/Credits.png");
    this.load.image("Exit", "Assets/Images/Exit.png");

   }

   create(){
    this.add.image(400, 300, "BG");

    let playButton = this.add.image(540,400, 'Play');
    playButton.setInteractive();
    playButton.on('pointerdown',() => {this.scene.start('GameScene')
    score = 0;
    collectCoins = 0;
});


    let creditButton = this.add.image(200,600, 'Credits').setScale(1);
    creditButton.setInteractive();
    creditButton.on('pointerdown',() => {this.scene.start('CreditScene')});

    let exitButton = this.add.image(850,600, 'Exit');
    exitButton.setInteractive();
    exitButton.on('pointerdown',() => {alert('THANK YOU FOR PLAYING!')});


   }
}