var agents = [];
var elements = [];
var type = [true,false];
var bg; 
var paused = false;

function preload() {
    bg = createImg('../resources/bg2.jpg');
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
}function keyPressed() {
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

function setup() {
    agents.push(new Agent(random(width),random(height)));
    var canvas = createCanvas(1000, 600);
    for(let i=0; i<25; i++) {
        elements.push(new Element(
                                random(0.05*width, 0.95*width),
                                random(0.05*height, 0.95*height),
                                type[Math.floor(Math.random()*type.length)]
                                )
                    );
    }
    bg.size(width,height);
    bg.position(0,0);
    bg.style('z-index: -1');
}

function draw() {
    clear();

    if(frameCount % 60==0) {
        elements.push(new Element(
                                random(0.05*width, 0.95*width),
                                random(0.05*height, 0.95*height),
                                type[Math.floor(Math.random()*type.length)]
                                )
                    );
    }

    for(var elem of elements) {
        elem.show();
        elem.vibrate();
    } 
    
    for(let i=agents.length-1; i>=0; i--) {
        agents[i].healthBar(width*0.75,10);
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