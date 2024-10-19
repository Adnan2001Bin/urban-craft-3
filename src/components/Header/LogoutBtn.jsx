import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";

function LogoutBtn() {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
  };

  return (
    <button
      className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500"
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
