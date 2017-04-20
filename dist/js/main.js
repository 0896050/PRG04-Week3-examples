var Bubble = (function () {
    function Bubble() {
        this.width = 55;
        this.height = 55;
        this.createDiv();
    }
    Bubble.prototype.createDiv = function () {
        this.div = document.createElement("bubble");
        document.body.appendChild(this.div);
        this.x = Math.random() * 150;
        this.y = Math.random() * 150;
        this.div.style.transform = "translate(" + this.x + "px," + this.y + "px)";
    };
    return Bubble;
}());
var Fish = (function () {
    function Fish() {
        this.width = 130;
        this.height = 110;
        this.leftSpeed = 0;
        this.rightSpeed = 0;
        this.downSpeed = 0;
        this.upSpeed = 0;
        this.leftkey = 65;
        this.rightkey = 68;
        this.upkey = 87;
        this.downkey = 83;
        this.createDiv();
        window.addEventListener("keydown", this.onKeyDown.bind(this));
        window.addEventListener("keyup", this.onKeyUp.bind(this));
    }
    Fish.prototype.createDiv = function () {
        this.div = document.createElement("fish");
        document.body.appendChild(this.div);
        this.x = Math.random() * 150;
        this.y = Math.random() * 150;
        this.move();
    };
    Fish.prototype.move = function () {
        this.x = this.x - this.leftSpeed + this.rightSpeed;
        this.y = this.y - this.upSpeed + this.downSpeed;
        this.div.style.transform = "translate(" + this.x + "px," + this.y + "px)";
    };
    Fish.prototype.onKeyDown = function (event) {
        switch (event.keyCode) {
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
    };
    Fish.prototype.onKeyUp = function (event) {
        switch (event.keyCode) {
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
    };
    return Fish;
}());
var Game = (function () {
    function Game() {
        this.f = new Fish();
        this.b = new Bubble();
        document.getElementById("ui").innerHTML = "Pixel Aquarium";
        requestAnimationFrame(this.gameLoop.bind(this));
    }
    Game.prototype.gameLoop = function () {
        this.f.move();
        this.calculateCollision();
        requestAnimationFrame(this.gameLoop.bind(this));
    };
    Game.prototype.calculateCollision = function () {
        if (this.f.x < this.b.x + this.b.width &&
            this.f.x + this.f.width > this.b.x &&
            this.f.y < this.b.y + this.b.height &&
            this.f.height + this.f.y > this.b.y) {
            console.log("collision!!!!!");
        }
        else {
            console.log("no collision detected :(");
        }
    };
    Game.prototype.domCollision = function () {
        var rect1 = this.f.div.getBoundingClientRect();
        var rect2 = this.b.div.getBoundingClientRect();
        if (rect1.left < rect2.right &&
            rect1.right > rect2.left &&
            rect1.top < rect2.bottom &&
            rect1.bottom > rect2.top) {
            console.log("collision!!!!!");
        }
        else {
            console.log("no collision detected :(");
        }
    };
    return Game;
}());
window.addEventListener("load", function () {
    new Game();
});
//# sourceMappingURL=main.js.map