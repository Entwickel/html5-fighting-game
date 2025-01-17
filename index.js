const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

const gravity = 0.2

canvas.width = 1024
canvas.height = 576

c.fillRect(0,0,canvas.width, canvas.height)
c.fillStyle = 'black'

const keys = { a : {pressed : false},
        d : {pressed : false},
        ArrowLeft: {pressed: false},
        ArrowRight : {pressed : false}
    }   

lastKey = ''

class Sprite{
 
    constructor({position, velocity}){
        this.position = position
        this.velocity = velocity
        this.height = 150
    }

    draw(){
        c.fillStyle = 'red'
        c.fillRect(this.position.x,this.position.y,50,150)
    }
    update(){
        this.draw()
        this.position.x += this.velocity.x
        this.velocity.y += gravity
        this.position.y += this.velocity.y
        if (this.position.y + this.height + this.velocity.y >= canvas.height){
            this.velocity.y = 0
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
    if (key)
}

const player = new Sprite({
position:   {x:0,y:0},
velocity: {x: 0 , y: 10}
})

const ennemy = new Sprite(
    {
    position:{
    x: 400,
    y: 100},
    velocity: {x:0,y:10}

})

player.draw()
ennemy.draw()
console.log(player)


animate()

window.addEventListener('keyup', (event) => {
    switch(event.key){
        case 'd': 
            keys.d.pressed = true
            lastKey = 'd'
            break
        case 'a': 
            keys.a.pressed = true
            lastKey = 'a'
            break

    }
})

window.addEventListener('keydown', (event) => {
    switch(event.key){
        case 'd': 
            keys.d.pressed = false
            lastKey = 'd'
        break
        case 'a': 
            keys.a.pressed = false
            lastKey = 'a'
        break
        default:
            player.velocity.x = 0
        break

    }
})