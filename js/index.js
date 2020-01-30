(function () {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");

    var dead = false;
    var jumping = false;
    var score = 0;
    var pace = -10;
    var gotScore = false;
    var player = new Player();
    var enemy = new Enemy(pace);

    function keyHandler(e) {
        if (e.keyCode === 32 && !jumping) {
            player.jump();
            jumping = true;
        }
    }

    document.addEventListener('keypress', keyHandler, false);

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.font = "50px Verdana";
        ctx.strokeStyle = "red";
        ctx.textAlign = "center";
        ctx.lineWidth = 2;
        ctx.strokeText("Score: " + score, canvas.width / 2, canvas.height / 10);

        ctx.beginPath();
        ctx.rect(0, canvas.height - 20, canvas.width, 20);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.closePath();

        player.draw();
        if(player.update()) {
            jumping = false;
        }

        enemy.draw();
        if (enemy.update()) {
            pace-=2;
            enemy = new Enemy(pace);
            gotScore = false;
        }

        if(dead === true) {
            alert("Game Over! Score: " + score);
            score = 0;
            dead = false;
            pace = -10;
            enemy = new Enemy(pace);
            gotScore = false;
        }

        if (player.checkContact(enemy.returnPos())) {
            dead = true;
        }

        if (player.detectJumpOver(enemy.returnPos()) && !gotScore) {
            score += Math.abs(pace)*5;
            gotScore = true;
        }
        requestAnimationFrame(draw);
    }

    requestAnimationFrame(draw);
})();