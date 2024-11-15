// Interface definitions
interface ILogger {
    log(message: string): void;
    error(message: string): void;
}

interface IUser {
    id: number;
    name: string;
    email: string;
}

// Type definition
type LogLevel = 'info' | 'warning' | 'error';

// Class implementation
class ConsoleLogger implements ILogger {
    private prefix: string;

    constructor(prefix: string = '') {
        this.prefix = prefix;
    }

    log(message: string): void {
        console.log(`${this.prefix}[INFO] ${message}`);
    }

    error(message: string): void {
        console.error(`${this.prefix}[ERROR] ${message}`);
    }
}

// Generic class
class DataStore<T> {
    private items: T[] = [];

    add(item: T): void {
        this.items.push(item);
    }

    getAll(): T[] {
        return [...this.items];
    }
}

// Function with type parameters
function processUser(user: IUser, logger: ILogger): void {
    logger.log(`Processing user: ${user.name}`);
}

// Usage example
const logger = new ConsoleLogger('[App]');
const userStore = new DataStore<IUser>();

const user: IUser = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com'
};

userStore.add(user);
processUser(user, logger);

// Enum example
enum UserRole {
    Admin = 'ADMIN',
    User = 'USER',
    Guest = 'GUEST'
}

// Union type usage
function logWithLevel(message: string, level: LogLevel): void {
    console.log(`[${level.toUpperCase()}] ${message}`);
}

logWithLevel('Test message', 'info'); 