class Population {
    constructor() {
        this.recordFitness = null;
        this.recordAgent = null;
        this.bestAgent = null;
    }

    maxFitness() {
        this.bestAgent=null;
        let maxFitness = -Infinity;
        let best = -1;
        for(let i=0; i<agents.length; i++){
            if(agents[i].calcFitness() > maxFitness){
                maxFitness = agents[i].calcFitness();
                this.bestAgent = agents[i];
                best=i;
            }
        }
        if(this.bestAgent!=null) {
            agents[best].highlight();
            if(this.bestAgent.calcFitness() > this.recordFitness){
                this.recordAgent = this.bestAgent;
                this.recordFitness = this.bestAgent.calcFitness();
                let accuracy = 100*this.recordAgent.foodEaten/(this.recordAgent.foodEaten + this.recordAgent.poisonEaten);
                document.getElementById("rf").innerHTML = this.recordFitness.toFixed(5);
                document.getElementById("fr").innerHTML = frameCount;
                document.getElementById("rt").innerHTML = this.recordAgent.foodEaten + this.recordAgent.poisonEaten;
                document.getElementById("ra").innerHTML = accuracy.toFixed(3)+' %';
                document.getElementById("rgf").innerHTML = this.recordAgent.gene[0].toFixed(5);
                document.getElementById("rgp").innerHTML = this.recordAgent.gene[1].toFixed(5);
            }
            let accuracy = 100*this.bestAgent.foodEaten/(this.bestAgent.foodEaten + this.bestAgent.poisonEaten);
            document.getElementById("mf").innerHTML = this.bestAgent.calcFitness().toFixed(5);
            document.getElementById("ct").innerHTML = this.bestAgent.foodEaten + this.bestAgent.poisonEaten;
            document.getElementById("ca").innerHTML = accuracy.toFixed(3)+' %';
            document.getElementById("cgf").innerHTML = this.bestAgent.gene[0].toFixed(5);
            document.getElementById("cgp").innerHTML = this.bestAgent.gene[1].toFixed(5);
        }
    }

    reproduceBest() {
        if(this.bestAgent==null)
            return;
        else{
            if(this.bestAgent.health<=0.2) {
                agents.push(this.bestAgent.cloneWithTweaks());
                // agents.push(this.bestAgent.cloneWithTweaks());
                console.log("Reproduction!");
            }
        }
    }

    massReproduction() {
        //Add 20 new agents
        for(let i=0; i<30; i++) {
            let newGene = [
                // this.bestAgent.gene[0] + random(-0.01, 0.01),
                // this.bestAgent.gene[1] + random(-0.01, 0.01)
                this.recordAgent.gene[0] + random(-0.01, 0.01),
                this.recordAgent.gene[1] + random(-0.01, 0.01)                              
            ];
            let x = random(width);
            let y = random(height);
            agents.push(new Agent(x, y, newGene));         
        }
    }
}