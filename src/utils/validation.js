import validator from "validator";

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password, age, gender } = req.body;

  if (!firstName || !lastName || !emailId || !password || !age || !gender) {
    throw new Error("Fields can't be empty");
  }
  if (!validator.isEmail(emailId)) {
    throw new Error("Invalid Email format : " + emailId);
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error(
      "Password must be at least 8 characters long, contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol."
    );
  }
  if (!["male", "female", "other"].includes(gender)) {
    throw new Error(
      "There are only 2 genders (male & female) or choose other if you are not sure kiddo"
    );
  }
};

export { validateSignUpData };
