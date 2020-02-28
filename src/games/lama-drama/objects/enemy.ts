import { Spit } from "./spit";
import { Player } from "./player";

export class Enemy extends Phaser.GameObjects.Sprite {
  body!: Phaser.Physics.Arcade.Body;
  private enemyType: string;
  private speed: number;
  private player: Player;

  constructor(params) {
    super(params.scene,params.x, params.y, params.key);

    this.initVariables(params);
    this.initImage();
    this.initPhysics();

    this.scene.add.existing(this);
  }

  private initVariables(params): void {
    this.enemyType = params.key;
    this.speed = 100;
    this.player = params.player;

    // set the characteristics of the specific enemy
    switch (this.enemyType) {
      case "coyote":
        break;
    }
  }

  private initImage(): void {
    this.setOrigin(0.5, 0.5);
    this.setActive(true);
  }

  private initPhysics(): void {
    this.scene.physics.world.enable(this);
    this.body.setSize(400, 200);
    this.setScale(0.4, 0.4);
  }

  update(): void {
    if (this.active) {

      if( (this.x + this.width/2) > 0){

        if(this.x > this.player.x){
          this.body.setVelocityX(-this.speed);
        }
        else{
          this.body.setVelocityX(this.speed);
        }
        
      }
      else{
        this.destroy();
      }
    }
  }
}
