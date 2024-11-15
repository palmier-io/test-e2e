from typing import List, Optional
from dataclasses import dataclass
from abc import ABC, abstractmethod
import asyncio
import logging

# Decorator example
def log_execution(func):
    def wrapper(*args, **kwargs):
        logging.info(f"Executing {func.__name__}")
        result = func(*args, **kwargs)
        logging.info(f"Finished {func.__name__}")
        return result
    return wrapper

# Abstract base class
class Animal(ABC):
    def __init__(self, name: str):
        self.name = name

    @abstractmethod
    def make_sound(self) -> str:
        pass

# Class implementation
class Dog(Animal):
    def __init__(self, name: str, breed: str):
        super().__init__(name)
        self.breed = breed

    def make_sound(self) -> str:
        return f"{self.name} says Woof!"

# Dataclass example
@dataclass
class Person:
    name: str
    age: int
    email: Optional[str] = None

# Async function example
async def process_data(data: List[str]) -> List[str]:
    processed = []
    for item in data:
        # Simulate async processing
        await asyncio.sleep(0.1)
        processed.append(item.upper())
    return processed

# Main execution
@log_execution
def main():
    # Create instances
    dog = Dog("Rex", "German Shepherd")
    person = Person("John Doe", 30, "john@example.com")

    # List comprehension
    numbers = [x * 2 for x in range(5)]

    # Dictionary comprehension
    square_map = {x: x**2 for x in range(5)}

    # Async execution
    async def run_async():
        data = ["hello", "world", "async"]
        result = await process_data(data)
        print(f"Processed data: {result}")

    # Run async code
    asyncio.run(run_async()) 