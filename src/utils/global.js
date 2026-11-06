function isValidEmail(email) {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
}

function getRandomId() {
    return Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)
}

module.exports = { isValidEmail, getRandomId };
