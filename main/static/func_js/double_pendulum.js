const doublePendulum = () => {
    const Engine = Matter.Engine;
    const Events = Matter.Events;
    const Render = Matter.Render;
    const Runner = Matter.Runner;
    const Body = Matter.Body;
    const Composite = Matter.Composite;
    const Composites = Matter.Composites;
    const Constraint = Matter.Constraint;
    const MouseConstraint = Matter.MouseConstraint;
    const Mouse = Matter.Mouse;
    const Bodies = Matter.Bodies;
    const Vector = Matter.Vector;
  
    // create engine
    const engine = Engine.create();
    const world = engine.world;
  
    // create renderer
    const render = Render.create({
      canvas: document.getElementById('canvas'),
      engine: engine,
      options: {
        width: 800,
        height: 600,
        wireframes: false
      }
    });
  
    Render.run(render);
  
    // create runner
    const runner = Runner.create();
    Runner.run(runner, engine);
  
    // add bodies
    const group = Body.nextGroup(true);
    const length = 200;
    const width = 25;
  
    const pendulum = Composites.stack(350, 160, 2, 1, -20, 0, function (x, y) {
      return Bodies.rectangle(x, y, length, width, {
        collisionFilter: { group: group },
        frictionAir: 0,
        chamfer: 5,
        render: {
          fillStyle: 'transparent',
          lineWidth: 1
        }
      });
    });
  
    engine.gravity.scale = 0.002;
  
    Composites.chain(pendulum, 0.45, 0, -0.45, 0, {
      stiffness: 0.9,
      length: 0,
      angularStiffness: 0.7,
      render: {
        strokeStyle: '#4a485b'
      }
    });
  
    Composite.add(pendulum, Constraint.create({
      bodyB: pendulum.bodies[0],
      pointB: { x: -length * 0.42, y: 0 },
      pointA: { x: pendulum.bodies[0].position.x - length * 0.42, y: pendulum.bodies[0].position.y },
      stiffness: 0.9,
      length: 0,
      render: {
        strokeStyle: '#4a485b'
      }
    }));
  
    const lowerArm = pendulum.bodies[1];
  
    Body.rotate(lowerArm, -Math.PI * 0.3, {
      x: lowerArm.position.x - 100,
      y: lowerArm.position.y
    });
  
    Composite.add(world, pendulum);
  
    let trail = [];
    let currentColor = '#4a485b';
    let oscillationCount = 0;
  
    Events.on(render, 'afterRender', function () {
      trail.unshift({
        position: Vector.clone(lowerArm.position),
        speed: lowerArm.speed
      });
  
      Render.startViewTransform(render);
      render.context.globalAlpha = 0.7;
  
      for (let i = 0; i < trail.length; i += 1) {
        const point = trail[i].position;
        const speed = trail[i].speed;
  
        const hue = 250 + Math.round((1 - Math.min(1, speed / 10)) * 170);
        render.context.fillStyle = currentColor;
        render.context.fillRect(point.x, point.y, 2, 2);
      }
  
      render.context.globalAlpha = 1;
      Render.endViewTransform(render);
  
      if (trail.length > 2000) {
        trail.pop();
      }
  
      const angle = lowerArm.angle;
      const threshold = 0.01;
  
      if (angle < threshold && angle > -threshold) {
        oscillationCount++;
        if (oscillationCount % 2 === 0) {
          currentColor = getRandomColor();
        }
      }
    });
  
    // add mouse control
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
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
      max: { x: 700, y: 600 }
    });
  
    // return objects for MatterTools.Demo
    return {
      engine: engine,
      runner: runner,
      render: render,
      canvas: render.canvas,
      stop: function () {
        Matter.Render.stop(render);
        Matter.Runner.stop(runner);
      }
    };
  };
  
  doublePendulum.title = 'Double Pendulum';
  doublePendulum.for = '>0.16.1';
  
  if (typeof module !== 'undefined') {
    module.exports = doublePendulum;
  }
  
  // Helper function to get a random color
  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  