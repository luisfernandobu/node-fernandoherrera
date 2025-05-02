"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = getUserById;
const users = [
    {
        id: 1,
        name: 'Juan Pablo'
    },
    {
        id: 2,
        name: 'Susana'
    },
    {
        id: 3,
        name: 'Pedro'
    },
    {
        id: 4,
        name: 'Luis'
    }
];
function getUserById(id, callback) {
    const user = users.find(function (user) {
        return user.id === id;
    });
    if (!user) {
        return callback(`User not found with id ${id}`);
    }
    return callback(undefined, user);
}
