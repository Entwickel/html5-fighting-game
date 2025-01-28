import "./classes"

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

const shop = new Sprite({position:{x:0,y:0}, imageSrc : "asset/background.png"})
c.fillRect(0,0,canvas.width, canvas.height)
c.fillStyle = 'black'
const gravity = 0.2
const vitesse = 10
const keys = { q : {pressed : false},
        d : {pressed : false},
        ArrowLeft: {pressed: false},
        ArrowRight : {pressed : false},
        z : {pressed: false},
        ArrowUp : {pressed : false},

    }   


function rectangularCollision(object1, object2){

    return (
        object1.attackBox.position.x + object1.attackBox.width >= object2.position.x
        && object1.attackBox.position.x <= object2.position.x + object2.width
        && object1.attackBox.position.y + object1.attackBox.height >= object2.position.y
        && object1.attackBox.position.y <= object2.position.y + object2.height
    )

}

function determineWinner(player, ennemy,timerId){
    clearTimeout(timerId)
    document.querySelector("#displayText").style.display = 'flex'
    if (player.health === ennemy.health){
        document.querySelector("#displayText").innerHTML = 'Egalité'
    }
    else if (player.health > ennemy.health)
    {
        document.querySelector("#displayText").innerHTML = 'Player 1 Wins'
    }
    else if (player.health < ennemy.health){
        document.querySelector('#displayText').style.display = 'Player 2 Wins'
    }
}

let timer = 60
let timerId

function decreaseTimer(){
    if (timer > 0 ) {
        timerId = setTimeout(decreaseTimer, 1000)
        timer -- 
        document.querySelector('#timer').innerHTML = timer
    }
    if (timer == 0){

        determineWinner(player,ennemy,timerId)
    }
}
decreaseTimer()

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
        player.velocity.x = vitesse
    }
    else if (keys.d.pressed && player.lastKey == 'd'){
        player.velocity.x = -vitesse
    }
    else if (keys.z.pressed && player.lastKey == 'z'){
        player.velocity.y = -vitesse
    }
    if (keys.ArrowLeft.pressed && ennemy.lastKey == 'ArrowLeft'){
        ennemy.velocity.x = -vitesse
    }
    else if (keys.ArrowRight.pressed && ennemy.lastKey == 'ArrowRight'){
        ennemy.velocity.x = vitesse
    }
    else if (keys.ArrowUp.pressed && ennemy.lastKey == 'ArrowUp'){
        console.log(ennemy.position.y)
        //si l'ennemi est en bas du canvas
        if ((ennemy.position.y + ennemy.height + ennemy.velocity.y >= canvas.height)){
            ennemy.velocity.y = -vitesse
        }   
    }
    //detect collision
    if (rectangularCollision(player,ennemy) && player.isAttacking){
        player.isAttacking = false;
        ennemy.health -= 20
        console.log("dégat du joueur 1")
        document.querySelector("#ennemyHealth").style.width = ennemy.health + '%'
    }

    if (rectangularCollision(ennemy,player) && ennemy.isAttacking){
        ennemy.isAttacking = false;
        player.health -= 20
        document.querySelector("#playerHealth").style.width = player.health + '%'
        console.log("dégat du joueur 2")
    }

    //fin du jeux
    if (ennemy.health<= 0 || player.health <= 0){
        determineWinner(player,ennemy,timerId)
    }


}

const player = new Sprite({
position:   {x:0,y:0},
velocity: {x: 0 , y: 0},
width: 50
})

const ennemy = new Sprite(
    {
    position:{
    x: 400,
    y: 100},
    velocity: {x:0,y:0},
    width : 50,
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
        case ' ':
            player.attack()
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
        case 'ArrowDown':
            ennemy.attack()
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