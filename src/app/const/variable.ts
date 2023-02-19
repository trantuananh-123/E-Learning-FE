export const REGEX = {
    EMAIL_PATTERN: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    PASSWORD_PATTERN: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,255}$/,
    USERNAME_PATTERN: /^[A-Za-z0-9\._~!@#$%^&*]{6,255}$/
}

export const USER_ROLE = [
    {
        name: "Student", value: 0
    },
    {
        name: "Teacher", value: 1
    },
]