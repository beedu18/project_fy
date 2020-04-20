var ai = null, player = null;
var elements = [];
var type = [true,false];
var bg; 
var paused = false;
const headConstant = 20/1366;
const elementConstant = 25/1366;
const lengthConstant = 200/1366;

function preload() {
    bg = createImg('../resources/bg2.jpg');
}

function setup() {
    var canvas = createCanvas(window.innerWidth, window.innerHeight);
    ai = new Agent(width/2, height/2, headConstant*width, color(112,255,0));
    player = new Agent(width/2, height/2, headConstant*width, color(255,112,0));
    for(let i=0; i<25; i++) {
        addNewElement(0.5);
    }
    bg.size(width,height);
    bg.position(0,0);
    bg.style('z-index: -1');
}

function draw() {
    clear();

    if(frameCount % 20==0) 
        addNewElement(0.5);
    
    for(let i=elements.length-1; i>=0; i--) {
        elements[i].show();
        elements[i].vibrate();
        elements[i].edge();
        if(elements[i].lifetime<=0)
            elements.splice(i,1);
    } 
        
    //Render Player
    if(player!=null) {
        player.healthBar(width*(1-lengthConstant-headConstant), headConstant*width, "PLAYER");
        player.edge();
        player.manualMovement();
        player.move();
        player.naturalMovement();
        player.eat(elements);
        player.show();
        if(player.health<=0)
            player = null;
    }
    
    //Render AI
    if(ai!=null) {
        ai.healthBar(width*headConstant, headConstant*width, "AI");
        ai.edge();
        ai.aiMovement();
        ai.move();
        ai.naturalMovement();
        ai.show();
        if(ai.health<=0)
            ai = null;
    }
}

function keyPressed() {
    //spacebar
    if (keyCode==32) {
        if(paused){
            paused=false;
            loop();
        }
        else{
            paused=true;
            noLoop();
        }
    } 
}

function addNewElement(probabilityForFood) {
    let x = random(width);
    let y = random(height);
    let p = Math.random();
    if(p<=probabilityForFood)
        elements.push(new Element(x,y,true,elementConstant*width));
    else
        elements.push(new Element(x,y,false,elementConstant*width));
}
