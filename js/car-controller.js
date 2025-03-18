// CarController.js (Simplified version for Car Controller)
class CarController {
  constructor(world) {
    this.world = world;
    this.car = null;

    // Create car body, shape, and add to the world
    this.createCar();
  }

  createCar() {
    const carMaterial = new CANNON.Material();
    const wheelMaterial = new CANNON.Material();

    // Car body
    const carShape = new CANNON.Box(new CANNON.Vec3(2, 1, 4)); // Size of the car
    this.car = new CANNON.Body({
      mass: 1500,
      position: new CANNON.Vec3(0, 5, 0),
      material: carMaterial
    });
    this.car.addShape(carShape);
    this.world.addBody(this.car);

    // Wheel shapes and positions (optional)
    this.addWheels();
  }

  addWheels() {
    const wheelRadius = 0.6;
    const wheelMass = 50;

    // Adding four wheels
    const wheelPositions = [
      new CANNON.Vec3(-1.5, 0.5, 2), // Front-left
      new CANNON.Vec3(1.5, 0.5, 2),  // Front-right
      new CANNON.Vec3(-1.5, 0.5, -2),// Back-left
      new CANNON.Vec3(1.5, 0.5, -2)  // Back-right
    ];

    this.wheels = wheelPositions.map(pos => {
      const wheelShape = new CANNON.Sphere(wheelRadius);
      const wheelBody = new CANNON.Body({
        mass: wheelMass,
        position: pos,
        material: new CANNON.Material()
      });
      wheelBody.addShape(wheelShape);
      this.world.addBody(wheelBody);
      return wheelBody;
    });
  }

  update(delta) {
    // Update the car's physics each frame
    this.world.step(delta);
  }

  // Drifting logic (e.g., decrease friction to simulate drifting)
  drift(isDrifting) {
    if (isDrifting) {
      this.car.material.friction = 0.1;  // Low friction for drifting
    } else {
      this.car.material.friction = 0.9;  // Regular friction
    }
  }

  getCar() {
    return this.car;
  }
}
