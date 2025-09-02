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

// New function for admin to add a user
export const addUser = (newUser) => {
    const users = getUsers();
    // Check if employeeId already exists
    if (users.find(user => user.employeeId === newUser.employeeId)) {
        // In a real app, you'd want better error handling, but an alert works for this case.
        alert(`Error: An account with Employee ID "${newUser.employeeId}" already exists.`);
        return false;
    }
    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    return true;
};

// New function to delete a user by employeeId
export const deleteUser = (employeeId) => {
    // Safety check: prevent the admin from deleting their own account
    if (employeeId === 'admin') {
        alert("For safety, the primary admin account cannot be deleted.");
        return;
    }
    let users = getUsers();
    users = users.filter(user => user.employeeId !== employeeId);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
};


export const validateUser = (employeeId, password) => {
    const users = getUsers();
    const userFound = users.find(
        user => user.employeeId === employeeId && user.password === password
    );
    return userFound || null;
};