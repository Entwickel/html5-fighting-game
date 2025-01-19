const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

c.fillRect(0,0,canvas.width, canvas.height)
c.fillStyle = 'black'
const gravity = 0.2

const keys = { q : {pressed : false},
        d : {pressed : false},
        ArrowLeft: {pressed: false},
        ArrowRight : {pressed : false},
        z : {pressed: false},
        ArrowUp : {pressed : false},

    }   

class Sprite{
 
    constructor({position, velocity, color}){
        this.position = position
        this.velocity = velocity
        this.color = color
        this.height = 150
        this.lastKey = ''
        this.attackBox = {
            position : position,
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
            this.attackBox.height,
            this.attackBox.width
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
}

function animate(){
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.clearRect(0,0,canvas.width,canvas.height)
    player.update()
    ennemy.update()
    player.velocity.x = 0
    ennemy.velocity.x = 0
    //player movement
    if (keys.q.pressed && player.lastKey == 'q'){
        player.velocity.x = 1
    }
    else if (keys.d.pressed && player.lastKey == 'd'){
        player.velocity.x = -1
    }
    else if (keys.z.pressed && player.lastKey == 'z'){
        player.velocity.y = -10
    }
    if (keys.ArrowLeft.pressed && ennemy.lastKey == 'ArrowLeft'){
        ennemy.velocity.x = -1
    }
    else if (keys.ArrowRight.pressed && ennemy.lastKey == 'ArrowRight'){
        ennemy.velocity.x = 1
    }
    else if (keys.ArrowUp.pressed && ennemy.lastKey == 'ArrowUp'){
        console.log(ennemy.position.y)
        //si l'ennemi est en bas du canvas
        if ((ennemy.position.y + ennemy.height + ennemy.velocity.y >= canvas.height)){
            ennemy.velocity.y = -10
        }   
    }
    //detect collision
    if (player.attackBox.position.x + player.attackBox.width >= ennemy.position.x
        && player.attackBox.position.x <= ennemy.position.x + ennemy.width
    ){
        console.log("collision")
    }

}

const player = new Sprite({
position:   {x:0,y:0},
velocity: {x: 0 , y: 0}
})

const ennemy = new Sprite(
    {
    position:{
    x: 400,
    y: 100},
    velocity: {x:0,y:0},
    color : 'blue'

})

player.draw()
ennemy.draw()


animate()

window.addEventListener('keydown', (event) => {
    switch(event.key){
        case 'q': 
            keys.q.pressed = true
            player.lastKey = 'q'
            break
        case 'd':
            keys.d.pressed = true
            player.lastKey = 'd'
            break
        case 'z':
            keys.z.pressed = true
            player.lastKey = 'z'
            break
        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            ennemy.lastKey = 'ArrowRight'
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            ennemy.lastKey = 'ArrowLeft'
            break
        case 'ArrowUp':
            keys.ArrowUp.pressed = true
            ennemy.lastKey = 'ArrowUp'
            break


    }
})

window.addEventListener('keyup', (event) => {
    switch(event.key){
        case 'q':
            keys.q.pressed = false
        break
        case 'd': 
            keys.d.pressed = false
        break
        case 'z':
            keys.z.pressed = false
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break
        case 'ArrowUp':
            keys.ArrowUp.pressed = false
            break
    
    
    }
})