noseX = 0;
noseY = 0;
difference = 0;
leftWristX = 0;
rightWristX = 0;
shape = "";

function setup() {
    canvas = createCanvas(600 , 450);
    canvas.position(900,180)
    Video = createCapture(VIDEO);
    Video.position(50,180)
    Video.size(600 , 450)

    posenet = ml5.poseNet(Video , modelLoaded)
    posenet.on('pose' , gotPoses)
}

function modelLoaded() {
    console.log("Posenet is Initiallized !!!!")
}

function gotPoses(results) {
    if(results.length > 0) {
        console.log(results)
        noseX = results[0].pose.nose.x
        noseY = results[0].pose.nose.y
        console.log(noseX , noseY)
        leftWristX = results[0].pose.leftWrist.x
        rightWristX = results[0].pose.rightWrist.x
        difference = Math.floor(leftWristX - rightWristX)
        console.log(difference)
    }
}

function draw() {
    background("#B4B1B1")
    document.getElementById("result").innerHTML = "The length and the breadth of the shape is " + difference + "px"

    fill("#057CFA")
    stroke("white")
    shape = document.getElementById("drop").value

    if(shape == "triangle") {
        diff = difference/2
        x1 = noseX - diff
        y = noseY + diff
        x3 = noseX + diff
        triangle(x1,y,noseX,noseY,x3,y)
    }else if(shape == "flower") {
        translate(noseX , noseY)
        noStroke()
        for(i=0 ; i<12 ; i++) {
            ellipse(0,50,20,difference)
            rotate(PI/6)
        }
    }else if(shape == "rectangle") {
        width = difference * 0.66
        rect(noseX,noseY,difference,width)
    }else if(shape == "square") {
        square(noseX,noseY,difference)
    }else{
        circle(noseX,noseY,difference)
    }
}