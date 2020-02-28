/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 - 2019 digitsensitive
 * @license      {@link https://github.com/digitsensitive/phaser3-typescript/blob/master/LICENSE.md | MIT License}
 */

import { Player } from "../objects/player";
import { Enemy } from "../objects/enemy";
import { CONST } from "../const/const";

export class GameScene extends Phaser.Scene {
  private phaserSprite: Phaser.GameObjects.Sprite;
  private enemies: Phaser.GameObjects.Group;
  private platforms: Phaser.GameObjects.Image;
  private player: Player;
  private restartKey: Phaser.Input.Keyboard.Key;
  private score: number;
  private highestScore: number;
  private resultText: Phaser.GameObjects.Text;
  private gameOverText: Phaser.GameObjects.Text;
  private highestScoreText: Phaser.GameObjects.Text;
  

  constructor() {
    super({
      key: "GameScene"
    });
  }

  init(): void {
    this.enemies = this.add.group({ runChildUpdate: true });

    this.restartKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.ESC
    );
  }

  preload(): void {

    console.log('gameScene');

    this.load.image('ground', './src/games/lama-drama/assets/platform.png');

    // load out package
    this.load.pack(
      "preload",
      "./src/games/lama-drama/assets/pack.json",
      "preload"
    );

  }

  create(): void {

    this.score = CONST.SCORE;
    let scoreSaved = localStorage.getItem('highest');
    this.highestScore = (scoreSaved) ? parseInt(scoreSaved) : 0;

    var resultText: string = 'Score: ' + this.score;
    this.resultText = this.add.text(20, 20, resultText,
      { font: '35px Arial Bold', fill: '#FBFBAC' });
    this.resultText.setScrollFactor(0, 0);

    var highestScoreText: string = 'Highest: ' + this.highestScore;
    this.highestScoreText = this.add.text(600, 20, highestScoreText,
      { font: '35px Arial Bold', fill: '#FBFBAC' });
    this.highestScoreText.setScrollFactor(0, 0);

    this.platforms = this.physics.add.staticImage(400, 568, 'ground').setScale(2).refreshBody();

    this.player = new Player({
      scene: this,
      x: 50,
      y: this.scene.systems.canvas.height -200,
      key: 'player'
    });

    this.createEnemy();
    this.time.addEvent({ delay: 3000, callback: this.createEnemy, callbackScope: this, repeat: 4});

    this.physics.add.collider(this.enemies, this.platforms);
    this.physics.add.collider(this.player, this.platforms);

    this.cameras.main.setBounds(0, 0, 1920 * 2, 1080 * 2);
    this.cameras.main.startFollow(this.player, true, 0.05, 0.05);
    
  }

  update(): void {

    if (this.player.active) {
      this.player.update();

      this.enemies.children.each((enemy: Enemy) => {
        enemy.update();
        this.physics.overlap(
          enemy,
          this.player,
          this.enemyHitPlayer,
          null,
          this
        );
      }, this);

      this.checkCollisions();
    }

    if (this.restartKey.isDown) {
      this.updateScore(0);
      this.scene.restart();
    }

  }

  private checkCollisions(): void {
    this.physics.overlap(
      this.player.getSpits(),
      this.enemies,
      this.bulletHitEnemy,
      null,
      this
    );
  }

  private createEnemy(): void{
    this.enemies.add(
      new Enemy({
        scene: this,
        player: this.player,
        x: this.scene.systems.canvas.width + 100,
        y: 400,
        key: 'coyote'
      })
    );
  }

  private bulletHitEnemy(spit, enemy): void {
    this.updateScore(CONST.ENEMYPOINTS);
    spit.destroy();
    enemy.destroy();
  }

  private enemyHitPlayer(enemy, player): void {

    var gameOverText: string = 'GAME OVER.. Try again [ESC]';
    this.gameOverText = this.add.text(200, 300, gameOverText,
      { font: '30px Arial Bold', fill: '#1a1a1a' });

    player.destroy();
  }

  private updateScore(score: number) {
    this.score += score;
    CONST.SCORE = score;
    this.resultText.setText("Score: " + this.score);

    if(this.score > this.highestScore){
      this.highestScore = this.score;
      this.highestScoreText.setText("Highest: " + this.score.toString());
      localStorage.setItem('highest', this.score.toString());
    }

  }

}
