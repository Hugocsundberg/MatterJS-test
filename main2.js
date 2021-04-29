import * as PIXI from 'pixi.js';
import Matter, { Body, Constraint } from 'matter-js';
import berry from './berry.jpg'

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
let app = new PIXI.Application({width: 800, height: 800});
document.body.appendChild(app.view);
const groundTexture = PIXI.Texture.from(berry)
const groundSprite = PIXI.Sprite.from(groundTexture)
const berryTexture = PIXI.Texture.from(berry)
const berrySprite = PIXI.Sprite.from(berryTexture)
groundSprite.anchor.set(0.5);
groundSprite.width=800
groundSprite.height=40
groundSprite.position.x = 400
groundSprite.position.y = 600

app.stage.addChild(groundSprite)
app.stage.addChild(berrySprite)

let berryBody = Bodies.rectangle(100, 100, 259, 259)
let groundBody = Bodies.rectangle(400, 600, 800, 40, {isStatic: true})
World.add(engine.world, berryBody, groundSprite, berrySprite)
Engine.run(engine)

app.ticker.add(()=>{
    // console.log(berryBody.position.y)
    // berrySprite.position.y = berryBody.position.y
})


