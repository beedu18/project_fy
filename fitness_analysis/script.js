async function loadJSON(path) {
    var data = await fetch(path);
    data = await data.json();
    return data;
}

function formatData(data) {
    var xs = [];
    var foodScale = [];
    var poisonScale = [];
    var y1s = [];
    var y2s = [];
    var y3s = [];
    var y4s = [];
    for(var d of data) {
        xs.push(d.x);
        foodScale.push(d.foodScale);
        poisonScale.push(d.poisonScale);
        y1s.push(d.y1);
        y2s.push(d.y2*100);
        y3s.push(d.y3);
        y4s.push(d.y4);
    }
    return {    "frames": xs, 
                "fitness": y1s, 
                "accuracy": y2s, 
                "nutrition": y3s,
                "health": y4s,
                "foodScale": foodScale,
                "poisonScale": poisonScale
            };
}

function updateChart(ctx,newConfig) {
    ctx.type = newConfig.type;
    ctx.data = newConfig.data;
    ctx.options = newConfig.options;
    ctx.update();
}

function driver(dataPath) {
    var c1x = document.getElementById('chart1').getContext('2d');
    var c2x = document.getElementById('chart2').getContext('2d');
    loadJSON(dataPath).then(function(data) {
        // console.log(data);
        var usableData = formatData(data);
        var c1Config = {
            type: 'line',
            data: {
                labels: usableData.frames,
                datasets: [{
                    label: 'Food Scale',
                    yAxisID: 'Left',
                    data: usableData.foodScale,
                    pointRadius: 0,
                    fill: false,
                    borderColor: 'rgba(0,255,0,.8)',
                    borderWidth: 2
                },{
                    label: 'Poison Scale',
                    yAxisID: 'Left',
                    data: usableData.poisonScale,
                    pointRadius: 0,
                    fill: false,
                    borderColor: 'rgba(255,0,0,.8)',
                    borderWidth: 2
                },{
                    label: 'Fitness',
                    yAxisID: 'Right',
                    data: usableData.fitness,
                    pointRadius: 0,
                    fill: false,
                    borderColor: 'rgba(0,0,255,.8)',
                    borderWidth: 2
                }],
            },
            options: {
                responsive: false,
                scales: {
                    yAxes: [{
                        id: 'Left',
                        type: 'linear',
                        position: 'left',
                        ticks: {
                            suggestedMin: -2.5,
                            suggestedMax: 2.5
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Gene Structure'
                        }
                    }, {
                        id: 'Right',
                        type: 'linear',
                        position: 'right',
                        scaleLabel: {
                            display: true,
                            labelString: 'Fitness Score'
                        }                                
                    }],
                    xAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'Frames'
                        }
                    }]                            
                }
            }
        }
        var c2Config = {
            type: 'line',
            data: {
                labels: usableData.frames,
                datasets: [{
                    label: 'Accuracy',
                    yAxisID: 'Left',
                    data: usableData.accuracy,
                    pointRadius: 0,
                    fill: false,
                    borderColor: 'rgba(0,0,255,.8)',
                    borderWidth: 2
                },{
                    label: 'Health',
                    yAxisID: 'Left',
                    data: usableData.health,
                    pointRadius: 0,
                    fill: false,
                    borderColor: 'rgba(255,0,0,.5)',
                    borderWidth: 2
                },{
                    label: 'Nutrition',
                    yAxisID: 'Right',
                    data: usableData.nutrition,
                    pointRadius: 0,
                    fill: false,
                    borderColor: 'rgba(0,255,0,.8)',
                    borderWidth: 2
                }],
            },
            options: {
                responsive: false,
                scales: {
                    yAxes: [{
                        id: 'Left',
                        type: 'linear',
                        position: 'left',
                        ticks: {
                            callback: function(value, index, values) {
                                return value+'%';
                            },
                            suggestedMax: 100,
                            suggestedMin: 0
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Accuracy/Health %'
                        }
                    }, {
                        id: 'Right',
                        type: 'linear',
                        position: 'right',
                        scaleLabel: {
                            display: true,
                            labelString: 'Nutrition'
                        }                                
                    }],
                    xAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'Frames'
                        }
                    }]
                }
            }
        }
        var genes = new Chart(c1x, c1Config);
        var fitness = new Chart(c2x, c2Config);
        // var accuracy = new Chart(ax, accuracyConfig);
        // var foodEaten = new Chart(fex, foodEatenConfig);
    });
}