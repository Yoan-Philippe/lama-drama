export class Spit extends Phaser.GameObjects.Image {
  body!: Phaser.Physics.Arcade.Body;

  private spitSpeed: number;

  constructor(params) {
    super(params.scene, params.x, params.y, params.key, params.direction);

    this.initVariables(params);
    this.initImage();
    this.initPhysics(params.direction);

    this.scene.add.existing(this);
  }

  private initVariables(params): void {
    this.spitSpeed = params.spitProperties.speed;
  }

  private initImage(): void {
    
  }

  private initPhysics(direction): void {
    this.scene.physics.world.enable(this);
    this.body.setVelocityX(this.spitSpeed * direction);
    this.body.setSize(1, 8);
    this.body.gravity.y = -200;
  }

  update(): void {
    if (this.x < 0 || this.x > this.scene.sys.canvas.width) {
      this.destroy();
    }
  }
}