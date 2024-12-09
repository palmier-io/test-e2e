package com.example

import kotlinx.coroutines.*
import java.time.LocalDateTime

// Data class
data class User(
    val id: Int,
    val name: String,
    val email: String
)

// Sealed class for representing states
sealed class Result<out T> {
    data class Success<T>(val data: T) : Result<T>()
    data class Error(val message: String) : Result<Nothing>()
    object Loading : Result<Nothing>()
}

// Interface definition
interface Repository<T> {
    suspend fun getById(id: Int): Result<T>
    suspend fun getAll(): Result<List<T>>
}

// Class implementation with generics
class UserRepository : Repository<User> {
    private val users = mutableListOf<User>()

    override suspend fun getById(id: Int): Result<User> = withContext(Dispatchers.IO) {
        delay(100) // Simulate network delay
        users.find { it.id == id }?.let { Result.Success(it) }
            ?: Result.Error("User not found")
    }

    override suspend fun getAll(): Result<List<User>> = withContext(Dispatchers.IO) {
        Result.Success(users.toList())
    }
}

// Extension function
fun LocalDateTime.formatNicely(): String = 
    "${this.dayOfMonth}/${this.monthValue}/${this.year}"

// Main function with coroutines
suspend fun main() = coroutineScope {
    val repository = UserRepository()
    
    // Structured concurrency
    launch {
        when (val result = repository.getById(1)) {
            is Result.Success -> println("Found user: ${result.data}")
            is Result.Error -> println("Error: ${result.message}")
            is Result.Loading -> println("Loading...")
        }
    }
    
    // Collection operations
    val numbers = (1..10).toList()
    val doubled = numbers
        .filter { it % 2 == 0 }
        .map { it * 2 }
    
    // String template
    println("Doubled numbers: $doubled")
    
    // Scope function
    User(1, "John Doe", "john@example.com").apply {
        println("Created user: $name")
    }
} 