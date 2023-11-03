import bcrypt from "bcrypt";
const hashPassword = async (password: string) => {
  const hashPassword = bcrypt.hash(password, 10);
  return hashPassword;
};

export default hashPassword;
