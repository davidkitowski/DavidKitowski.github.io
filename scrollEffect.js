const bleep = document.querySelector("section");
window.addEventListener('scroll', function() {
    let position = bleep.getBoundingClientRect().top;
    let xAdjust = (((position - (window.innerHeight / 2)) / window.innerHeight)) * 30;
    bleep.style.setProperty("--rotateX", -1 * xAdjust + "px");
});