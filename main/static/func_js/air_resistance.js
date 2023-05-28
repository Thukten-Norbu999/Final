
const init = (

)=>{
    var Bodies = Matter.Bodies,
        Body = Matter.Body,
        Constraint = Matter.Constraint,
        Events = Matter.Events,
        Mouse = Matter.Mouse,
        MouseConstraint = Matter.MouseConstraint,
        Render = Matter.Render,
        Vector = Matter.Vector,
        World = Matter.World,
        Engine = Matter.Engine

    var engine = Engine.create();
    var world = engine.world;
      
   // create runner
var runner = Runner.create();
Runner.run(runner, engine);

// add bodies
Composite.add(world, [
    // falling blocks
    Bodies.rectangle(200, 100, 60, 60, { frictionAir: 0.001 }),
    Bodies.rectangle(400, 100, 60, 60, { frictionAir: 0.05 }),
    Bodies.rectangle(600, 100, 60, 60, { frictionAir: 0.1 }),

    // walls
    Bodies.rectangle(400, 0, 800, 50, { isStatic: true }),
    Bodies.rectangle(400, 600, 800, 50, { isStatic: true }),
    Bodies.rectangle(800, 300, 50, 600, { isStatic: true }),
    Bodies.rectangle(0, 300, 50, 600, { isStatic: true })
]);

// add mouse control
var mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.2,
            render: {
                visible: false
            }
        }
    });

Composite.add(world, mouseConstraint);

// keep the mouse in sync with rendering
render.mouse = mouse;

// fit the render viewport to the scene
Render.lookAt(render, {
    min: { x: 0, y: 0 },
    max: { x: 800, y: 600 }
});


    const canvas = document.querySelector("#canvas")
    
    function createBox(){
        
    }


}