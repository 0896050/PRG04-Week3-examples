/// <reference path="fish.ts"/>
/// <reference path="bubble.ts"/>

class Game {

    f:Fish;
    b:Bubble;

    constructor() {
        this.f = new Fish();
        this.b = new Bubble();

        // start game loop        
        requestAnimationFrame(this.gameLoop.bind(this));
    }

    gameLoop(){
        this.f.move();
        this.calculateCollision();
        // this.domCollision();

        requestAnimationFrame(this.gameLoop.bind(this));
    }


    //
    // voorbeeld 1
    //
    // zelf collision uitrekenen met de coordinaten van de fish en de bubble. Dit is onafhankelijk van de weergave op het scherm.
    // dit is preciezer en werkt ook als er geen weergave is, of als de weergave op een canvas is
    // https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
    calculateCollision() { 
        if (this.f.x < this.b.x + this.b.width &&
            this.f.x + this.f.width > this.b.x &&
            this.f.y < this.b.y + this.b.height &&
            this.f.height + this.f.y > this.b.y) {
            console.log("collision!!!!!");
        } else {
            console.log("no collision detected :(");
        }
    }


    //
    // voorbeeld 2
    //
    // gebruik de Client Rectangle van het DOM element op het scherm.
    // je hoeft nu niet zelf coordinaten bij te houden en je krijgt ook een bottom / right coordinaat
    // https://developer.mozilla.org/en/docs/Web/API/Element/getBoundingClientRect
    domCollision() {
        let rect1:ClientRect = this.f.div.getBoundingClientRect();
        let rect2:ClientRect = this.b.div.getBoundingClientRect();

        if (rect1.left < rect2.right &&
            rect1.right > rect2.left &&
            rect1.top < rect2.bottom &&
            rect1.bottom > rect2.top) {
            console.log("collision!!!!!");
        } else {
            console.log("no collision detected :(");
        }
    }
} 


// load
window.addEventListener("load", function() {
    new Game();
});