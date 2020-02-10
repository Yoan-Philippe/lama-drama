/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 - 2019 digitsensitive
 * @description  Space Invaders: Player
 * @license      Digitsensitive
 */

export class Player extends Phaser.GameObjects.Sprite {
  body!: Phaser.Physics.Arcade.Body;
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  constructor(params) {
    super(params.scene, params.x, params.y, params.key);

    this.initVariables();
    this.initImage();
    this.initInput();
    this.initPhysics();

    this.scene.add.existing(this);
  }

  private initVariables(): void {

  }

  private initImage(): void {

  }

  private initInput(): void {
    this.cursors = this.scene.input.keyboard.createCursorKeys();
  }

  private initPhysics(): void {
    this.scene.physics.world.enable(this);
    this.setSize(0.8,0.3);
    this.setScale(0.5, 0.5);

  };

  update(): void {
    this.handleMovement();
  }

  private handleMovement(): void {
    if (
      this.cursors.right.isDown &&
      this.x < this.scene.sys.canvas.width - this.width / 2
    ) {
      this.body.setVelocityX(100);
    } else if (this.cursors.left.isDown && this.x > this.width / 2) {
      this.body.setVelocityX(-100);
    } else {
      this.body.setVelocityX(0);
    }
  }

}
