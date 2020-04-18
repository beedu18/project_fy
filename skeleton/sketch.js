var agents = [];
var elements = [];
var type = [true,false];
var paused = false;

function setup() {
    var canvas = createCanvas(1000, 600);
    
    for(let i=0; i<10; i++) 
        agents.push(new Agent(random(width),random(height)));
    
    for(let i=0; i<400; i++) 
        addNewElement(0.5);
}

function draw() {
    background(50);

    if(frameCount%60 == 0) 
        addNewElement(0.5);
    

    for(var elem of elements) {
        elem.show();
        elem.vibrate();
    } 
    
    for(let i=agents.length-1; i>=0; i--) {
        agents[i].show();
        agents[i].edge();
        agents[i].manualMovement();
        agents[i].move();
        agents[i].naturalMovement();
        agents[i].eat(elements);
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
    let p = Math.random();
    let x = random(width);
    let y = random(height);
    if(p<=probabilityForFood) 
        elements.push(new Element(x,y,true));
    
    else
        elements.push(new Element(x,y,false))
}