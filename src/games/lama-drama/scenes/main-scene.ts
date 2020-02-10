/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 - 2019 digitsensitive
 * @license      {@link https://github.com/digitsensitive/phaser3-typescript/blob/master/LICENSE.md | MIT License}
 */

export class MainScene extends Phaser.Scene {
  private phaserSprite: Phaser.GameObjects.Sprite;
  private scoreText: Phaser.GameObjects.Text;

  constructor() {
    super({
      key: "MainScene"
    });
  }

  preload(): void {
    this.load.image("myImage", "./src/games/lama-drama/assets/phaser.png");
  }

  create(): void {
    this.phaserSprite = this.add.sprite(400, 300, "myImage");
    this.scoreText = this.add.text(16, 16, 'LAMA DRAMA', { fontSize: '32px', fill: '#fff' });
  }
}
