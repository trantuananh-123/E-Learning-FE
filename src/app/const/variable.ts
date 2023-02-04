export const REGEX = {
    EMAIL_PATTERN: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    PASSWORD_PATTERN: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
}

export const USER_ROLE = [
    {
        name: "Student", value: 0
    },
    {
        name: "Teacher", value: 1
    },
]