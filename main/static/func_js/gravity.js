var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    Composite = Matter.Composite,
    Bodies = Matter.Bodies;

// create engine
var engine = Engine.create();
var world = engine.world;

// create renderer
var render = Render.create({
    canvas: document.getElementById("canvas"),
    engine: engine,
    options: {
        width: 800,
        height: 600,
        showVelocity: true,
        wireframes: false

    }
});

Render.run(render);

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
var mouse = Mouse.create(render.canvas);
var mouseConstraint = MouseConstraint.create(engine, {
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

console.log("Engine:", engine);
console.log("World:", world);
console.log("Render:", render);
console.log("Runner:", runner);
