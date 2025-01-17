const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

c.fillRect(0,0,canvas.width, canvas.height)
c.fillStyle = 'black'

const keys = { q : {pressed : false},
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
    if (keys.q.pressed && lastKey == 'q'){
        player.velocity.x = 1
    }
    else if (keys.d.pressed && lastKey == 'd'){
        player.velocity.x = -1
    }
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

window.addEventListener('keydown', (event) => {
    switch(event.key){
        case 'q': 
            console.log(event.key)
            keys.q.pressed = true
            lastKey = 'q'
            break
        case 'd':
            console.log(event.key)
            keys.d.pressed = true
            lastKey = 'd'
            break

    }
})

window.addEventListener('keyup', (event) => {
    switch(event.key){
        case 'q':
            console.log(event.key)
            keys.q.pressed = false
            lastKey = 'q'
        break
        case 'd': 
            console.log(event.key)
            keys.d.pressed = false
            lastKey = 'd'
        break
        case 'z':
            console.log(event.key)
            keys.z.pressed = true
            lastKey = 'z'

    }
})