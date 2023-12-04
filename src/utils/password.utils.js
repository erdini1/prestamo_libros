import bcrypt from "bcrypt";

const saltRounds = 10;

const hashPassword = (plainPassword) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) {
        reject(err);
      } else {
        bcrypt.hash(plainPassword, salt, (err, hash) => {
          if (err) {
            reject(err);
          } else {
            resolve(hash);
          }
        });
      }
    });
  });
};

const comparePasswords = async (userInputPassword, storedHashedPassword) => {
  try {
    const result = await bcrypt.compare(
      userInputPassword,
      storedHashedPassword,
    );
    return result;
  } catch (error) {
    return false;
  }
};

export const PasswordUtil = {
  hashPassword,
  comparePasswords,
};
