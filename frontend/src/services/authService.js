register(data) {
    return api.post("/auth/register", data);
}

forgotPassword(email) {
    return api.post("/auth/forgot-password", {
        email,
    });
}

resetPassword(token, password) {
    return api.post("/auth/reset-password", {
        token,
        password,
    });
}