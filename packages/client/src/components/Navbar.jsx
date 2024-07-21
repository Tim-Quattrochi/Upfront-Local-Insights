import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import SubmitBusiness from "../pages/SubmitBusiness";
import { logout } from "../Context";
import { useAuthState, useAuthDispatch } from "../Context";
import { useTheme } from "../Context/themeContext";
import { Avatar } from "./Avatar";
import ThemeController from "./ThemeController";
import useGetBusinesses from "../hooks/useGetBusinesses";

export const Navbar = () => {
  const auth = useAuthState();
  const dispatch = useAuthDispatch();
  const navigate = useNavigate();
  const [searchFilter, setSearchFilter] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState(null);

  const [isOpen, setIsOpen] = useState(true);
  const dropdownRef = useRef(null);

  const { businesses, error, loading, isLongLoad } =
    useGetBusinesses();

  const { handleThemeChange, state } = useTheme();

  const [navbarSearchTerm, setNavbarSearchTerm] = useState("");

  const shouldDisplayMessage =
    isOpen && navbarSearchTerm && searchFilter.length === 0;

  const message = isLongLoad
    ? "Loading..."
    : loading
    ? "Loading businesses..."
    : "No businesses found.";

  const handleBusinessClick = (e) => {
    setIsOpen(false);
    setNavbarSearchTerm("");
    setSearchFilter([]);
  };

  const handleNavBarSearch = (e) => {
    const searchTerm = e.target.value;
    setNavbarSearchTerm(searchTerm);

    // added debouncing.
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    setSearchTimeout(
      setTimeout(() => {
        const results = businesses.filter((business) => {
          const nameMatch = business.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase());

          return searchTerm.length > 0 ? nameMatch : false;
        });

        setSearchFilter(results);
      }, 500)
    );
  };

  const logoutToMain = async () => {
    await logout(dispatch);
    navigate("/");
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        !document
          .querySelector(".input.input-bordered")
          .contains(e.target)
      ) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    const handleSearchClick = (e) => {
      if (
        !dropdownRef.current?.contains(e.target) &&
        document
          .querySelector(".input.input-bordered")
          .contains(e.target)
      ) {
        setIsOpen(true);
      }
    };

    document.addEventListener("click", handleSearchClick);

    return () => {
      document.removeEventListener("click", handleSearchClick);
    };
  }, []);

  console.log(state);

  return (
    <div className="flex justify-between h-20 md:h-28 bg-primary">
      <Link to="/" className="flex items-center">
        <img
          src="/logo.png"
          alt="logo"
          className="w-24 md:w-32 lg:w-40 "
        />
        <span className="text-stone-100 text-lg md:text-2xl font-bold">
          {" "}
          Local Insights
        </span>
      </Link>
      <ThemeController onChange={handleThemeChange} />
      <div className="flex justify-center items-baseline flex-wrap">
        <div className="form-control relative">
          <input
            type="text"
            disabled={loading || isLongLoad}
            placeholder="Search a business"
            className="input hidden md:block bg-gray-200 input-bordered w-20 h-auto md:w-auto m-5 p-1 placeholder:text-black placeholder:p-4 placeholder:italic"
            value={navbarSearchTerm}
            onChange={handleNavBarSearch}
          />
          <div className="min-h-12 relative">
            {shouldDisplayMessage && (
              <div className="mx-auto">
                <p className="relative font-bold text-center">
                  {message}
                </p>
              </div>
            )}
          </div>
          {searchFilter.length > 0 ? (
            <div
              className="absolute z-10 mt-20  bg-white w-64"
              ref={dropdownRef}
            >
              {error ? <p>An error occurred.</p> : ""}
              {isOpen &&
                searchFilter.map((business) => (
                  <div
                    className="flex w-full py-2 m-auto"
                    onClick={handleBusinessClick}
                  >
                    <Link
                      to={`/businesses/${business._id}`}
                      key={business._id}
                      className=" p-2 hover:bg-gray-200"
                    >
                      {business.name}
                      {business.photo ? (
                        <img
                          src={business.photo}
                          alt="Business"
                          className="h-10 w-10 rounded-full "
                        />
                      ) : (
                        ""
                      )}
                    </Link>
                  </div>
                ))}
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="dropdown dropdown-end">
          <label tabIndex={0}>
            <Avatar
              name={auth.user.user ? auth.user.user.name[0] : "Guest"}
            />
          </label>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-blue-100 rounded-box w-45"
          >
            <li>
              <Link
                to={auth.user.isLoggedIn ? "/profile" : "/login"}
                className="justify-start"
              >
                <li>Profile</li>
              </Link>
            </li>
            <li>
              <Link to={"/businesses"} className="justify-between">
                Businesses
              </Link>
            </li>

            <li>
              {auth.user.isLoggedIn ? (
                <a onClick={logoutToMain}>Logout</a>
              ) : (
                ""
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
