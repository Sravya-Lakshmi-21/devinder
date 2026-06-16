const validator = require("validator");

const validateSignUp = (req) => {
    const { firstName, lastName, emailId, password, age, gender, skills } = req.body;
    if (!firstName || !lastName) {
        throw new Error("Please enter valid Fisrt Name and Last Name");
    }
    else if (!validator.isEmail(emailId)) {
        throw new Error("Please enter valid Email");
    }
    else if (!validator.isStrongPassword(password)) {
        throw new Error("password is not strong");
    }
    else if (age <= 18 || age >= 80) {
        throw new Error("Please enter age between 18 to 80");
    }    
    else if (!(gender.toLowerCase() == "male" || gender.toLowerCase() == "female" || gender.toLowerCase() == "others")) {
        throw new Error("Please enter valid gender");
    }
    else if (skills.length > 5) {
        throw new Error("Please enter any 5 skills");
    }
};

module.exports = {
    validateSignUp,
}