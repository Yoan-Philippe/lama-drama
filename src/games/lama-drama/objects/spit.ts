export class Spit extends Phaser.GameObjects.Image {
  body!: Phaser.Physics.Arcade.Body;

  private spitSpeed: number;
  private timeKill: number;

  constructor(params) {
    super(params.scene, params.x, params.y, params.key);

    this.initVariables(params);
    this.initPhysics(params);

    this.scene.add.existing(this);
  }

  private initVariables(params): void {
    this.spitSpeed = params.spitProperties.speed;
    this.timeKill = params.timeKill;
  }

  private initPhysics(params): void {
    this.scene.physics.world.enable(this);
    this.body.setVelocityX(this.spitSpeed);
    this.body.setSize(1, 8);
    this.body.gravity.y = -150;
    this.scene.physics.velocityFromRotation(params.anglePointer, 500, this.body.velocity);
  }

  update(): void {
    if(this.scene.time.now > this.timeKill){
      this.destroy();
    }

  }
}