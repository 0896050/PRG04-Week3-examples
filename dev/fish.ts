class Fish {

    // collision
    div:HTMLElement;
    x:number;
    y:number;
    width:number = 130;
    height:number = 110;

    // keyboard input
    leftSpeed : number = 0;
    rightSpeed : number = 0;
    downSpeed : number = 0;
    upSpeed : number = 0;

    // keys
    leftkey:number = 65;
    rightkey:number = 68;
    upkey:number = 87;
    downkey:number = 83;

    constructor() {
        this.createDiv();

        // keyboard input
        window.addEventListener("keydown", this.onKeyDown.bind(this));
        window.addEventListener("keyup", this.onKeyUp.bind(this));
    }

    createDiv() {
        this.div = document.createElement("fish");
        document.body.appendChild(this.div);

        this.x = Math.random() * 150;
        this.y = Math.random() * 150;

        this.move();
    }

    move(){
        this.x = this.x - this.leftSpeed + this.rightSpeed;
        this.y = this.y - this.upSpeed + this.downSpeed;
        this.div.style.transform ="translate("+this.x+"px,"+this.y+"px)";
    }

    // keyboard input zorgt dat de snelheid wordt aangepast
    private onKeyDown(event:KeyboardEvent):void {
        switch(event.keyCode){
        case this.upkey:
            this.upSpeed = 5;
            break;
        case this.downkey:
            this.downSpeed = 5;
            break;
        case this.leftkey:
            this.leftSpeed = 5;
            break;
        case this.rightkey:
            this.rightSpeed = 5;
            break;
        }
    }
    
    // speed op 0 alleen als de eigen keys zijn losgelaten
    private onKeyUp(event:KeyboardEvent):void {
        switch(event.keyCode){
        case this.upkey:
            this.upSpeed = 0;
            break;
        case this.downkey:
            this.downSpeed = 0;
            break;
        case this.leftkey:
            this.leftSpeed = 0;
            break;
        case this.rightkey:
            this.rightSpeed = 0;
            break;
        }
    }
}