const canvas = document.
    querySelector('canvas')
const character = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

class Player {
    constructor(x, y, radius, color) {
        this.x = x
        this.y = y

        this.radius = radius
        this.color = color
    }

    draw() {
        character.beginPath()
        character.arc(this.x, this.y, this.radius, Math.PI * 2, false)
        character.fillStyle = this.color
        character.fill()
    }
}

class Projectile {
    constructor(x, y, radius, color, velocity) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = velocity
    }

    draw() {
        character.beginPath()
        character.arc(this.x, this.y, this.radius, Math.PI * 2, false)
        character.fillStyle = this.color
        character.fill()
    }

    update() {
        this.draw()
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
    }
}

class Enemy {
    constructor(x, y, radius, color, velocity) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = velocity
    }

    draw() {
        character.beginPath()
        character.arc(this.x, this.y, this.radius, Math.PI * 2, false)
        character.fillStyle = this.color
        character.fill()
    }

    update() {
        this.draw()
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
    }
}

const x = canvas.width / 2
const y = canvas.height / 2

const player = new Player(x, y, 30 , 'blue')
const projectiles = []
const enemies = []


function spawnEnenies() {
    setInterval(() => {
        const radius = Math.random() * (30 - 6) + 6
        let x
        let y

        if (Math.random() < 0.5){
            x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius
            y = Math.random() * canvas.height
        } else {
            x = Math.random() * canvas.width
            y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius
        }
        const color = 'green'
        const angle = Math.atan2(
            canvas.height / 2 - y,
            canvas.width / 2 - x
            )
    
            const velocity = {
                x: Math.cos(angle),
                y: Math.sin(angle)
            }
        enemies.push(new Enemy(x, y, radius, color, velocity))
    }, 1000)
}

function animate() {
    requestAnimationFrame(animate)
    character.clearRect(0, 0, canvas.width, canvas.height)
    player.draw()
    projectiles.forEach((projectile) => {
        projectile.update()
    })

    enemies.forEach((enemy, index) => {
        enemy.update()

        projectiles.forEach((projectile, projectilesindex) => {
            const dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y)

            if (dist - enemy.radius - projectile.radius < 1) {
                setTimeout(() =>{
                enemies.splice(index, 1)
                projectiles.splice(projectilesindex, 1)
                }, 0)
            }
        })
    })
}

addEventListener('click', (event) => {
    const angle = Math.atan2(
        event.clientY - canvas.height / 2,
        event.clientX - canvas.width / 2
        )

        const velocity = {
            x: Math.cos(angle),
            y: Math.sin(angle)
        }
    projectiles.push(new Projectile(
        canvas.width / 2, canvas.height / 2, 5, 'red', velocity
    ))})

animate()
spawnEnenies()