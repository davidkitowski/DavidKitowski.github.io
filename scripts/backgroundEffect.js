
function BackgroundEffect(id) {
    console.log(id);
    var canvas = document.getElementById(id);
    var ctx = canvas.getContext("2d");

    var amount = 65;
    var floatingCharacters = [];

    var W = window.innerWidth;
    var H = window.innerHeight;

    var fillColor = "rgb(120, 120, 120)";

    setupScreen();
    drawFloatingCharacters();

    function setupScreen() {
    

    
        setCanvasSize();
    
        for (var floaters = 0; floaters < amount; floaters++) {
            floatingCharacters[floaters] = createFloatingCharacter(floaters);
        }
    }

    function setCanvasSize() {
        this.W = window.innerWidth;
        this.H = window.innerHeight;

        ctx.canvas.width = this.W;
        ctx.canvas.height = this.H;
    }


    function createFloatingCharacter(layer) {
        return {x:Math.random() * this.W, y:Math.random() * (this.H / 2) + this.H, word:"word", speed:5, dist: (amount - layer) + 1};
    }
    
    function drawFloatingCharacters() {
        console.log("testestest");
        ctx.clearRect(0,0,this.W,this.H);
        ctx.textRendering = "optimizeSpeed";
        
        for (var floater = 0; floater < amount; floater++) {
            let cur = floatingCharacters[floater];
            let distFromScreen = (cur.dist / amount);
            let layerColor = (120 - 80 * distFromScreen);
    
    
            ctx.font = "" + 155 - 125 * distFromScreen + "px Arial";
    
            ctx.fillStyle = `rgb(${layerColor}, ${layerColor}, ${layerColor})`;
            ctx.fillText("</>", cur.x, cur.y);
        }
        ctx.fillStyle = fillColor;
        //ctx.fill();
        animateFloatingCharacters();
    }
    
    function animateFloatingCharacters() {
        for (var floater = 0; floater < amount; floater++) {
            let cur = floatingCharacters[floater];
    
            cur.y -= (cur.speed / cur.dist) + 0.3;
            if (cur.y < -H / 2) {
                floatingCharacters[floater] = createFloatingCharacter(floater);
            }
        }
    }
    
    var curScroll = document.querySelector("body").getBoundingClientRect().top;
    
    window.addEventListener('scroll', function() {
        let position = document.querySelector("body").getBoundingClientRect().top;
        let yAdjust = curScroll - position;
        for (var floater = 0; floater < amount; floater++) {
            
            let cur = floatingCharacters[floater];
            cur.y -= (yAdjust) * ((cur.speed / cur.dist) * 1);
            curScroll = position;
        }
        
    });
    
    window.addEventListener('resize', function () {
        setCanvasSize();
    });

    this.interval = function () {
        setInterval(drawFloatingCharacters, 13);
    };
    
}

window.addEventListener("FinishedProjectLoading", function () {
    new BackgroundEffect("backgroundEffect").interval();
    //Unfortunately the projects load after the page has finished, so it needs to be done separately.
    new BackgroundEffect("backgroundDemo").interval();
});