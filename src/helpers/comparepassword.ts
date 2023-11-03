import bcrypt from "bcrypt";
const comparePassword = async (newPassword: string, oldPassword: string) => {
  const match = bcrypt.compare(newPassword, oldPassword);
  return match;
};

export default comparePassword;
