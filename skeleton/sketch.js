var agents = [];
var elements = [];
var type = [true,false];
var paused = false;

function setup() {
    var canvas = createCanvas(1000, 600);
    
    for(let i=0; i<10; i++) 
        agents.push(new Agent(random(width),random(height)));
    
    for(let i=0; i<400; i++) {
        elements.push(new Element(
                                random(0.05*width, 0.95*width),
                                random(0.05*height, 0.95*height),
                                type[Math.floor(Math.random()*type.length)]
                                )
                    );
    }
}

function draw() {
    background(50);

    if(frameCount%60 == 0) {
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