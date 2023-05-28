const initializePendulum = (
  updateGraphData,
  resetGraphData,
  options = {}
) => {
  $(document).ready(function () {
    $('#length').on('input', function () {
      var value = $(this).val();
      $('#lengthValue').text(value);
    });

    $('#gravity').on('input', function () {
      var value = $(this).val();
      $('#gravityValue').text(value);
    });

    $('#airFriction').on('input', function () {
      var value = $(this).val();
      $('#airFrictionVal').text(value);
    });
  });

  const Engine = Matter.Engine;
  const Render = Matter.Render;
  const World = Matter.World;
  const Bodies = Matter.Bodies;
  const Mouse = Matter.Mouse;
  const MouseConstraint = Matter.MouseConstraint;
  const Constraint = Matter.Constraint;
  const Events = Matter.Events;
  const Vector = Matter.Vector;

  const engine = Engine.create();
  const world = engine.world;

  const canvas = document.getElementById('canvas');

  const lengthSlider = document.getElementById('length');
  const gravitySlider = document.getElementById('gravity');
  const airFrictionSlider = document.getElementById('airFriction');

  const lengthValue = document.getElementById('lengthValue');
  const gravityValue = document.getElementById('gravityValue');
  const airFrictionValue = document.getElementById('airFrictionVal');

  const render = Render.create({
    canvas: canvas,
    engine: engine,
    options: {
      width: 800,
      height: 600,
      wireframes: false
    }
  });

  let pendulumLength = options.pendulumLength || 200;
  let gravity = options.gravity || 1;
  let airFriction = options.airFriction || 0;

  lengthSlider.addEventListener('input', function () {
    pendulumLength = parseFloat(this.value);
    lengthValue.textContent = pendulumLength;
    Matter.Body.setStatic(pendulum, false);
    constraint.length = pendulumLength;
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

  const pendulum = Bodies.circle(400, 100, 20, {
    restitution: 0.99,
    frictionAir: airFriction,
    inertia: Infinity,
    density: 50
  });

  const anchor = { x: 400, y: 50 };
  const constraint = Constraint.create({
    pointA: anchor,
    bodyB: pendulum,
    length: pendulumLength,
    density: 0
  });

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

  Matter.World.add(world, [pendulum, constraint, mouseConstraint]);

  const calculatePendulumData = () => {
    const time = new Date();
    const angle = pendulum.angle;
    const angularVelocity = pendulum.angularVelocity;
    const angularAcceleration = pendulum.angularAcceleration;

    updateGraphData(time, angle, angularVelocity, angularAcceleration);
  };

  Matter.Events.on(engine, 'afterUpdate', calculatePendulumData);

  Matter.Render.run(render);
  Matter.Engine.run(engine);

  return setInterval(() => {
    resetGraphData();
  }, 1000);
};

// Create empty arrays to store the data points
let timeData = [];
let angleData = [];
let velocityData = [];
let accelerationData = [];

// Get the graph canvas element
const graphCanvas = document.getElementById('graphCanvas');

// Create a Chart.js chart instance
const chart = new Chart(graphCanvas, {
  type: 'line',
  data: {
    labels: timeData,
    datasets: [
      {
        label: 'Angle',
        borderColor: 'rgb(255, 99, 132)',
        data: angleData
      },
      {
        label: 'Angular Velocity',
        borderColor: 'rgb(54, 162, 235)',
        data: velocityData
      },
      {
        label: 'Angular Acceleration',
        borderColor: 'rgb(75, 192, 192)',
        data: accelerationData
      }
    ]
  },
  options: {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Value'
        }
      }
    }
  }
});

// Function to insert data into the graph
function updateGraphData(time, angle, velocity, acceleration) {
  timeData.push(time);
  angleData.push(angle);
  velocityData.push(velocity);
  accelerationData.push(acceleration);

  chart.update();
}

// Function to reset the graph data
function resetGraphData() {
  timeData = [];
  angleData = [];
  velocityData = [];
  accelerationData = [];

  chart.data.labels = timeData;
  chart.data.datasets[0].data = angleData;
  chart.data.datasets[1].data = velocityData;
  chart.data.datasets[2].data = accelerationData;

  chart.update();
}

initializePendulum(updateGraphData, resetGraphData);
