/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 - 2019 digitsensitive
 * @description  Flappy Bird: Boot Scene
 * @license      Digitsensitive
 */


export class MainMenuScene extends Phaser.Scene {

  constructor() {
    super({
      key: "MainMenuScene"
    });
  }

  create(): void {
    console.log('main-menus');
  }

  update(): void {
    this.scene.start("GameScene");
  }

}