var agents = [];
var elements = [];
var paused = false;
var population;

function setup() {
    var canvas = createCanvas(1000, 600);
    
    for(let i=0; i<30; i++) 
        agents.push(new Agent(random(width),random(height)));
    
    for(let i=0; i<500; i++) 
        addNewElement(0.5);

    population = new Population();    
}

function draw() {
    document.getElementById("frate").innerHTML = frameRate().toFixed(0);
    document.getElementById("fp").innerHTML = frameCount;
    background(50);

    population.maxFitness();
    if(frameCount%5 == 0) 
        addNewElement(0.5);
    
    population.reproduceBest();

    for(var elem of elements) {
        elem.show();
        elem.vibrate();
        elem.edge();
    } 
    
    if(agents.length==0){
        elements=[];
        // worms.splice(0,worms.length);
        population.massReproduction();
        for(let i=0; i<500; i++) {
            addNewElement(0.5);
        }
    }

    for(let i=agents.length-1; i>=0; i--) {
        agents[i].show();
        agents[i].edge();
        agents[i].move();
        agents[i].eat(elements);
        if(agents[i].health<=0) {
            let x = agents[i].position.x;
            let y = agents[i].position.y;
            for(let i=0;i<5; i++) {
                elements.push(new Element(x,y,true));
                elements.push(new Element(x,y,false));
            }
            agents.splice(i,1);
        }
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