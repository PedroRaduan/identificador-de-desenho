function setup(){
    canvas = createCanvas(280, 280);
    canvas.center();   
    canvas.mouseReleased(classifyCanvas);
    synth = window.speechSynthesis;
}


function clearCanvas(){
    background('white');
}

function draw(){
    strokeWeight(13);
    stroke(0);
    if(mouseIsPressed){
        line(pmouseX, pmouseY, mouseX, mouseY); 
    }
}

function preload(){
    classifier = ml5.imageClassifier('DoodleNet');
}

function classifyCanvas(){
    classifier.classify(canvas, gotResult);
}



function gotResult(error, results){
    if (error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById('label').innerHTML = 'Desenho: ' + results[0].label;
        document.getElementById('confidence').innerHTML = 'Precisão ' + Math.round(results[0].confidence * 100) + '%';
        
        utterThis = new SpeechSynthesisUtterance(results[0].label);
        synth.speak(utterThis);
    }
}