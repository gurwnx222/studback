import jwt from "jsonwebtoken";

export default function getTokenData(request) {
  try {
    const token = request.cookies.get("token")?.value || "";

    if (!token) {
      throw new Error("No token found");
    }

    const tokenData = jwt.verify(token, process.env.JWT_SECRET);
    return tokenData.id;
  } catch (error) {
    throw new Error("Invalid token");
  }
}
