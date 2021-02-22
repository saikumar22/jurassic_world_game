window.onload = function () {  //onload event occurs when an object has been loaded.loaded all content (including images, script files, CSS files, etc.).
    var bg = document.getElementById("bg"); //add a class name to an background (bg)
    console.log(bg)
    bg.play();    
    var canvas = document.getElementById('mycanvas');  //add a class name to an canvas 
    var ctx = canvas.getContext('2d');                //Context type 2d
    var gameOver = false;
    var level = 1,score = 0,i=0,timer = 3000,time; //level=1 score starts form zero and timer
    
    var lives = localStorage.getItem("mylives");
    lives = Number(lives);
    canvas.width = screen.width;                 //window.innerWidth;
    canvas.height = window.innerHeight;
    GAME_WIDTH = canvas.width; // 1360.5
    GAME_HEIGHT = canvas.height; // 592.5
    
    var object = {};                            //create Player or runner image
    object.player = new Image();
    object.player.src = "assets/hero1.png";
    
    object.goal = new Image();                 //create goal or final house image
    object.goal.src = "assets/home.gif";
    
    object.enemy = [];                         //create each animal image 
    object.enemy[0] = new Image();
    object.enemy[0].src = "assets/animal1.gif";
    object.enemy[1] = new Image();
    object.enemy[1].src = "assets/animal2.gif";
    object.enemy[2] = new Image();
    object.enemy[2].src = "assets/animal3.gif";
    object.enemy[3] = new Image();
    object.enemy[3].src = "assets/animal4.gif";
    object.enemy[4] = new Image();
    object.enemy[4].src = "assets/animal5.gif";
    
    var enemy = [               // first animal 
        {
            x : 170,            // x direction length - vertical moving animal
            y : 100,            // y direction start animal
            w : 95,             // animal width
            h : 75,             // animal height
            speedY : 5,         // animal speed in vertical direction(y-direction)
        },
        {
            x : 450,
            y : 350,
            w : 95,
            h : 75,
            speedY : 6,
        },
        {
            x : 760,
            y : 50,
            w : 95,
            h : 75,
            speedY : 4,
        },
        {
            x : 1040,
            y : 10,
            w : 90,
            h : 75,
            speedY : 6,
        },
        {
            x : 1290,
            y : 350,
            w : 90,
            h : 75,
            speedY : 4,
        }
        ];
    
    var player = {
        x:5,                // x direction start - horizontal moving (x-direction)
        y:350,              // y direction final state
        w:50,              // animal width
        h:70,              // animal height
        speedX:4,          // player speed in horizontal direction(x-direction)
        isMoving:false
    }
    
    var goal = {              // constant goal, height, width
        x: GAME_WIDTH - 100,
        y:340,
        w:150,
        h:100
    }
    
    canvas.addEventListener("mousedown",function(){  //mousedown is fired the moment the button is initially pressed(mode “on”).
        player.isMoving = true;
    });
    canvas.addEventListener("mouseup",function(){  //mouseup the button is stops(player) further to false(mode “off”).
        player.isMoving = false;
    });
    canvas.addEventListener("touchstart",function(){  //touchstart – to toggle drawing mode “on”(touch position to mouse position))
        player.isMoving = true;
    });
    canvas.addEventListener("touchend",function(){   //touchend – to toggle drawing mode “off”
        player.isMoving = false;
    });
    
    function colliding(r1,r2){    // check for horizontal overlapping, while the others check for it vertically.
        var condition1 = Math.abs(r1.x - r2.x) < Math.max(r1.w,r2.w); //player and animals moving overlapping or touch
        var condition2 = Math.abs(r1.y - r2.y) < Math.max(r1.h,r2.h)
        if(condition1&&condition2){
            return true;               // if player crossing animal touch condition is true
        }else{
            return false;             // if player crossing animal not touch condition is flase
        }
    }
    var update = function () {    // update the colliding function
        enemy.forEach(function(element,index) {    // for collision between player and animals
            if (colliding(element, player)) {      // if touch to animal, player one life will be loss 
                lives--;
                if( lives <= 0){
                    gameOver = true;            
                    lives = 3;
                    window.location.assign("Gameover.html");  // 3 life will be loss automatical game over window will be open
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
            if(player.x >= canvas.width - 70){                   // when player reaches the goal
                bg.pause();
                document.getElementById("levelFinished").play();   //levelfinished congrats & score will be display
                alert("\n\n   CONGRATS !!! \n\n   YOUR SCORE IS : " + score +"\n\n");
                gameOver = true;
                level = 2;
                window.location.assign("level2.html");      //level2 will be open 
    
            }
            enemy.forEach(function(element,index) {  //animal randam speed in (y-direction)
                element.y += element.speedY;
                if(element.y >= GAME_HEIGHT - 85 || element.y <=0){
                    element.speedY *= -1;
                }
            })
            if(player.isMoving == true){
                player.x += player.speedX;
            }
    
            // for score
            for(;i < enemy.length ;) {
                if(player.x > enemy[i].x ){
                    document.getElementById("crossEnemy").play(); //for corss enemy or animals score wiil be added
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
                gameOver = true;
                document.getElementById("timeFinished").play();      // if finished time notification on the display
                alert("\n\n TIMES UP  !!!! \n\n YOUR SCORE IS : " + score +"\n\n");
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
            ctx.fillStyle = "rgb(0,200,0)";                
    
            //Draw enemies direction x and y, animal height and width
            enemy.forEach(function (element,index) {
                ctx.drawImage(object.enemy[index],element.x,element.y,element.w,element.h);
            });
    
            //Draw player
            ctx.fillStyle = "rgb(200,0,0)";
            ctx.drawImage(object.player,player.x,player.y,player.w,player.h);
    
            // Draw Goal
            ctx.fillStyle = "rgb(100,100,230)";
            ctx.drawImage(object.goal,goal.x,goal.y,goal.w,goal.h);
    
            // giving box white and border black background color
            ctx.strokeStyle = "Orange";                    //Context boader black color
            ctx.strokeRect(GAME_WIDTH-160,5,295,100);
            ctx.fillStyle = "yellow";                       //Context boader white color
            ctx.fillRect(GAME_WIDTH-160,5,295,100);
    
            ctx.font = "20px Times New Roman, Times, serif";//score context font size and style
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
            update();             //update localstorage score and lives(lifes)
            if(gameOver == false)
                window.requestAnimationFrame(render);  //automatically keeps the page updated
                localStorage.setItem("myscore1",score);
                localStorage.setItem("mylives",lives);
        }
        render();
    }