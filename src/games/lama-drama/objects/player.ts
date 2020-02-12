import { Spit } from "./spit";

export class Player extends Phaser.GameObjects.Sprite {
  body!: Phaser.Physics.Arcade.Body;
  private spits: Phaser.GameObjects.Group;
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private lastShoot: number;
  private speed: number;
  private anglePointer : number;
  public getSpits(): Phaser.GameObjects.Group {
    return this.spits;
  }
  constructor(params) {
    super(params.scene, params.x, params.y, params.key);

    this.initVariables();
    this.initInput();
    this.initPhysics();

    this.scene.add.existing(this);
  }

  private initVariables(): void {
    this.spits = this.scene.add.group({
      runChildUpdate: true
    });
    this.lastShoot = 0;
    this.speed = 200;
    this.anglePointer = 0;
  }

  private initInput(): void {
    this.cursors = this.scene.input.keyboard.addKeys(
      {up:Phaser.Input.Keyboard.KeyCodes.W,
      down:Phaser.Input.Keyboard.KeyCodes.S,
      left:Phaser.Input.Keyboard.KeyCodes.A,
      right:Phaser.Input.Keyboard.KeyCodes.D});
  }

  private initPhysics(): void {
    this.scene.physics.world.enable(this);
    this.setSize(0.8,0.3);
  };

  update(): void {
    this.handleMovement();
    this.handleShooting();
  }

  private handleMovement(): void {
    if (
      this.cursors.right.isDown /*&&
      this.x < this.scene.sys.canvas.width - this.width / 2*/
    ) {
      this.flipX = false;
      this.body.setVelocityX(this.speed);
    } else if (this.cursors.left.isDown /*&& this.x > this.width / 2*/) {
      this.flipX = true;
      this.body.setVelocityX(-this.speed);
    } else {
      this.body.setVelocityX(0);
    }

    if (this.cursors.up.isDown && this.y > 300) {
      this.body.setVelocityY(-200);
    }
  }

  private handleShooting(): void {

    // Calculate angle from pointer
    this.scene.input.on('pointermove', function (pointer) {
      this.anglePointer = Phaser.Math.Angle.BetweenPoints(this, pointer);
    }, this);

    // Shoot spit on click
    this.scene.input.on('pointerup', function () {

      if (this.active && this.scene.time.now > this.lastShoot) {
          this.spits.add(
            new Spit({
              scene: this.scene,
              x: this.x + 20,
              y: this.y - 30,
              key: "spit",
              direction: (this.flipX) ? 1 : -1,
              anglePointer : this.anglePointer,
              spitProperties: {
                speed: -500
              }
            })
          );
          this.lastShoot = this.scene.time.now + 500;
      }
    }, this);
  }

}
