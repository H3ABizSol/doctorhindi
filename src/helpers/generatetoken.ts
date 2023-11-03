import jwt from "jsonwebtoken";
const key: any = process.env.JWT_KEY;

const generateToken = (id: string) => {
  const token = jwt.sign({ id }, key, {
    expiresIn: "48h",
  });
  return token;
};

export default generateToken;
