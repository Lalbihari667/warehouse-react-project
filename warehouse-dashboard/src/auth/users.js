const USERS_KEY = 'warehouse_users';

const seedAdmin = {
    name: 'Admin User',
    employeeId: 'admin',
    dob: '2000-01-01',
    password: 'admin'
};

export const getUsers = () => {
    const users = localStorage.getItem(USERS_KEY);
    if (!users) {
        localStorage.setItem(USERS_KEY, JSON.stringify([seedAdmin]));
        return [seedAdmin];
    }
    return JSON.parse(users);
};

export const registerUser = (newUser) => {
    const users = getUsers();
    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const validateUser = (employeeId, password) => {
    const users = getUsers();
    const userFound = users.find(
        user => user.employeeId === employeeId && user.password === password
    );
    return userFound || null;
};