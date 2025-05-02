interface User {
    id: number;
    name: string;
}

const users: User[] = [
    {
        id: 1,
        name: 'Juan Pablo'
    },
    {
        id: 2,
        name: 'Susana'
    }
];

export const getUserById = (id: number, callback: (error?: string, user?: User) => void) => {
    const user = users.find(user => user.id === id);
    
    (user) ? callback(undefined, user) : callback(`User not found with id ${id}`);
}
