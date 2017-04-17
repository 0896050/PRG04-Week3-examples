# PRG04-Week3-examples

## Collision detection

### Coordinaten vergelijken

Door de x, y, breedte en hoogte van twee game objecten bij te houden, kan je zien of ze elkaar raken.
De formule is:

```
var rect1 = {x: 5, y: 5, width: 50, height: 50}
var rect2 = {x: 20, y: 10, width: 10, height: 10}

if (rect1.x < rect2.x + rect2.width &&
   rect1.x + rect1.width > rect2.x &&
   rect1.y < rect2.y + rect2.height &&
   rect1.height + rect1.y > rect2.y) {
    // collision detected!
}
```

Je moet dan wel in je game object deze properties aanmaken:
```
class Bubble {
    x:number;
    y:number;
    width:number = 55;
    height:number = 55;
}
```

Het is ook mogelijk om van DOM elementen de coordinaten in het browservenster op te vragen met 
```
var rect:ClientRect = obj.getBoundingClientRect();
```

Vervolgens kan je deze waarden ophalen uit het rect object:
```
rect1.left;
rect1.top;
rect1.bottom;
rect1.right;
rect1.width;
rect1.height;
```

## Keyboard input

Om een object te kunnen besturen moeten we twee dingen doen:
- Het object moet luisteren naar keyboard input, en zijn eigen snelheid aanpassen als er input is.
- Het object moet geupdate worden (60 keer per seconde) om te kunnen bewegen als zijn snelheid hoger dan 0 is

### Input Listener en speed

```
class Fish {
    leftSpeed : number = 0;
    rightSpeed : number = 0;
    downSpeed : number = 0;
    upSpeed : number = 0;

    constructor(){
        window.addEventListener("keydown", this.onKeyDown.bind(this));
        window.addEventListener("keyup", this.onKeyUp.bind(this));
    }
    onKeyDown(event:KeyboardEvent):void {
        switch(event.keyCode){
        case 65:
            this.upSpeed = 5;
            break;
        case 68:
            this.downSpeed = 5;
            break;
        case 87:
            this.leftSpeed = 5;
            break;
        case 83:
            this.rightSpeed = 5;
            break;
        }
    }
    
    onKeyUp(event:KeyboardEvent):void {
        this.upSpeed = this.downSpeed = this.leftSpeed = this.rightSpeed = 0;
    }
}
```

### Frame animatie

Met requestAnimationFrame vraag je telkens 1 nieuw frame op, waarna de move en collision detection functies worden uitgevoerd. Doordat de game loop zichzelf aanroept gaat dit eeuwig zo door.

```
class Game {

    fish:Fish;

    constructor() {
        this.fish = new Fish();     
        requestAnimationFrame(this.gameLoop.bind(this));
    }

    gameLoop(){
        this.fish.move();
        this.calculateCollision();
        requestAnimationFrame(this.gameLoop.bind(this));
    }
```

- [Comparing 2D coordinates](https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection)
- [Bounding Box Property](https://developer.mozilla.org/en/docs/Web/API/Element/getBoundingClientRect)
- [Game Loop](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)