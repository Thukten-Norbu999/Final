const matterContainer = document.querySelector('.canvas-container');

var vel = document.getElementById('')

var Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Composites = Matter.Composites,
        Events = Matter.Events,
        Constraint = Matter.Constraint,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        Body = Matter.Body,
        Composite = Matter.Composite,
        Bodies = Matter.Bodies;


var engine = Engine.create(),
    world = engine.world;

var render = Render.create({
    element: matterContainer,
    engine: engine,
    options: {
        width: matterContainer.clientWidth,
        height: matterContainer.clientHeight,
        background: "#01051c",
        wireframes: false,
        showAngleIndicator: true,
    }
})

var rockOptions = {density: 0.004}, 
    rock = Bodies.polygon(170, 450, 8, 20, rockOptions),
    anchor = { x: 170, y: 450 },
    elastic = Constraint.create({ 
        pointA: anchor, 
        bodyB: rock, 
        length: 0.01,
        damping: 0.01,
        stiffness: 0.05
    });


Composite.add(engine.world, [rock, elastic]);

Events.on(engine, 'afterUpdate', function() {
    if (mouseConstraint.mouse.button === -1 && (rock.position.x > 190 || rock.position.y < 430)) {
        // Limit maximum speed of current rock.
        if (Body.getSpeed(rock) > 45) {
            Body.setSpeed(rock, 45);
        }

        // Release current rock and add a new one.
        rock = Bodies.polygon(170, 450, 7, 20, rockOptions);
        Composite.add(engine.world, rock);
        elastic.bodyB = rock;
    }
});

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

Render.run(render);

var runner = Runner.create();

// run the engine
Runner.run(runner, engine);
function handleResize(matterContainer){
    render.canvas.width = matterContainer.clientWidth;
    render.canvas.heigth = matterContainer.clientHeight;
}

window.addEventListener("resize", ()=>handleResize(matterContainer));