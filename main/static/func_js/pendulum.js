var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Body = Matter.Body,
    Bodies = Matter.Bodies,
    Composites = Matter.Composites,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    Composite = Matter.Composite,
    Constraint = Matter.Constraint

// create engine
var engine = Engine.create(),
    world = engine.world;

// create renderer
var render = Render.create({
    canvas: document.querySelector("#canvas"),
    engine: engine,
    options: {
        width: 800,
        height: 600,
        showVelocity: true
    }
});

Render.run(render);

// create runner
var runner = Runner.create();
Runner.run(runner, engine);
world.gravity.scale *= gravityMultiplier;

  const pendulumn = Bodies.circle(sizes.width / 2, 250, 25, {
    friction: 0,
    frictionAir: 0.0001 * frictionAir,
    inertia: Infinity,
    slop: 1,
    restitution,
  });
  const constraint = Constraint.create({
    pointA: { x: sizes.width / 2 + 50, y: 50 },
    bodyB: pendulumn,
    damping,
  });
  World.add(world, [pendulumn, constraint]);

  Body.translate(pendulumn, { x: -200, y: -150 });

// see newtonsCradle function defined later in this file
var ball = Body.create()
Composite.add(world, mouseConstraint);

// keep the mouse in sync with rendering
render.mouse = mouse;

// fit the render viewport to the scene
Render.lookAt(render, {
    min: { x: 0, y: 50 },
    max: { x: 800, y: 600 }
});

// Add gravity, restitution, resistance, and damping sliders

// Gravity slider
// Gravity slider
var gravitySlider = document.querySelector("#gravity");
gravitySlider.addEventListener('input', function() {
    engine.world.gravity.y = parseFloat(gravitySlider.value);
});

// Restitution slider
var restitutionSlider = document.querySelector("#restitution");
restitutionSlider.addEventListener('input', function() {
    for (var i = 0; i < cradle.bodies.length; i++) {
        cradle.bodies[i].restitution = parseFloat(restitutionSlider.value);
    }
});

// Resistance slider
var resistanceSlider = document.querySelector("#airFriction");
resistanceSlider.addEventListener('input', function() {
    
});

// Damping slider
var dampingSlider = document.querySelector("#damping");
dampingSlider.addEventListener('input', function() {
    
});

/**
 * Creates a composite with a Newton's Cradle setup of bodies and constraints.
 * @method newtonsCradle
 * @param {number} xx
 * @param {number} yy
 * @param {number} number
 * @param {number} size
 * @param {number} length
 * @return {composite} A new composite newtonsCradle body
 */
function newtonsCradle(xx, yy, number, size, length) {
    var newtonsCradle = Composite.create({ label: 'Newtons Cradle' });

    for (var i = 0; i < number; i++) {
        var separation = 1.9,
            circle = Bodies.circle(
                xx + i * (size * separation),
                yy + length,
                size,
                {
                    inertia: Infinity,
                    restitution: 1,
                    friction: 0,
                    frictionAir: 0,
                    slop: size * 0.02
                }
            ),
            constraint = Constraint.create({
                pointA: { x: xx + i * (size * separation), y: yy },
                bodyB: circle
            });

        Composite.addBody(newtonsCradle, circle);
        Composite.addConstraint(newtonsCradle, constraint);
    }

    return newtonsCradle;
}

// context for MatterTools.Demo
var context = {
    engine: engine,
    runner: runner,
    render: render,
    canvas: render.canvas,
    stop: function() {
        Matter.Render.stop(render);
        Matter.Runner.stop(runner);
    }
};
