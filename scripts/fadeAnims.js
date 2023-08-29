function fadeIn(item) {
    if ( !(item.classList.contains("fader")) ) {
        item.classList.add("fader");
        
        item.addEventListener("animationend", (event) => {
            if (event.target.classList.contains("fadeOut")) {
                event.target.style.display = "none";
            }
        });
    }
    item.classList.remove("fadeOut");
    item.classList.add("fadeIn");
    
}

function fadeOut(item) {
    item.classList.remove("fadeIn");
    item.classList.add("fadeOut");
}