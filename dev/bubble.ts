class Bubble {

    div:HTMLElement;
    x:number;
    y:number;
    width:number = 55;
    height:number = 55;

    constructor() {
        this.createDiv();
    }

    createDiv() {
        this.div = document.createElement("bubble");
        document.body.appendChild(this.div);

        this.x = Math.random() * 150;
        this.y = Math.random() * 150;
        
        this.div.style.transform ="translate("+this.x+"px,"+this.y+"px)";
    }
}