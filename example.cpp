#include <iostream>
#include <string>
#include <vector>
#include <memory>

template<typename T>
class Container {
private:
    std::vector<T> elements;

public:
    void add(const T& element) {
        elements.push_back(element);
    }

    void print() const {
        for (const auto& element : elements) {
            std::cout << element << " ";
        }
        std::cout << std::endl;
    }
};

class Animal {
protected:
    std::string name;

public:
    Animal(const std::string& n) : name(n) {}
    virtual ~Animal() = default;
    virtual void makeSound() const = 0;
};

class Dog : public Animal {
public:
    Dog(const std::string& n) : Animal(n) {}
    void makeSound() const override {
        std::cout << name << " says: Woof!" << std::endl;
    }
};

int main() {
    // Template class usage
    Container<int> numbers;
    numbers.add(1);
    numbers.add(2);
    numbers.add(3);
    numbers.print();

    // Smart pointers and polymorphism
    std::vector<std::unique_ptr<Animal>> animals;
    animals.push_back(std::make_unique<Dog>("Rex"));
    animals.push_back(std::make_unique<Dog>("Max"));

    for (const auto& animal : animals) {
        animal->makeSound();
    }

    return 0;
} 