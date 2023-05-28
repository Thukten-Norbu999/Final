let defaultOptions = {};

const initializeTrajectory = (
  insertToGraph,
  resetGraph,
  options = {}
) => {
  $(document).ready(function () {
    $('#weight').on('input', function () {
      var value = $(this).val();
      $('#weightValue').text(value);
    });

    $('#gravity').on('input', function () {
      var value = $(this).val();
      $('#gravityValue').text(value);
    });
    $('#airFriction').on('input', function () {
      var value = $(this).val();
      $('#airFrictionVal').text(value)
    })
  });

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

  var weightSilder = document.getElementById('weight');
  var gravitySlider = document.getElementById('gravity')
  var airFrictionSlider = document.getElementById('airFriction')

  
  // Initializing world
  const canvas = document.getElementById("canvas");

  if (!canvas) throw new Error("canvas element missing");

  const sizes = { height: 550, width: 850 };
  var render = Render.create({
    canvas: canvas,
    engine: engine,
    options: {
      width: 800,
      height: 600,
      //background: '#f4f4f4',
      wireframes: false
    }

  });
  let weight = options.weight || 200;
  let gravity = options.gravity || 1;
  let airFriction = options.airFriction || 0;

  weightSilder.addEventListener('input', function () {
    weight = parseFloat(this.value);
    weigthValue.textContent = weight;
    ballOptions.density = weight;
    Matter.Engine.update(engine)
  });

  gravitySlider.addEventListener('input', function () {
    gravity = parseFloat(this.value);
    gravityValue.textContent = gravity;
    engine.world.gravity.y = gravity;
    Matter.Engine.update(engine);
  });

  airFrictionSlider.addEventListener('input', function () {
    airFriction = parseFloat(this.value);
    airFrictionValue.textContent = airFriction;
    pendulum.frictionAir = airFriction;
    Matter.Engine.update(engine);
  });
  
  
  // Bodies
  const ballOptions = {
    frictionAir: airFriction * 10,
    density: weight,
  };
  const ballPosition = Vector.create(150, sizes.height / 1.25);
  let ball = Bodies.circle(ballPosition.x, ballPosition.y, 10, ballOptions);
  const sling = Constraint.create({
    pointA: Vector.clone(ball.position),
    stiffness: 0.01,
    bodyB: ball,
    render: {
      type: "line",
    },
  });

  World.add(world, [ball, sling]);

  // Mouse Constraint
  const mouse = Mouse.create(render.canvas);
  const mouseConstraint = MouseConstraint.create(engine, {
    mouse,
    constraint: {
      stiffness: 0.02,
      render: { visible: false },
    },
  });
  
 
  let firing = false;
  let firingBall;

  let startTime;
  Events.on(mouseConstraint, "enddrag", (e) => {
    if (e.body === ball) {
      startTime = new Date();
      resetGraph();
      firing = true;
    }
  });

  Events.on(engine, "afterUpdate", (e) => {
    if (
      firing &&
      Math.abs(ball.position.x - ballPosition.x) < 20 &&
      Math.abs(ball.position.y - ballPosition.y) < 20
    ) {
      firingBall = ball;
      firing = false;

      ball = Bodies.circle(ballPosition.x, ballPosition.y, 10, ballOptions);
      sling.bodyB = ball;
      setTimeout(() => {
        World.add(world, ball);
      }, 1000);
    }

    if (firingBall) {
      if (firingBall.position.y > window.innerHeight) {
        firingBall = null;
      }
    }
  });

  const trail = [];

  Events.on(render, "afterRender", (e) => {
    if (firingBall) {
      if (firingBall.position.y > sizes.height) {
        World.remove(world, firingBall);
        firingBall = null;
        startTime = null;
      } else {
        trail.unshift({
          position: Vector.clone(firingBall.position),
          speed: firingBall.speed,
        });
      }
    }
    Render.startViewTransform(render);

    render.context.globalAlpha = 0.7;

    for (let i = 0; i < trail.length; i++) {
      const { position: point, speed } = trail[i];

      render.context.fillStyle = `rgba(255, 255, 255, ${speed / 20})`;
      render.context.fillRect(point.x, point.y, 2, 2);
    }

    render.context.globalAlpha = 1;
    Render.endViewTransform(render);

    if (trail.length > 200) {
      trail.pop();
    }
  });

  World.add(world, mouseConstraint);
  Engine.run(engine);
  Render.run(render);
  return setInterval(() => {
    if (firingBall) {
      const timeElapsed = (new Date() - startTime) / 1000;
      insertToGraph(
        timeElapsed.toFixed(1),
        Vector.magnitude(firingBall.velocity)
      );
    }
  }, 1000 / 30);
};

// Create empty arrays to store the data points
let timeData = [];
let xData = [];
let vData = [];
let aData = [];

// Get the graph canvas element
const graphCanvas = document.getElementById('graphCanvas');

// Create a Chart.js chart instance
const chart = new Chart(graphCanvas, {
  type: 'line',
  data: {
    labels: timeData,
    datasets: [
      {
        label: 'Position (x)',
        borderColor: 'rgb(255, 99, 132)',
        data: xData,
      },
      {
        label: 'Velocity (v)',
        borderColor: 'rgb(54, 162, 235)',
        data: vData,
      },
      {
        label: 'Acceleration (a)',
        borderColor: 'rgb(75, 192, 192)',
        data: aData,
      },
    ],
  },
  options: {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Value',
        },
      },
    },
  },
});

// Function to insert data into the graph
// Function to insert data into the graph
function insertToGraphFunction(timeElapsed, velocity) {
  // Convert timeElapsed to a number
  timeElapsed = Number(timeElapsed);

  // Calculate position and acceleration based on velocity and time
  const position = 0.5 * velocity * timeElapsed * timeElapsed;
  const acceleration = 2 * velocity / timeElapsed;

  // Push the data points to the respective arrays
  timeData.push(timeElapsed.toFixed(1));
  xData.push(position.toFixed(2));
  vData.push(velocity.toFixed(2));
  aData.push(acceleration.toFixed(2));

  // Update the chart data
  chart.data.labels = timeData;
  chart.data.datasets[0].data = xData;
  chart.data.datasets[1].data = vData;
  chart.data.datasets[2].data = aData;
  chart.update();
}

// Function to reset the graph data
function resetGraphFunction() {
  timeData = [];
  xData = [];
  vData = [];
  aData = [];
  chart.data.labels = timeData;
  chart.data.datasets[0].data = xData;
  chart.data.datasets[1].data = vData;
  chart.data.datasets[2].data = aData;
  chart.update();
}

initializeTrajectory(insertToGraphFunction, resetGraphFunction);
