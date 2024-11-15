use std::collections::HashMap;
use std::sync::{Arc, Mutex};
use std::thread;

// Trait definition
trait Drawable {
    fn draw(&self);
    fn get_name(&self) -> &str;
}

// Struct implementation
struct Rectangle {
    name: String,
    width: u32,
    height: u32,
}

impl Drawable for Rectangle {
    fn draw(&self) {
        println!("Drawing {} ({} x {})", self.name, self.width, self.height);
    }

    fn get_name(&self) -> &str {
        &self.name
    }
}

// Generic function
fn print_info<T: Drawable>(item: &T) {
    println!("Item name: {}", item.get_name());
    item.draw();
}

fn main() {
    // Vector with ownership example
    let mut shapes: Vec<Box<dyn Drawable>> = Vec::new();
    shapes.push(Box::new(Rectangle {
        name: String::from("Rectangle 1"),
        width: 10,
        height: 20,
    }));

    // HashMap example
    let mut map = HashMap::new();
    map.insert("key1", "value1");
    map.insert("key2", "value2");

    // Thread-safe counter with Arc and Mutex
    let counter = Arc::new(Mutex::new(0));
    let mut handles = vec![];

    for _ in 0..3 {
        let counter_clone = Arc::clone(&counter);
        let handle = thread::spawn(move || {
            let mut num = counter_clone.lock().unwrap();
            *num += 1;
        });
        handles.push(handle);
    }

    for handle in handles {
        handle.join().unwrap();
    }

    println!("Final count: {}", *counter.lock().unwrap());

    // Use shapes
    for shape in shapes.iter() {
        print_info(shape.as_ref());
    }
} 