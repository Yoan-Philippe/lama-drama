export class Spit extends Phaser.GameObjects.Image {
  body!: Phaser.Physics.Arcade.Body;

  private spitSpeed: number;

  constructor(params) {
    super(params.scene, params.x, params.y, params.key);

    this.initVariables(params);
    this.initPhysics(params);

    this.scene.add.existing(this);
  }

  private initVariables(params): void {
    this.spitSpeed = params.spitProperties.speed;
  }

  private initPhysics(params): void {
    this.scene.physics.world.enable(this);
    this.body.setVelocityX(this.spitSpeed * params.direction);
    this.body.setSize(1, 8);
    this.body.gravity.y = -200;
    this.scene.physics.velocityFromRotation(params.anglePointer, 500, this.body.velocity);
  }

  update(): void {
    if (this.x < 0 || this.x > this.scene.sys.canvas.width) {
      this.destroy();
    }
  }
}