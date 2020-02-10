/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 - 2019 digitsensitive
 * @license      {@link https://github.com/digitsensitive/phaser3-typescript/blob/master/LICENSE.md | MIT License}
 */

export class MainScene extends Phaser.Scene {
  private phaserSprite: Phaser.GameObjects.Sprite;
  private scoreText: Phaser.GameObjects.Text;
  private platforms: Phaser.GameObjects.Image;

  constructor() {
    super({
      key: "MainScene"
    });
  }

  preload(): void {
    this.load.image("myImage", "./src/games/lama-drama/assets/phaser.png");
    this.load.image('ground', './src/games/lama-drama/assets/platform.png');
  }

  create(): void {
    this.phaserSprite = this.physics.add.sprite(400, 300, 'myImage');

    this.platforms = this.physics.add.staticImage(400, 568, 'ground').setScale(2).refreshBody();

    this.physics.add.collider(this.phaserSprite, this.platforms);

    this.scoreText = this.add.text(16, 16, 'LAMA DRAMA', { fontSize: '32px', fill: '#fff' });
  }
}
