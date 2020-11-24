
const flightPath = {
    curviness: 1.25, 
    autoRotate: true, 
    values: [
        {x: 100, y: -20},
        {x: 300, y: 10}, 
        {x: 500, y: 100},
        {x: 750, y: -100},
        {x: 350, y: -50}, 
        {x: 600, y: 100}, 
        {x: 800, y:0}, 
        {x:window.innerWidth, y:-250}
    ]
}; 

const tween = new TimelineLite(); 

tween.add(
    TweenLite.to(".paperPlane", 2, {
        bezier: flightPath, 
        ease: Power1.easeInOut
    })
); 

// const controller = new ScrollMagic.Controller(); 

// const scene= new ScrollMagic.Scene({
//     triggerElement: ".paperAnim", 
//     duration: 1000,
//     triggerHook: 0, 
// })
//     .setTween(tween)
//     .setPin('.paperAnim')
//     .addTo(controller); 

const paperPlane = document.querySelector(".paperPlane"); 
const t1 = new TimelineMax({repeat:100}); 

t1.add(tween,1); 

// t1.to(paperPlane, .3, {x: 100, y: -20}, );

const flightPath1 = {
    curviness: 1.25, 
    autoRotate: true, 
    values: [
        {x: 0, y: 0},
        {x: 150, y: -100},
        {x: 50, y: -60}, 
        {x: 150, y: 100}, 
        {x: 200, y: 90}, 
        {x:window.innerWidth, y:-250}
    ]
}; 

const tween2 = new TimelineLite(); 

tween2.add(
    TweenLite.to(".paperPlane2", 1.3, {
        bezier: flightPath1, 
        ease: Power1.easeInOut
    })
);

const paperPlane2 = document.querySelector(".paperPlane2"); 
const t2 = new TimelineMax({repeat:100}); 

t2.add(tween2,1);