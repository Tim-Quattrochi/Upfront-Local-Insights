import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import SubmitBusiness from "../pages/SubmitBusiness";
import { logout } from "../Context";
import { useAuthState, useAuthDispatch } from "../Context";
import { Avatar } from "./Avatar";
import useGetBusinesses from "../hooks/useGetBusinesses";

export const Navbar = () => {
  const auth = useAuthState();
  const dispatch = useAuthDispatch();
  const navigate = useNavigate();
  const [searchFilter, setSearchFilter] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState(null);

  const [isOpen, setIsOpen] = useState(true);
  const dropdownRef = useRef(null);

  const { businesses, error } = useGetBusinesses();

  const [navbarSearchTerm, setNavbarSearchTerm] = useState("");

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

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          Upfront Local Insights
        </Link>
        {auth?.user?.isLoggedIn && (
          <span className="ml-10 bg-secondary h-10 text-white  p-2  rounded-md">
            <SubmitBusiness />
          </span>
        )}
      </div>

      <div className="flex-none gap-2">
        <div className="form-control relative">
          <input
            type="text"
            placeholder="Search for a business"
            className="input input-bordered w-24 md:w-auto"
            value={navbarSearchTerm}
            onChange={handleNavBarSearch}
          />
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
          {isOpen &&
            navbarSearchTerm &&
            searchFilter.length === 0 && (
              <div className="flex w-full py-2 m-auto">
                <p>No businesses found</p>
              </div>
            )}
        </div>
        <div className="dropdown dropdown-end">
          <label
            tabIndex={0}
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-14  rounded-full">
              <Avatar
                name={
                  auth.user.user ? auth.user.user.name[0] : "Guest"
                }
              />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
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
