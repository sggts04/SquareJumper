var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
class Player {
    constructor() {
        this.color = "yellow";
        this.side = 40;
        this.x = canvas.width/3;
        this.y = canvas.height - this.side - 20;
        this.vy = 0;
        this.ay = 1; // positive acc pushes the block down.
    }

    draw() {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.side, this.side);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }

    update(force) {
        if (this.y < canvas.height - this.side - 20 || force === true) {
            this.vy += this.ay;
            this.y += this.vy;
        }
        if(this.y === canvas.height - this.side - 20) {
            return true;
        }
    }

    jump() {
        this.vy = -15;
        this.update(true);
    }

    checkContact(pos) {
        var x = pos.x;
        var y = pos.y;
        return ((Math.abs(this.x - x) <= this.side) && (Math.abs(this.y - y) <= this.side));
    }

    detectJumpOver(pos) {
        var x = pos.x;
        var y = pos.y;
        return (this.x - x >= this.side);
    }
}