var agents = [];
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
    agents.push(new Agent(width/2, height/2, headConstant*width));
    for(let i=0; i<25; i++) {
        addNewElement(0.5);
    }
    bg.size(width,height);
    bg.position(0,0);
    bg.style('z-index: -1');
}

function draw() {
    clear();

    if(frameCount % 60==0) 
        addNewElement(0.5);
    
    for(let i=elements.length-1; i>=0; i--) {
        elements[i].show();
        elements[i].vibrate();
        elements[i].edge();
        if(elements[i].lifetime<=0)
            elements.splice(i,1);
    } 
    
    for(let i=agents.length-1; i>=0; i--) {
        agents[i].healthBar(width*(1-lengthConstant-headConstant), headConstant*width, "PLAYER");
        agents[i].edge();
        agents[i].manualMovement();
        agents[i].move();
        agents[i].naturalMovement();
        agents[i].eat(elements);
        agents[i].show();
        if(agents[i].health<=0)
            agents.splice(i,1);
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
