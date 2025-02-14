// Function to validate username
function validateUsername(username) {
    const usernameRegex = /^[a-zA-Z0-9_]{3,15}$/;
    if (username === '') {
        return 'Username is required.';
    }
    if (!usernameRegex.test(username)) {
        return 'Username must be between 3 and 15 characters and can only contain letters, numbers, and underscores.';
    }
    return 'Username accepted.';
}

// Function to validate email
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '') {
        return 'Email is required.';
    }
    if (!emailRegex.test(email)) {
        return 'Invalid email format.';
    }
    return 'Email accepted.';
}

// Function to validate password
function validatePassword(password) {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (password === '') {
        return 'Password is required.';
    }
    if (!passwordRegex.test(password)) {
        return 'Password must be at least 8 characters long, and include at least one letter, one number, and one special character.';
    }
    return 'Password accepted.';
}

module.exports={
    validateEmail,
    validatePassword,
    validateUsername
}