/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 - 2019 digitsensitive
 * @license      {@link https://github.com/digitsensitive/phaser3-typescript/blob/master/LICENSE.md | MIT License}
 */

import { Player } from "../objects/player";

export class MainScene extends Phaser.Scene {
  private phaserSprite: Phaser.GameObjects.Sprite;
  private platforms: Phaser.GameObjects.Image;
  private player: Player;

  constructor() {
    super({
      key: "MainScene"
    });
  }

  preload(): void {

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
      x: 20,
      y: 200,
      key: 'player'
    });

    this.physics.add.collider(this.player, this.platforms);
  }

  update(): void {


    if (this.player.active) {
      this.player.update();
    }

  }
  
}
