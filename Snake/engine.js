$(function() {
    var snake = $('.snake');
    var food = $('.food');
    var direction = 'right';
    var position = {};
    var foodPosition = {};
    var score = $('.score');


    function init() {
        position = {
            x: parseInt(snake.css('left').slice(0,-2)),
            y: parseInt(snake.css('top').slice(0,-2))
        }

        moveFood();
    }
    init();

    function tick() {
        move(direction);
    }
    var game = setInterval(tick, 100)
    
    function move(direction) {
        checkForCollision(position);

        var movements = {
            'up': function () {
                snake.css('top', position.y - 10 + 'px');
                snake.css('transform', 'rotate(180deg)');
                position.y -= 10;
            },
            'down':  function () {
                snake.css('top', position.y + 10 + 'px');
                snake.css('transform', 'rotate(0deg)');
                position.y += 10;
            },
            'left':  function () {
                snake.css('left', position.x - 10 + 'px');
                snake.css('transform', 'rotate(90deg)');
                position.x -= 10;
            },
            'right': function () {
                snake.css('left', position.x + 10 + 'px');
                snake.css('transform', 'rotate(-90deg)');
                position.x += 10;
            }
        }
        movements[direction]();
    }

    function moveFood() {
        foodPosition = {
            x: Math.floor(Math.random() * (785 - 0)),
            y: Math.floor(Math.random() * (785 - 0)),
        }

        food.css('left', foodPosition.x + 'px');
        food.css('top', foodPosition.y + 'px');
    }

    function checkForCollision(position) {
        if(position.y < 0 || position.y > 800 || position.x < 0 || position.x > 800) {
            clearTimeout(game);
            alert('Zagubi bace');
        }

        var yDelta = position.y - foodPosition.y;
        var xDelta = position.x - foodPosition.x;
        var distance = Math.sqrt(Math.pow(xDelta, 2) + Math.pow(yDelta, 2));

        if(distance <= 30) {
            var currScore = parseInt(score.text());
            score.text(currScore += 1);
            moveFood();
            addBodyPart();
        }
    }

    function addBodyPart() {
        $('.snake').append('<div class="part"></div>');    
    }

    $('body').on('keyup', function(e) {
        switch(e.keyCode) {
            case 39: // Right arrow
                if(direction == 'left') 
                    return;
                direction = 'right';
                break;
            case 38: // Up arrow
                if(direction == 'down') 
                    return;
                direction = 'up';
                break;
            case 37: // Left arrow
                if(direction == 'right') 
                    return;
                direction = 'left';
                break;
            case 40: // Down arrow
                if(direction == 'up') 
                    return;
                direction = 'down';
                break;
        }
    });
});

