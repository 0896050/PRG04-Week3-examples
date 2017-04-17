# PRG04-Week3-examples

## Collision detection

Door de x, y, breedte en hoogte van twee game objecten bij te houden, kan je zien of ze elkaar raken.
De formule is:

```
let bubble1 = new Bubble();
let bubble2 = new Bubble();

if (bubble1.x < bubble2.x + bubble2.width &&
   bubble1.x + bubble1.width > bubble2.x &&
   bubble1.y < bubble2.y + bubble2.height &&
   bubble1.height + bubble1.y > bubble2.y) {
    // bubble collision detected!
}
```
Je moet dan wel in je game object de properties aanmaken:
```
class Bubble {
    x:number = 100;
    y:number = 100;
    width:number = 55;
    height:number = 55;
}
```

Het is ook mogelijk om van DOM elementen de coordinaten in het browservenster op te vragen. 
```
var rect:ClientRect = obj.getBoundingClientRect();
```

Vervolgens kan je deze waarden ophalen uit het rect object:
```
rect.left;
rect.top;
rect.bottom;
rect.right;
rect.width;
rect.height;
```

## Keyboard input

Om een object te kunnen besturen moeten we twee dingen doen:
- Het object moet luisteren naar keyboard input, en zijn eigen snelheid aanpassen als er input is.
- Het object moet geupdate worden (60 keer per seconde) om te kunnen bewegen als zijn snelheid hoger dan 0 is

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

## Game Loop

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
}
```
## Links

- [Comparing 2D coordinates](https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection)
- [Bounding Box Property](https://developer.mozilla.org/en/docs/Web/API/Element/getBoundingClientRect)
- [Game Loop](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)