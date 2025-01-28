class Sprite{
 
    constructor({position, imageSrc, scale=1, framesMax = 1}){
        this.position = position
        this.width = 50
        this.height = 150
        this.image = new Image()
        this.image.src = imageSrc
        this.scale = scale
        this.framesMax = framesMax
    }

    draw(){
        c.drawImage(this.image,
            this.position.x,
            this.position.y,
         )
    }

    update(){
        this.draw()
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
