window.onload = function () {
    var bg = document.getElementById("bg");
    console.log(bg)
    bg.play();  
    var canvas = document.getElementById('mycanvas');
    var ctx = canvas.getContext('2d');
    var gameOver = false;
    var level = 1,i=0,timer = 1200,time;
    var score = localStorage.getItem("myscore2");
    score =Number(score);

    var lives = localStorage.getItem("mylives");
    lives = Number(lives);

    var lives = localStorage.getItem("mylives");
    lives = Number(lives);

    canvas.width = screen.width;//window.innerWidth;
    canvas.height = window.innerHeight;
    GAME_WIDTH = canvas.width; // 1360.5
    GAME_HEIGHT = canvas.height; // 592.5

    var object = {};
    object.player = new Image();
    object.player.src = "assets/hero3.png";

    object.goal = new Image();
    object.goal.src = "assets/home.gif";

        object.enemy = [];
        object.enemy[0] = new Image();
        object.enemy[0].src = "assets/animal31.gif";
        object.enemy[1] = new Image();
        object.enemy[1].src = "assets/animal32.gif";
        object.enemy[2] = new Image();
        object.enemy[2].src = "assets/animal33.gif";
        object.enemy[3] = new Image();
        object.enemy[3].src = "assets/animal34.gif";
        object.enemy[4] = new Image();
        object.enemy[4].src = "assets/animal35.gif";

    var enemy = [
        {
            x : 200,
            y : 10,
            w : 70,
            h : 70,
            speedY : 7,//5
        },
        {
            x : 440,
            y : 500,
            w : 70,
            h : 70,
            speedY : 8,//6
        },
        {
            x : 760,
            y : 350,
            w : 80,
            h : 80,
            speedY : 8,//6
        },
        {
            x : 1040,
            y : 510,
            w : 70,
            h : 70,
            speedY : 10,//11
        },
        {
            x : 1290,
            y : 400,
            w : 70,
            h : 70,
            speedY : 9,//9
        }
    ];

    var player = {
        x:5,
        y:360,
        w:90,
        h:50,
        speedX:4.5,
        isMoving:false
    }

    var goal = {
        x: GAME_WIDTH - 120,
        y:340,
        w:150,
        h:100
    }

    canvas.addEventListener("mousedown",function(){
        //console.log("Clicked the canvas!");
        player.isMoving = true;
    });
    canvas.addEventListener("mouseup",function(){
        //console.log("Clicked the canvas!");
        player.isMoving = false;
    });
    canvas.addEventListener("touchstart",function(){
        //console.log("Clicked the canvas!");
        player.isMoving = true;
    });
    canvas.addEventListener("touchend",function(){
        //console.log("Clicked the canvas!");
        player.isMoving = false;
    });

    function colliding(r1,r2){
        var condition1 = Math.abs(r1.x - r2.x) < Math.max(r1.w,r2.w);
        var condition2 = Math.abs(r1.y - r2.y) < Math.max(r1.h,r2.h)
        if(condition1&&condition2){
            return true;
        }else{
            return false;
        }
    }

    var update = function () {

        // for collision between player and enemy
        enemy.forEach(function(element,index) {
            if (colliding(element, player)) {
                lives--;
                if( lives <= 0){
                    gameOver = true;
                    lives = 3;
                    window.location.assign("Gameover.html");
                }
                bg.pause();
                document.getElementById("touchEnemy").play();
                window.alert("\n\n   GAME OVER  !!!! \n\n   YOUR SCORE IS : " + score +"\n\n");
                function timedRefresh(timeoutPeriod) {
                    setTimeout("location.reload(true);",timeoutPeriod);
                }
                window.onload = timedRefresh(3000);
                gameOver = true;

            }
        });

        // when player reaches the goal
        if(player.x >= canvas.width - 70){
            bg.pause();
            document.getElementById("levelFinished").play();
            alert("\n\n   CONGRATS !!! \n\n   YOUR SCORE IS : " + score +"\n\n");
            gameOver = true;
            level = 3;
            window.location.assign("gameEnd.html");
        }

        enemy.forEach(function(element,index) {
            element.y += element.speedY;
            if(element.y >= GAME_HEIGHT - 65 || element.y <=0){
                element.speedY *= -1;
            }
        });

        if(player.isMoving == true){
            player.x += player.speedX;
        }


        for(;i < enemy.length ;) {
            //console.log(i);
            if(player.x > enemy[i].x ){
                document.getElementById("crossEnemy").play();
                score = score + 1;
                updateScore = true;
                i++;
            }else{
                break;
            }
        }

        // for timer
        timer--;
        if(timer <= 0){
            lives--;
            if( lives <= 0){
                gameOver = true;
                lives = 3;
                window.location.assign("Gameover.html");
            }
            bg.pause();
            document.getElementById("timeFinished").play();
            alert("\n\n TIMES UP !!! \n\n YOUR SCORE IS : " + score +"\n\n");
            gameOver = true;
            function timedRefresh(timeoutPeriod) {
                setTimeout("location.reload(true);",timeoutPeriod);
            }
            window.onload = timedRefresh(2000);
        }

    }

    var draw = function() {
        // clear the screen
        ctx.clearRect(0,0,GAME_WIDTH,GAME_HEIGHT);
        ctx.fillStyle = "rgb(0,200,0)"; /// we are filling ink

        //Draw enemies
        enemy.forEach(function (element,index) {
            ctx.drawImage(object.enemy[index],element.x,element.y,element.w,element.h);
        });

        //Draw player
        ctx.fillStyle = "rgb(200,0,0)";
        ctx.drawImage(object.player,player.x,player.y,player.w,player.h);

        // Draw Goal
        ctx.fillStyle = "rgb(100,100,230)";
        ctx.drawImage(object.goal,goal.x,goal.y,goal.w,goal.h);

        // giving box red border ang blue background color
        ctx.strokeStyle = "Orange";                    //Context boader black color
        ctx.strokeRect(GAME_WIDTH-160,5,290,100);
        ctx.fillStyle = "yellow";                       //Context boader white color
        ctx.fillRect(GAME_WIDTH-160,5,290,100);

        ctx.font = "20px Times New Roman, Times, serif";              //score context font size and style
        ctx.fillStyle = "black";              //context color black
        ctx.fillText("SCORE : ",GAME_WIDTH-125,30);  //score width   
        ctx.font = "20px Times New Roman, Times, serif";
        ctx.fillStyle = "black";
        ctx.fillText(score,GAME_WIDTH-30,30);        
        ctx.font = "20px Times New Roman, Times, serif";               //Time left context font size and style
        ctx.fillStyle = "black";
        ctx.fillText("TIME LEFT : ",GAME_WIDTH-160,60);
        ctx.fillStyle = "black";
        time  = timer - 2;            
        if(time <= 0) time = 0;    // otherwise it will show -1
        ctx.fillText(time,GAME_WIDTH-45,60);   //life context font size, style and color
        ctx.font = "20px Times New Roman, Times, serif";
        ctx.fillStyle = "red";
        ctx.fillText("LIFE : ",GAME_WIDTH-100,90);
        ctx.fillStyle = "red";
        ctx.fillText(lives,GAME_WIDTH-30,90);
    }

    var render =  function () {
        draw();
        update();

        if(gameOver == false)
            window.requestAnimationFrame(render);

        localStorage.setItem("myscore3",score);
        localStorage.setItem("mylives",lives);
    }
    render();
}