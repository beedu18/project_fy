var agents = [];
var elements = [];
var paused = false;
var population;
var statistics = [];

function setup() {
    var canvas = createCanvas(1000, 600);
    
    for(let i=0; i<30; i++) 
        agents.push(new Agent(random(width),random(height)));
     
    addNewElement(0.5, 500);

    population = new Population();    
}

function draw() {
    document.getElementById("frate").innerHTML = frameRate().toFixed(0);
    document.getElementById("fp").innerHTML = frameCount;
    background(50);

    population.maxFitness();
    if(frameCount%5 == 0) 
        addNewElement(0.5,1);
    
    population.reproduceBest();

    for(let i=elements.length-1; i>=0; i--) {
        elements[i].show();
        elements[i].vibrate();
        elements[i].edge();
        if(elements[i].lifetime<=0)
            elements.splice(i,1);
    } 

    if(agents.length==0){
        elements=[];
        // worms.splice(0,worms.length);
        population.massReproduction();
        addNewElement(0.5, 500);
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

    if(frameCount%10 == 0)
        statistics.push(pushAgent(population.bestAgent, frameCount));
    
    if(frameCount == 10000)
        exportLog(statistics);
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

function addNewElement(probabilityForFood, iterations) {
    for(let i=0; i<iterations; i++) {
        let p = Math.random();
        let x = random(width);
        let y = random(height);
        if(p<=probabilityForFood) 
            elements.push(new Element(x,y,true));
        
        else
            elements.push(new Element(x,y,false))
    }
}

function pushAgent(agent, frame) {
    let struct = new Object();
    struct.foodScale = parseFloat(agent.gene[0].toFixed(5));
    struct.poisonScale = parseFloat(agent.gene[1].toFixed(5));
    struct.y1 = parseFloat(agent.calcFitness().toFixed(3)); //fitness
    struct.y2 = parseFloat((agent.foodEaten/(agent.foodEaten+agent.poisonEaten)).toFixed(5)); //accuracy
    struct.y3 = parseFloat(agent.nutrition);
    struct.y4 = parseFloat(agent.health.toFixed(3));
    struct.x = frame;
    return struct;
}

function exportLog(dataArray) {
    const filename = 'data.json';
    const jsonStr = JSON.stringify(dataArray);
    
    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(jsonStr));
    element.setAttribute('download', filename);
    
    element.style.display = 'none';
    document.body.appendChild(element);
    
    element.click();
    
    document.body.removeChild(element);
}