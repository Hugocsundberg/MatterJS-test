import PIXI  from 'pixi.js';
import Matter, { Body, Constraint } from 'matter-js';

// module aliases
const Engine = Matter.Engine
const Render = Matter.Render
const Bodies = Matter.Bodies
const World = Matter.World
const Mouse = Matter.Mouse
const Composites = Matter.Composites
const MouseConstraint = Matter.MouseConstraint
const Common = Matter.Common
const Events = Matter.Events

const engine = Engine.create()
const render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        wireframes: false,
        background: 'rgb(30,30,30)'
    }
})

const groundRender = {
    fillStyle: 'white' 
}

let ball = Bodies.circle(100,300,20, {restitution: 1})
const sling = Constraint.create({
    pointA: {x:100, y:300},
    bodyB: ball,
    stiffness: 0.05
})

let firing = false


const ground = Bodies.rectangle(900, 200, window.innerWidth, 30, {isStatic: true, render: groundRender })
const stack = Composites.stack(500, -100, 4, 4, 0, 0, (x, y) => {
    const size = {
        x: 20,
        y: 20
    }

    const body = Bodies.polygon(x,y,8,size.x,size.y)
    body.friction = 0.5
    body.restitution = 0.5
    Body.setDensity(body, 0.0001)
    return body
})

console.log(stack)

console.log(ball)

const mouse = Mouse.create(render.canvas)
const mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
        render: {
            visible: true
        }
    }
})
render.mouse = mouse
Events.on(mouseConstraint, 'enddrag', (e)=>{
    if(e.body === ball) firing = true
})
Events.on(engine, 'afterUpdate', ()=>{
    if(firing && Math.abs(ball.position.x - 100) < 20 && Math.abs(ball.position.y - 300) < 20) {
        ball = Bodies.circle(100,300,20, {restitution: 1})
        World.add(engine.world, ball)
        sling.bodyB = ball
        firing = false
    }
})

World.add(engine.world, [ground, stack, ball, sling, mouseConstraint])
Engine.run(engine)
Render.run(render)

console.log(ground)


