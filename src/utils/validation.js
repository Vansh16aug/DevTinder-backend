import validator from "validator";

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password, age, gender } = req.body;
  const errors = [];

  if (!firstName) errors.push("First name can't be empty");
  if (!lastName) errors.push("Last name can't be empty");
  if (!emailId) errors.push("Email ID can't be empty");
  if (!password) errors.push("Password can't be empty");
  if (!age) errors.push("Age can't be empty");
  if (!gender) errors.push("Gender can't be empty");

  if (emailId && !validator.isEmail(emailId)) {
    errors.push("Invalid Email format");
  }

  if (password && !validator.isStrongPassword(password)) {
    errors.push(
      "Password must be at least 8 characters long, contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol."
    );
  }

  if (gender && !["male", "female", "other"].includes(gender)) {
    errors.push("Invalid gender. Valid options are male, female, or other.");
  }

  if (errors.length) {
    throw new Error(errors.join(" "));
  }
};

export { validateSignUpData };
