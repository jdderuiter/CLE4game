module MyGame {

	export class Gallery extends Phaser.State {
        game:Game
        ui_locked1: Phaser.Sprite
        ui_locked2: Phaser.Sprite
		ui_painting1: Phaser.Sprite
        ui_painting2: Phaser.Sprite
        painting1: Phaser.Sprite
        painting2: Phaser.Sprite
        
        okButton: Phaser.Sprite
		selectedPainting:number = 0

		create() {
            this.add.sprite(0, 0, 'uiBackground')
            this.add.sprite(0, 0, 'galleryBackground')

            if (this.game.gameprogression <= 0) {
                this.ui_locked1 = this.add.sprite(this.world.centerX, this.world.centerY-50 , 'uiArtLocked')
                this.ui_locked2 = this.add.sprite(this.world.centerX, this.world.centerY+80 , 'uiArtLocked')

                this.ui_locked1.anchor.setTo(0.5, 0.5)
                this.ui_locked2.anchor.setTo(0.5, 0.5)
            }
            
            if (this.game.gameprogression == 1) {
                this.ui_painting1 = this.add.sprite(this.world.centerX-75.5, this.world.centerY-50 , 'uiDaliMelt')
                this.ui_locked2 = this.add.sprite(this.world.centerX, this.world.centerY+80 , 'uiArtLocked')

                this.ui_painting1.anchor.setTo(0.5, 0.5)
                this.ui_locked2.anchor.setTo(0.5, 0.5)

                this.ui_painting1.inputEnabled = true
                this.ui_painting1.input.useHandCursor = true

                this.ui_painting1.events.onInputDown.add(() => this.selectPainting(this.ui_painting1, 1))
                this.ui_painting1.events.onInputOver.add(() => this.hoverOn(this.ui_painting1, 1))    
                this.ui_painting1.events.onInputOut.add(() => this.hoverOut(this.ui_painting1, 1))
            }

            if (this.game.gameprogression >= 2) {
                this.ui_painting1 = this.add.sprite(this.world.centerX-56.5, this.world.centerY-50 , 'uiDaliMelt')
                this.ui_painting2 = this.add.sprite(this.world.centerX, this.world.centerY+80 , 'uiDaliSphere')

                this.ui_painting1.anchor.setTo(0.5, 0.5)
                this.ui_painting2.anchor.setTo(0.5, 0.5)

                this.ui_painting1.inputEnabled = true
                this.ui_painting1.input.useHandCursor = true
                this.ui_painting2.inputEnabled = true
                this.ui_painting2.input.useHandCursor = true

                this.ui_painting1.events.onInputDown.add(() => this.selectPainting(this.ui_painting1, 1))
                this.ui_painting1.events.onInputOver.add(() => this.hoverOn(this.ui_painting1, 1))    
                this.ui_painting1.events.onInputOut.add(() => this.hoverOut(this.ui_painting1, 1))
                this.ui_painting2.events.onInputDown.add(() => this.selectPainting(this.ui_painting2, 2))
                this.ui_painting2.events.onInputOver.add(() => this.hoverOn(this.ui_painting2, 2))
                this.ui_painting2.events.onInputOut.add(() => this.hoverOut(this.ui_painting2, 2))
            }
            
            this.okButton = this.add.sprite(this.world.centerX, this.world.centerY+215 , 'uiOkButton')

            this.okButton.anchor.setTo(0.5, 0.5)

            this.okButton.inputEnabled = true
            this.okButton.input.useHandCursor = true

            this.okButton.events.onInputDown.add(() => this.mainMenu())
            this.okButton.events.onInputOver.add(() => this.hoverOn(this.okButton, 3))
            this.okButton.events.onInputOut.add(() => this.hoverOut(this.okButton, 3))

<<<<<<< HEAD:src/Gallery.ts
			console.log("gallery of galleries")
		}
=======
			console.log("gallary of gallaries")
        }

>>>>>>> 0ad5c80968bde41908b878f376dd735b22c1b855:src/Gallary.ts

		selectPainting(el:Phaser.Sprite, n:number) {

            if (n == 1) {
                this.painting1 = this.add.sprite(this.world.centerX, this.world.centerY , 'daliMelt')
                this.painting1.anchor.setTo(0.5, 0.5)
            }
            if (n == 2) {
                this.painting2 = this.add.sprite(this.world.centerX, this.world.centerY , 'daliSphere')
                this.painting2.anchor.setTo(0.5, 0.5)
            }

            if (Math.random() < 0.33) {
                console.log('such amazing art')
            } else if (Math.random() > 0.33 && Math.random() < 0.66) {
                console.log('very wow') 
            } else {
                console.log('so talented')
            }
        }

        hoverOn(el:Phaser.Sprite, n:number) {

            if (n == 1) {
                el.scale.setTo(1.05, 1.05)
            }
            if (n == 2) {
                el.scale.setTo(1.05, 1.05)
            }
            if (n == 3) {
                el.scale.setTo(1.05, 1.05)
            }
        }

        hoverOut(el:Phaser.Sprite, n:number) {

            if (n == 1) {
                el.scale.setTo(1, 1)
            }
            if (n == 2) {
                el.scale.setTo(1, 1)
            }
            if (n == 3) {
                el.scale.setTo(1, 1)
            }
        }
        
        mainMenu() {
            this.game.state.start('MainMenu', true, false);
        }
	}
}