/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 - 2019 digitsensitive
 * @description  Flappy Bird: Boot Scene
 * @license      Digitsensitive
 */


export class BootScene extends Phaser.Scene {

  constructor() {
    super({
      key: "BootScene"
    });
  }

  preload(): void {
    console.log('boot-scene');
  }

  update(): void {
    this.scene.start("MainMenuScene");
  }

}