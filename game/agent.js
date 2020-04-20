class Agent {
    constructor(x, y, s=17, col=color(0,255,236)) {
        this.position = createVector(x,y);
        this.velocity = p5.Vector.random2D();
        this.velocity.setMag(random(2,3));
        this.acceleration = createVector();
        this.temp=createVector(); //temporary vector
        this.size=s;
        this.col = col;
        this.trails=[];
        this.length = (5/4)*this.size;
        this.pos=createVector();
        this.maxSpeed = 3;
        this.maxForce = .2;
        this.health = 50;
        this.maxHealth = 100;
        this.h = 0;
    }

    //Steering force = Desired - current
    manualMovement() {
        let Steering = createVector();
        if(keyIsDown(LEFT_ARROW)) {
            Steering.add(0,this.position.y);    //Desired
            this.commonSteeringModifications(Steering);
        }
        if(keyIsDown(RIGHT_ARROW)) {
            Steering.add(width,this.position.y);
            this.commonSteeringModifications(Steering);
        }
        if(keyIsDown(UP_ARROW)) {
            Steering.add(this.position.x,0);
            this.commonSteeringModifications(Steering);
        }
        if(keyIsDown(DOWN_ARROW)) {
            Steering.add(this.position.x,height);
            this.commonSteeringModifications(Steering);
        }
    }

    commonSteeringModifications(Steering) {
        Steering.sub(this.position);    //Desired - Current
        Steering.setMag(this.maxSpeed);
        Steering.sub(this.velocity);
        Steering.limit(this.maxForce);
        this.acceleration.add(Steering);
    }

    edge() {
        if(this.position.x>width-this.size/2)
            this.position.x = this.size/2;
        if(this.position.x<this.size/2)     
            this.position.x = width-this.size/2;
        if(this.position.y>height-this.size/2)
            this.position.y = this.size/2;
        if(this.position.y<this.size/2)
            this.position.y = height-this.size/2;
    }
    
    move() {
        this.position.add(this.velocity);
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed);

        this.temp=createVector(this.position.x,this.position.y);
        this.trails.push(this.temp);        
        if(this.trails.length>this.length)
            this.trails.splice(0,1);    

        this.health-=0.05;
    }

    show() {
        for(var i=this.trails.length-1; i>=0 ;i--) {
            this.pos=this.trails[i];
            noStroke();
            fill(this.col);
            ellipse(this.pos.x,this.pos.y,i/3);
        }
        ellipse(this.position.x,this.position.y,this.size);
    }

    naturalMovement() {
        this.position.x += random(-.7,.7);
        this.position.y += random(-.7,.7);
    }

    eat(elements) {
        var d=[];
        for(var i=elements.length-1; i>=0; i--) {
            d=dist(this.position.x, this.position.y, elements[i].x, elements[i].y);
            if (d<=this.size/2+elements[i].dimension/2) {
                if(elements[i].food) {
                    if(this.health<50) {
                        this.health+=5;
                    }
                }
                else {
                    this.health-=5;
                }
                elements.splice(i,1);
            }
        }
    }

    healthBar(x,y,content="default") {
        fill(this.col);
        textSize(this.size);
        textStyle(BOLD);
        text(content,x,y);
        
        let fraction = this.health/this.maxHealth;
        let currentColor = lerpColor(color(255,0,0),color(0,255,0),fraction);
        let b = this.size;
        let l = lengthConstant*width;
        
        this.h+=0.2;
        this.h%=5;
        //inner
        fill(currentColor);
        rect(x,y+this.size/2,fraction*l,b);
        
        //outer
        noFill();
        if(this.health<=20)
            strokeWeight(this.h);
        else
            strokeWeight(2);
        stroke(255);
        rect(x,y+this.size/2,l,b);
    }
}