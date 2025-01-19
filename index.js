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
        ArrowRight : {pressed : false}
    }   

class Sprite{
 
    constructor({position, velocity}){
        this.position = position
        this.velocity = velocity
        this.height = 150
        this.lastKey = ''
    }

    draw(){
        c.fillStyle = 'red'
        c.fillRect(this.position.x,this.position.y,50,150)
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

    if (keys.ArrowLeft.pressed && ennemy.lastKey == 'ArrowLeft'){
        ennemy.velocity.x = 1
    }
    else if (keys.ArrowRight.pressed && ennemy.lastKey == 'ArrowRight'){
        ennemy.velocity.x = -1
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
    velocity: {x:0,y:0}

})

player.draw()
ennemy.draw()
console.log(player)


animate()

window.addEventListener('keydown', (event) => {
    switch(event.key){
        case 'q': 
            console.log(event.key)
            keys.q.pressed = true
            player.lastKey = 'q'
            break
        case 'd':
            console.log(event.key)
            keys.d.pressed = true
            player.lastKey = 'd'
            break
        case 'z':
            keys.z.pressed = true
            player.lastKey = 'z'
        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            ennemy.lastKey = 'ArrowRight'
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            ennemy.lastKey = 'ArrowLeft'

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
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
        case 'ArrowRight':
            keys.ArrowRight.pressed = true

    }
})