<?php

declare(strict_types=1);

namespace App\Examples;

// Interface definition
interface DatabaseConnection {
    public function connect(): void;
    public function query(string $sql): array;
}

// Trait implementation
trait Loggable {
    private function log(string $message): void {
        echo "[" . date('Y-m-d H:i:s') . "] $message\n";
    }
}

// Class implementation with constructor property promotion
class MySQLConnection implements DatabaseConnection {
    use Loggable;

    public function __construct(
        private string $host,
        private string $username,
        private string $password,
        private ?string $database = null
    ) {}

    public function connect(): void {
        $this->log("Connecting to MySQL database...");
    }

    public function query(string $sql): array {
        return [];
    }
}

// Example with nullable types and return type declarations
class UserRepository {
    public function __construct(
        private DatabaseConnection $db
    ) {}

    public function findById(int $id): ?array {
        return $this->db->query("SELECT * FROM users WHERE id = $id");
    }
}

// Usage with type hints
$db = new MySQLConnection(
    host: 'localhost',
    username: 'root',
    password: 'secret'
);

$userRepo = new UserRepository($db);

// Array destructuring
$config = [
    'debug' => true,
    'cache' => false
];

['debug' => $isDebug] = $config;

// Match expression (PHP 8+)
$status = 404;
$message = match ($status) {
    200, 201 => 'Success',
    404 => 'Not Found',
    500 => 'Server Error',
    default => 'Unknown Status'
};

// Arrow functions
$numbers = [1, 2, 3, 4, 5];
$doubled = array_map(fn($n) => $n * 2, $numbers); 