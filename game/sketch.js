var agents = [];
var elements = [];
var type = [true,false];
var bg 

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
}

function draw() {
    background(0);
    // Add new food/poison after each 150 frames
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