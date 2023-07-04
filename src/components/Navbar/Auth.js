import React, { useEffect, useState } from "react";
import { Menu } from "@headlessui/react";
import { Icon } from "../../icons/Icons";
import { Link, useNavigate } from "react-router-dom";
import { TOKEN_NAME, USER } from "../../services/apiService";
import { logout } from "../../store/redax/featchers.js/userSlice";
import { useSelector,useDispatch } from "react-redux";

function Auth() {
  // const { currentUser } = useSelector((state) => state.user);
  const dispatch=useDispatch();


  let currentUser;
  if (localStorage[USER]) {
    currentUser = JSON.parse(localStorage[USER]);
  }
  const defaultUser = {
    firstName: "User",
    avatar:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
  };
  const nav = useNavigate();
  const [user, setUser] = useState(defaultUser);

  const onLogOut = () => {
    // מחיקת טוקן
    if (window.confirm("Are you sure you want to logout ?")) {
      localStorage.removeItem(TOKEN_NAME);//TODO-כשנמחק אוטומטית למחוק גם את היוזר
      localStorage.removeItem(USER);
      // dispatch(logout());

      // להעביר לעמוד לוג אין
      nav("/");
    }
  };
  // useEffect(() => {
  //   currentUser ? setUser(currentUser) : setUser(defaultUser);
  // }, [currentUser]);
  useEffect(() => {
    {
      localStorage[USER]
        ? setUser(JSON.parse(localStorage[USER]))
        : setUser(defaultUser);
    }
  }, [localStorage[USER]]);
  return (
    <Menu style={{  }} as="nav" className={"relative"}>
      {({ open }) => (
        <>
          <Menu.Button
            className={`flex items-center h-8 rounded-3xl pr-2 ${open ? "bg-active" : "bg-black"
              } hover:bg-active`}
          >
            <img
              src={user.avatar}
              className={"w-8 h-8 rounded-full p-0.5 mr-2"}
              alt=""
            />
            <span className="text-sm font-semibold mr-2">{user.firstName}</span>
            <span className={open ? "rotate-180" : undefined}>
              <Icon size={16} name="downDir" />
            </span>
          </Menu.Button>
          <Menu.Items
            className={
              "absolute p-1 top-full right-0 w-48 bg-active rounded translate-y-2"
            }
          >
            <Menu.Item>
              {({ active }) => (
                <Link
                  to={"#"}
                  className={`h-10 flex justify-between items-center px-2 text-sm rounded ${active ? "bg-white bg-opacity-10" : undefined
                    }`}
                >
                  Account
                  <Icon size={16} name="external" />
                </Link>
              )}
            </Menu.Item>

            <Menu.Item>
              {localStorage[TOKEN_NAME] ? (
                <>
                  <Link
                    className={`h-10 flex items-center px-2 text-sm rounded ${"bg-white bg-opacity-10"}`}
                    to="/"
                    onClick={() => onLogOut()}
                  >
                    Log out
                  </Link>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        className={`h-10 flex items-center px-2 text-sm rounded ${active && "bg-white bg-opacity-10"
                          }`}
                        to="users/profile"
                      >
                        Profile
                      </Link>
                    )}
                  </Menu.Item>

                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        className={`h-10 flex items-center px-2 text-sm rounded ${active && "bg-white bg-opacity-10"
                          }`}
                        to="users/editProfile"
                      >
                        Edit Profile
                      </Link>
                    )}
                  </Menu.Item>
                </>

              ) : (
                <>
                  <Menu.Item>

                    <Link
                      className={`h-10 flex items-center px-2 text-sm rounded ${"bg-white bg-opacity-10"}`}
                      to="users/login"
                    >
                      Log in
                    </Link>
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        className={`h-10 flex items-center px-2 text-sm rounded ${active && "bg-white bg-opacity-10"
                          }`}
                        to="users/signUp"
                      >
                        Sign Up
                      </Link>
                    )}
                  </Menu.Item>

                </>
              )}
            </Menu.Item>

          </Menu.Items>
        </>
      )}
    </Menu>
  );
}

export default Auth;
