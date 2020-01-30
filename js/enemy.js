var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
class Enemy {
    constructor(pace) {
        this.color = "red";
        this.side = 40;
        this.x = canvas.width + Math.random() * canvas.width;
        this.y = canvas.height - this.side - 20;
        this.vx = pace;
    }

    draw() {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.side, this.side);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }

    update() {
        this.x += this.vx;
        return this.x <= -this.side;
    }

    returnPos() {
        return {x: this.x, y: this.y};
    }
}