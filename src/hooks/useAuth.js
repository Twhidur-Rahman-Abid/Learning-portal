import { useSelector } from "react-redux";
import { selectAuth } from "../features/auth/select";

const useAuth = () => {
  const auth = useSelector(selectAuth);

  if (auth?.accessToken && auth?.user?.id) {
    if (auth.user.role === "admin") {
      return "admin";
    } else {
      return "student";
    }
  } else {
    return false;
  }
};

export default useAuth;
