window.onload = function () {
    var score = localStorage.getItem("myscore3");
    score =Number(score);
    document.getElementById("para").innerHTML = '<span>' + 'Your Score : ' + '</span>'
            + '<span id = "score">' + score + '</span>';
    
    var lives = localStorage.getItem("mylives")
    lives = Number(3 - lives);
    document.getElementById("para1").innerHTML ='<span>' + ' Lifes Using : ' + '</span>' + '<span id = "lives">' + lives + '</span>';
    }