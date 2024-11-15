import React, { useState, useEffect } from 'react';

// Interface definitions
interface User {
    id: number;
    name: string;
    email: string;
}

interface UserListProps {
    users: User[];
    onUserSelect: (user: User) => void;
}

// Functional component with hooks
const UserList: React.FC<UserListProps> = ({ users, onUserSelect }) => {
    return (
        <div className="user-list">
            {users.map(user => (
                <div
                    key={user.id}
                    className="user-item"
                    onClick={() => onUserSelect(user)}
                >
                    <h3>{user.name}</h3>
                    <p>{user.email}</p>
                </div>
            ))}
        </div>
    );
};

// Main App component
const App: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    useEffect(() => {
        // Simulated API call
        const fetchUsers = async () => {
            const mockUsers: User[] = [
                { id: 1, name: 'John Doe', email: 'john@example.com' },
                { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
            ];
            setUsers(mockUsers);
        };

        fetchUsers();
    }, []);

    const handleUserSelect = (user: User) => {
        setSelectedUser(user);
    };

    return (
        <div className="app">
            <h1>User Management</h1>
            <UserList users={users} onUserSelect={handleUserSelect} />
            {selectedUser && (
                <div className="selected-user">
                    <h2>Selected User:</h2>
                    <p>Name: {selectedUser.name}</p>
                    <p>Email: {selectedUser.email}</p>
                </div>
            )}
        </div>
    );
};

export default App; 