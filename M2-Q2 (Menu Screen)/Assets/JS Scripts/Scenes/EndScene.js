
class EndScene extends Phaser.Scene{
    constructor(){
        super('EndScene');
    }

    preload(){
        this.load.image("Restart", "Assets/Images/Restart.png");
        this.load.image("back", "Assets/Images/BackButton.png");
        this.load.image("BGE", "Assets/Images/CyberPunk.jpg");

    }

    create(){
        this.add.image(400,400, 'BGE');

        let gameOverText = this.add.text(350,200, 'GAME OVER!',{font: '50px Arial', fill: "Red"});
    gameOverText.setInteractive({userHandCursor: true});

        let restartButton = this.add.image(500,450, 'Restart').setScale(1);
        restartButton.setInteractive();
        restartButton.on('pointerdown',() => {this.scene.start('GameScene')});

        

        let backButton = this.add.image(150,600, 'back').setScale(1);
        backButton.setInteractive();
        backButton.on('pointerdown',() => {this.scene.start('MenuScene')});
    }
       
}