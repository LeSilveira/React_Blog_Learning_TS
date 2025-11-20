import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser, logOut } from "../store/authSlice";

function HeaderDefault() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 1. Read the user from the global store
  const user = useSelector(selectCurrentUser);

  const handleLogout = () => {
    // 2. Dispatch the logout action
    dispatch(logOut());
    navigate("/login");
  };
  return (
    <header className="headerDefault">
      <Link to="/" style={{ margin: "10px" }}>
        Home
      </Link>
      <Link to="/posts" style={{ margin: "10px" }}>
        Posts
      </Link>
      <Link to="/vite" style={{ margin: "10px" }}>
        Vite
      </Link>
      {user ? (
        <>
          <Link to="/posts/create" style={{ margin: "10px" }}>
            Create Post
          </Link>
          <span style={{ margin: "10px" }}>Hi, {user}! How you're doing?</span>
          <button onClick={handleLogout} style={{ margin: "0px", background: "none" }}>Logout</button>
        </>
      ) : (
        <Link to="/login" style={{ margin: "10px" }}>Login</Link>
      )}
    </header>
  );
}

export default HeaderDefault;
