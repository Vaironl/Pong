var canvas = document.getElementById("myCanvas");//A reference to the canvas. allows us to render graphics.

var ctx = canvas.getContext("2d");// This is what will actually be used to draw 2d stuff

var x = canvas.width / 2;
var y = canvas.height - 30;

var ballSpeed = 5;

var dx = ballSpeed;
var dy = -ballSpeed;

var ballRadius = 10; //makes collision calculation easier.

//Paddle code!!
var paddleHeight = 75;
var paddleWidth = 10;
var paddleY = (canvas.height - paddleHeight) / 2;//Position the paddle on the center.
var paddleSpeed = 7;
var paddledY = paddleSpeed;//change of speed
//delay the enemy speed to make the game easier
var enemyDy = paddleSpeed - 3;

var playerScore = 0, enemyScore = 0;

//enemy variable
enemyY = (canvas.height - paddleHeight) / 2;

var upPressed = false;
var downPressed = false;
document.addEventListener("keydown", KeyDownHandler, false);
document.addEventListener("keyup", KeyUpHandler, false);

function drawPaddle() {
	ctx.beginPath();
	ctx.rect(canvas.width - paddleWidth, paddleY, paddleWidth, paddleHeight);
	//enemy paddle
	ctx.rect(0, enemyY, paddleWidth, paddleHeight);
	ctx.fillStyle = "#0095DD";
	ctx.fill();
	ctx.closePath();
}

function drawBall() {
	ctx.beginPath();
	ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
	ctx.fillStyle = "#0095DD";
	ctx.fill();
	ctx.closePath();
}

function drawScore() {

	ctx.font = "120px Georgia";
	//enemyScore
	ctx.fillText("" + enemyScore, 10, 120);
	//playerSCore
	ctx.fillText("" + playerScore, canvas.width - 120, 120);

}

function resetBall() {
	x = (canvas.width / 2);
	y = (canvas.height / 2);
}

function checkScore() {

	if (playerScore >= 10) {

		ctx.fillStyle = "#ADD8E6";
		ctx.font = "60px Georgia";
		//enemyScore
		ctx.fillText("Player Won!!", 100, 300);

	} else if (enemyScore >= 10) {
		ctx.fillStyle = "#F00";
		ctx.font = "60px Georgia";
		//enemyScore
		ctx.fillText("Enemy Won!!", 100, 300);
	}
	if (enemyScore >= 10 || playerScore >= 10) {


		setTimeout(function() {
			document.location.reload();
		}, 3000);
	}

}

function checkCollision() {
	//if it touches the left  wall reverse position
	/*
	if (x + dx < ballRadius) {
		dx = -dx;
	}
	 */

	//if it bounces off the top or bottom,  reverse
	if (y + dy < ballRadius || y + dy > canvas.height - ballRadius) {
		dy = -dy
	}
	//if the ball is at the right wall. Special things must occur
	else if (x + dx > canvas.width - ballRadius) {
		if (y > paddleY && y < paddleY + paddleHeight) {
			if (x = x - paddleWidth) {

				//hits top of the player paddle
				if (y >= paddleY && y <= paddleY + 20) {
					dy = ballSpeed;
				}
				//middle paddle portion
				else if (y >= paddleY + (paddleHeight / 2) - 15
						&& y <= paddleY + (paddleHeight / 2) + 15) {
					dy = 0;
				}
				//bottom part
				else if (y >= paddleY + (paddleHeight / 2) + 16) {
					dy = -ballSpeed;
				}

				dx = -dx;
			}
		} else {
			resetBall();
			enemyScore += 1;
			dx = ballSpeed
		}
	}
	//colliding with the enemy wall
	else if (x - ballRadius - dx <= 0) {
		if (y > enemyY && y < (enemyY + paddleHeight)) {
			if (x = x + paddleWidth) {

				//hits top of the enemy paddle
				if (y >= enemyY && y <= enemyY + 20) {
					dy = ballSpeed;
				}
				//middle enemy paddle portion
				else if (y >= enemyY + (paddleHeight / 2) - 15
						&& y <= enemyY + (paddleHeight / 2) + 15) {
					dy = 0;
				}
				//bottom enemy paddle portion
				else if (y >= enemyY + (paddleHeight / 2) + 16) {
					dy = -ballSpeed;
				}

				dx = -dx;
			}
		} else {
			resetBall();
			playerScore += 1;
			dx = -ballSpeed;
		}

	}

}

function KeyDownHandler(e) {

	//up arrow = 38, down = 40
	if (e.keyCode == 38)

	{
		upPressed = true;
	} else if (e.keyCode == 40) {
		downPressed = true;
	}

}

function KeyUpHandler(e) {
	if (e.keyCode == 38)

	{
		upPressed = false;
	} else if (e.keyCode == 40) {
		downPressed = false;
	}
}

//Will be drawn every 10 ms
function draw() {

	//clear the canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	//draw the ball
	drawPaddle();
	drawBall();
	drawScore();

	//advance the ball
	x += dx;
	y += dy;

	if (downPressed && paddleY < canvas.height - paddleHeight) {
		paddleY += paddledY;
	} else if (upPressed && paddleY > 0) {
		paddleY -= paddledY;
	}

	if ((enemyY + paddleHeight) < canvas.height) {
		if (enemyY < y) {
			enemyY += enemyDy;
		}

	}
	//if the enemy is bellow 0
	if (enemyY > 0) {
		//if the enemy is bellow the ball.
		if (enemyY > y) {
			enemyY -= enemyDy;
		}

	}

	checkCollision();
	checkScore();
}

//call the draw function every 10 seconds
setInterval(draw, 10);
