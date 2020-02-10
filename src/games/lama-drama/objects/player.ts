import { Spit } from "./spit";

export class Player extends Phaser.GameObjects.Sprite {
  body!: Phaser.Physics.Arcade.Body;
  private spits: Phaser.GameObjects.Group;
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private lastShoot: number;
  private shootingKey: Phaser.Input.Keyboard.Key;
  public getSpits(): Phaser.GameObjects.Group {
    return this.spits;
  }
  constructor(params) {
    super(params.scene, params.x, params.y, params.key);

    this.initVariables();
    this.initImage();
    this.initInput();
    this.initPhysics();

    this.scene.add.existing(this);
  }

  private initVariables(): void {
    this.spits = this.scene.add.group({
      runChildUpdate: true
    });
    this.lastShoot = 0;
  }

  private initImage(): void {
    
  }

  private initInput(): void {
    this.cursors = this.scene.input.keyboard.createCursorKeys();
    this.shootingKey = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
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
      this.cursors.right.isDown &&
      this.x < this.scene.sys.canvas.width - this.width / 2
    ) {
      this.flipX = false;
      this.body.setVelocityX(100);
    } else if (this.cursors.left.isDown && this.x > this.width / 2) {
      this.flipX = true;
      this.body.setVelocityX(-100);
    } else {
      this.body.setVelocityX(0);
    }
  }

  private handleShooting(): void {
    if (this.shootingKey.isDown && this.scene.time.now > this.lastShoot) {
      if (this.spits.getLength() < 1) {
        this.spits.add(
          new Spit({
            scene: this.scene,
            x: this.x + 20,
            y: this.y - 30,
            key: "spit",
            direction: (this.flipX) ? 1 : -1,
            spitProperties: {
              speed: -500
            }
          })
        );

        this.lastShoot = this.scene.time.now + 500;
      }
    }
  }

  public dying(): void {
    this.destroy();
  }

}
