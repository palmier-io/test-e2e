// Class definition
class Vehicle {
    constructor(make, model, year) {
        this.make = make;
        this.model = model;
        this.year = year;
    }

    getInfo() {
        return `${this.year} ${this.make} ${this.model}`;
    }
}

// Inheritance
class Car extends Vehicle {
    constructor(make, model, year, doors) {
        super(make, model, year);
        this.doors = doors;
    }

    // Async method example
    async startEngine() {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(`${this.getInfo()} engine started`);
            }, 1000);
        });
    }
}

// Array methods and arrow functions
const vehicles = [
    new Car('Toyota', 'Camry', 2020, 4),
    new Car('Honda', 'Civic', 2019, 4),
    new Car('Tesla', 'Model 3', 2021, 4)
];

// Async/await example
async function testVehicles() {
    try {
        for (const vehicle of vehicles) {
            const result = await vehicle.startEngine();
            console.log(result);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Object destructuring
const { make, model } = vehicles[0];
console.log(`First vehicle: ${make} ${model}`);

// Map and filter examples
const vehicleInfo = vehicles
    .filter(v => v.year >= 2020)
    .map(v => v.getInfo());

console.log('Newer vehicles:', vehicleInfo);

// Run async function
testVehicles(); 