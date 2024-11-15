import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

interface Printable {
    void print();
}

abstract class Shape implements Printable {
    protected String name;
    protected double area;

    public Shape(String name) {
        this.name = name;
    }

    abstract double calculateArea();
}

class Circle extends Shape {
    private double radius;

    public Circle(String name, double radius) {
        super(name);
        this.radius = radius;
    }

    @Override
    double calculateArea() {
        this.area = Math.PI * radius * radius;
        return this.area;
    }

    @Override
    public void print() {
        System.out.printf("%s - Area: %.2f%n", name, calculateArea());
    }
}

public class Example {
    private static List<Shape> shapes = new ArrayList<>();

    public static void main(String[] args) {
        // Lambda expression
        Runnable task = () -> System.out.println("Hello from lambda!");
        task.run();

        // Stream and Optional usage
        shapes.add(new Circle("Small Circle", 2.0));
        shapes.add(new Circle("Large Circle", 5.0));

        Optional<Shape> firstShape = shapes.stream()
            .filter(s -> s.calculateArea() > 50)
            .findFirst();

        firstShape.ifPresent(Shape::print);

        // Method reference
        shapes.forEach(Shape::print);
    }
} 