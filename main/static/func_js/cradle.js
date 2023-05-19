const matterContainer = document.querySelector(".canvas-container")

// Create an engine
var engine = Matter.Engine.create();

        // Set up the renderer
        var render = Matter.Render.create({
            element: matterContainer,
            engine: engine,
            options: {
                width: 800,  // Adjust according to your needs
                height: 400, // Adjust according to your needs
                wireframes: false
            }
        });

        var pivot = Matter.Composite.create({ isStatic: true });
        Matter.Composite.add(pivot, Matter.Bodies.rectangle(400, 100, 5, 5));

        // Create the bodies for the Newton's cradle
        var cradleBodies = [];
        var yPos = 150; // Adjust the y-position of the balls
        var spaceBetween = 40; // Adjust the space between the balls

        for (var i = 0; i < 5; i++) {
            var xPos = 300 + (i - 2) * spaceBetween; // Adjust the x-position of the balls
            var ball = Matter.Bodies.circle(xPos, yPos, 20, { restitution: 1 });
            cradleBodies.push(ball);
        }

        // Create the constraints for the Newton's cradle
        var cradleConstraints = [];
        for (var i = 0; i < 5; i++) {
            var constraint = Matter.Constraint.create({
                bodyA: pivot,
                bodyB: cradleBodies[i],
                pointB: { x: (i - 2) * spaceBetween, y: 0 },
                stiffness: 0.4,
                length: 0
            });
            cradleConstraints.push(constraint);
        }

        // Add the pivot and all bodies and constraints to the world
        Matter.World.add(engine.world, [pivot, ...cradleBodies]);
        Matter.World.add(engine.world, cradleConstraints);

        // Run the engine
        Matter.Engine.run(engine);

        // Run the renderer
        Matter.Render.run(render);