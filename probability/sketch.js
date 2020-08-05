var elements = [];
var slider;

function setup() {
    createCanvas(window.innerWidth-400, window.innerHeight);
    slider = createSlider(0, 1, 0.5, 0.001);
    slider.position = (width-350, 20);
    slider.style('width', '200px');
    slider.attribute('class', 'slider');
}

function draw() {
    background(50);
    noStroke();
    for(var elem of elements)
        elem.show();
    
    if(keyIsDown(69)) 
        addNewElement(slider.value(), 1);

}

class Element {
    constructor(x,y,type) {
        this.x = x;
        this.y = y;        
        this.type = type;
    }

    show() {
        if(this.type)
            fill(255);
        else
            fill(0);
        ellipse(this.x, this.y, 6);
    }
}

function addNewElement(probabilityForFood) {
    let p = Math.random();
    let x = random(width);
    let y = random(height);
    
    if(p<=probabilityForFood) 
        elements.push(new Element(x,y,true));
    else
        elements.push(new Element(x,y,false));
}
