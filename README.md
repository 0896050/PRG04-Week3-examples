# PRG04-Week3-examples

- Collision detection
- Keyboard input
- Game Loop
- Callback scope
- Fonts
- Rest and spread parameters

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
        window.addEventListener("keydown", (e:KeyboardEvent) => this.onKeyDown(e));
        window.addEventListener("keyup", (e:KeyboardEvent) => this.onKeyUp(e));
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
        requestAnimationFrame(() => this.gameLoop());
    }

    gameLoop(){
        this.fish.move();
        this.calculateCollision();
        requestAnimationFrame(() => this.gameLoop());
    }
}
```

## Callback scope

Het keyword `this` binnen een class verwijst naar de huidige instance. Je kan properties en methods aanroepen met `this.speed` en `this.move()`. Echter, functies zoals setInterval en addEventListener hebben een **eigen scope**. Het keyword `this` in setInterval of addEventListener verwijst niet meer naar de huidige instance. Je kan dit oplossen door de juiste scope mee te geven met `bind()`, of door een ES6 arrow function te gebruiken.

**Bind**
```
el.addEventListener(“click”, this.doSomething.bind(this));
```

**Arrow notation**
```
// click
element.addEventListener(“click”, () => this.doSomething());

// interval
setInterval(() => this.doSomething(), 300 );

// parameters meegeven
window.addEventListener("keydown", (e:KeyboardEvent) => this.onKeyDown(e));
```

### Event Listeners verwijderen

Als je een listener aan window toevoegt, dan blijft die listener altijd bestaan, zelfs als je game object wordt verwijderd.
Het is beter om listeners te verwijderen als je ze niet meer nodig hebt.

```
class Test {
    private callback:EventListener;

    constructor(){
        // we slaan de functie op in een variabele
        this.callback = (e:KeyboardEvent) => this.keyWasPressed(e);

        // listener toevoegen
        window.addEventListener("keydown", this.callback);
    }

    private keyWasPressed(e:KeyboardEvent):void {
        // omdat de functie in een variabele zit kan je removeEventListener doen
        window.removeEventListener("keydown", this.callback);
    }
}
```


## UI en Fonts
[Google fonts](https://fonts.google.com/?selection.family=Press+Start+2P) bevat een aantal coole pixel fonts. Voeg deze toe aan je index.html en style.css

**HTML**
```
<head>
  <link href="https://fonts.googleapis.com/css?family=Press+Start+2P" rel="stylesheet">
</head>
<body>
  <ui id="ui"></ui>
</body>
```
**CSS**
```
ui {
  font-family: 'Press Start 2P', cursive;
  color:white;
  font-size:22px;
}
```
**Typescript**
```
document.getElementById("ui").innerHTML = "Score: 100";
```

## Rest and Spread operators

Een rest parameter converteert alle waarden die in een functie binnenkomen meteen naar een array:
```
private myFunction(...args:Array<number>){
    // alle waarden komen automatisch in een array
    console.log("Het tweede argument is " + args[1]);
}
// je kan losse waarden doorgeven
this.myFunction(3,6,7,8);
```

De spread operator doet het tegenovergestelde. Een array wordt automatisch als losse waarden doorgegeven.
```
let arr:Array<number> = [3,5,7,3,3];
// alle waarden worden los naar myFunction gestuurd
this.myFunction(...arr);
```

## Links

- [Arrow functions](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
- [Rest and spread parameters](https://rainsoft.io/how-three-dots-changed-javascript/)
- [Typescript handbook](https://basarat.gitbooks.io/typescript/content/docs/getting-started.html)
- [Typescript documentation](https://www.typescriptlang.org/docs/tutorial.html)
- [Comparing 2D coordinates](https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection)
- [Bounding Box Property](https://developer.mozilla.org/en/docs/Web/API/Element/getBoundingClientRect)
- [Game Loop](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)
- [Google Fonts](https://fonts.google.com/?selection.family=Press+Start+2P)
