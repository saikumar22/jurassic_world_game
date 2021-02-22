var lives = 3;
function start(){
    level = 1;
    document.location.assign("level1.html");
}
localStorage.setItem("mylives",lives);
