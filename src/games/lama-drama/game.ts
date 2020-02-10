/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 - 2019 digitsensitive
 * @license      {@link https://github.com/digitsensitive/phaser3-typescript/blob/master/LICENSE.md | MIT License}
 */

import "phaser";
import { BootScene } from "./scenes/boot-scene";
import { GameScene } from "./scenes/game-scene";
import { MainMenuScene } from "./scenes/main-menu-scene";

// main game configuration
const config: Phaser.Types.Core.GameConfig = {
  title: "Lama Drama",
  url: "https://github.com/digitsensitive/phaser3-typescript",
  version: "0.01",
  width: 800,
  height: 600,
  type: Phaser.AUTO,
  parent: "game",
  scene: [BootScene, MainMenuScene, GameScene],
  input: {
    keyboard: true
  },
  physics: {
    default: 'matter',
    matter: {
        gravity: { y: 300 },
        debug: true
    }
  },
  backgroundColor: "#98d687",
  render: { pixelArt: true, antialias: false }
};

export class Game extends Phaser.Game {
  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);
  }
}

// when the page is loaded, create our game instance
window.addEventListener("load", () => {
  const game = new Game(config);
});
