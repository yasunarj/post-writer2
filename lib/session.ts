import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

const getCurrentUser = async () => {
  const session = await getServerSession(authOptions);
  if(session) {
    return session.user;
  }
};

export { getCurrentUser };