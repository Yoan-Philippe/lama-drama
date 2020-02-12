/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 - 2019 digitsensitive
 * @license      {@link https://github.com/digitsensitive/phaser3-typescript/blob/master/LICENSE.md | MIT License}
 */

import { Player } from "../objects/player";
import { Enemy } from "../objects/enemy";

export class GameScene extends Phaser.Scene {
  private phaserSprite: Phaser.GameObjects.Sprite;
  private enemies: Phaser.GameObjects.Group;
  private platforms: Phaser.GameObjects.Image;
  private player: Player;
  private restartKey: Phaser.Input.Keyboard.Key;

  constructor() {
    super({
      key: "GameScene"
    });
  }

  init(): void {
    this.enemies = this.add.group({ runChildUpdate: true });

    this.restartKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
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
    spit.destroy();
    enemy.destroy();
  }

  private enemyHitPlayer(enemy, player): void {
    player.destroy();
  }

}
