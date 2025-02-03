class Sprite{
 
    constructor({position, imageSrc, scale=1, framesMax = 1, frameCurrent = 0}){
        this.position = position
        this.width = 50
        this.height = 150
        this.image = new Image()
        this.image.src = imageSrc
        this.scale = scale
        this.framesMax = framesMax
        this.frameCurrent = 1
        this.frameElapsed = 0
        this.frameHold = 5
    }

    draw(){
        c.drawImage(this.image,
            this.frameCurrent * (this.image.width / this.framesMax),
            0,
            this.image.width / this.framesMax,
            this.image.height,
            this.position.x,
            this.position.y,
            (this.image.width /this.framesMax)* this.scale,
            this.image.height * this.scale
         )
    }

    update(){
        this.draw()
        if (this.frameCurrent < this.framesMax -1){
            this.frameCurrent++
        }else{
            this.frameCurrent = 0
        }
    }

}


class Fighter{
 
    constructor({position, velocity, width, color = 'red', offset}){
        this.position = position
        this.velocity = velocity
        this.color = color
        this.width = width
        this.height = 150
        this.lastKey = ''
        this.offset = this.offset
        this.health = 100
        this.isAttacking = false;
        this.attackBox = {
                position : this.position,
                width : 100,
                height : 50
            }
    }

    draw(){
        c.fillStyle = 'red'
        c.fillRect(this.position.x,this.position.y,50,this.height)

        //attack box
        c.fillStyle = 'green'
        c.fillRect(
            this.attackBox.position.x,
            this.attackBox.position.y,
            this.attackBox.width,
            this.attackBox.height
        )
    }



    update(){
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        if (this.position.y + this.height + this.velocity.y >= canvas.height){
            this.velocity.y = 0
        }
        else {
            this.velocity.y += gravity
        }
    }

    attack(){
        this.isAttacking = true;
        setTimeout(() => {
            this.isAttacking = false
        },100
        )
    }
}
