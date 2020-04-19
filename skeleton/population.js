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
            }
        }
    }

    reproduceBest() {
        if(this.bestAgent==null)
            return;
        else{
            if(this.bestAgent.health<=0.2) {
                agents.push(this.bestAgent.cloneWithTweaks());
                agents.push(this.bestAgent.cloneWithTweaks());
                console.log("Reproduction!");
            }
        }
    }

    massReproducion() {
        //Add 20 new agents
        for(let i=0; i<20; i++) {
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