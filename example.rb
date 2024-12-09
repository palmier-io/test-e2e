# Module for mixing in shared behavior
module Loggable
  def log(message)
    puts "[#{Time.now}] #{message}"
  end
end

# Base class using Ruby's class system
class Vehicle
  include Loggable
  attr_reader :brand, :model
  
  def initialize(brand, model)
    @brand = brand
    @model = model
  end
  
  # Class method
  def self.types
    ['Car', 'Motorcycle', 'Truck']
  end
end

# Class inheritance
class Car < Vehicle
  def initialize(brand, model, doors)
    super(brand, model)
    @doors = doors
  end
  
  # Symbol proc syntax
  def details
    log "Car Details: #{[@brand, @model, @doors].join(', ')}"
  end
end

# Example usage with blocks and enumeration
vehicles = [
  Car.new('Toyota', 'Camry', 4),
  Car.new('Honda', 'Civic', 4)
]

# Block syntax
vehicles.each do |vehicle|
  vehicle.details
end

# Hash with symbols
config = {
  environment: 'production',
  max_connections: 5,
  debug: false
}

# String interpolation and safe navigation operator
puts "Running in #{config[:environment]}&.upcase" 