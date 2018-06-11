module MyGame {

    export class Player extends Phaser.Sprite {
        private startX:number
        private startY:number
        public lives:number = 9
        private timer: number = 0
        private enemyState: number
        private jumpPressed:boolean
        private speed: number = 250;
        private jumpheight: number = 275;

        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y, 'dude', 0);

            this.startX = x
            this.startY = y

            this.jumpPressed = false

            this.game.physics.arcade.enableBody(this)
            this.body.collideWorldBounds=true;

            this.anchor.setTo(0.5, 1.0);

            this.animations.add('idle', [0], 40, false)
            this.animations.add('walk', [0, 1, 2, 3, 4, 5, 6, 7], 40, true)
            this.animations.add('jump', [8, 9, 10, 11, 12, 12, 13, 13, 14, 14, 14], 15, false)
            this.animations.add('fall', [14], 40, false)
            this.animations.frame = 0

            game.add.existing(this)
        }

        update() {
            this.body.velocity.x = 0
            this.body.bounce.y = 0.0
            this.body.gravity.y = 500

            // Player keyboard controls
            // Moving left
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.A) || this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) 
            {
                this.body.velocity.x = -this.speed

                if (this.scale.x == 1) {
                    this.scale.x = -1
                }
            }

            // Moving right
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.D) || this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) && this.body.velocity.y == 0)
            {
                this.body.velocity.x = this.speed;

                if (this.scale.x == -1) {
                    this.scale.x = 1
                }
            }

            // Jumping
            if ((this.game.input.keyboard.isDown(Phaser.Keyboard.W) || this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) && this.body.touching.down && this.jumpPressed == false){
                this.body.velocity.y = -this.jumpheight;
            }

            // Something with jumpPressed..
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.W) || this.game.input.keyboard.isDown(Phaser.Keyboard.UP)){
                this.jumpPressed = true

            } else {
                this.jumpPressed = false
            }
            
            // Player animations
            // Falling animation if velocity y is positive
            if (this.body.velocity.y == 0 && this.body.velocity.x == 0)
            {
                this.animations.play('idle')
            }

            if (this.body.velocity.y > 0 && (this.body.velocity.x !== 0)) 
            {
                this.animations.play('fall')
            }

            // Falling animation if velocity y is negative
            if (this.body.velocity.y < 0) 
            {
                this.animations.play('jump')
            }

            // Walking animation if velocity x > 0
            if (this.body.velocity.x !== 0 && this.body.velocity.y == 0)
            {
                this.animations.play('walk')
            }

            // No lives mechanic
            // If player lost all lives go to gameOver()
            if (this.lives <= 0) {
                this.gameOver();
            }
        }

        spawn() {
            this.x = this.startX
            this.y = this.startY
            this.lives -= 1
            console.log(this.lives)
        }

        gameOver() {
            this.game.state.start('GameOver', true, false);
        }

        fly() {
            this.timer++
            console.log("FLY!!")

            if (this.timer <= 7) {
                this.animations.play('jump')
                this.game.input.keyboard.isDown(Phaser.Keyboard.UP)
                this.body.velocity.y = -550;
            } else {
                this.timer = 0
            }
        }
    }
}