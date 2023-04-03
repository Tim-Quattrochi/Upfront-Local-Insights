import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import axios from "../hooks/useAxios";
import { Link } from "react-router-dom";
import ShowRating from "./ShowRating";

import placeHolderImage from "../assets/Place-holder-image.svg";
import Search from "./Search";
import FilterByCat from "./FilterByCat";
const ListBusiness = () => {
  const [searchFilter, setSearchFilter] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [businesses, setBusinesses] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [selected, setSelected] = useState([]); //selected for filter by category.
  const [error, setError] = useState(null);

  const businessesPerPage = 5;
  const pagesVisited = pageNumber * businessesPerPage;

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("business");

        setBusinesses(response.data.businesses);
      } catch (error) {
        console.log(error);
        setError(error);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    setSearchFilter(businesses);
  }, [businesses]);

  const pageCount = Math.ceil(businesses.length / businessesPerPage);

  /**
   * The function takes in an event, sets the search term to the value of the event, filters the
   * businesses based on the search term, and sets the search filter to the results
   */
  /* Filtering the businesses based on the search term. */
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);

    const results = businesses.filter((business) => {
      const nameMatch = business.name
        .toLowerCase()
        .includes(e.target.value.toLowerCase());
      const categoryMatch =
        selected === "" || business.category === selected;
      return nameMatch && categoryMatch;
    });

    setSearchFilter(results);
  };

  const displayBusinesses = searchFilter
    .filter(
      (business) => selected === "" || business.category === selected
    )
    .slice(pagesVisited, pagesVisited + businessesPerPage)
    .map((business) => (
      <div className="prose prose-sm mx-auto" key={business._id}>
        <div className="bg-white rounded-lg shadow-md">
          <div className="relative">
            {business.photo ? (
              <img
                src={`http://localhost:3001/${business.photo}`}
                alt=""
                className="w-full object-cover rounded-t-lg"
              />
            ) : (
              <img
                src={placeHolderImage}
                alt=""
                className="w-full h-64 object-cover rounded-t-lg"
              />
            )}

            <div className="absolute top-0 right-0 px-2 py-1 bg-gray-800 text-white rounded-bl-lg">
              {business.category}
            </div>
          </div>
          <div className="p-6">
            <h3 className="text-2xl font-bold mb-4 text-center">
              <Link
                to={`/businesses/${business._id}`}
                className="text-gray-800 hover:text-gray-600"
              >
                {business.name}
              </Link>
            </h3>
            <div className="text-gray-700 text-sm mb-2 text-center">
              📍 {business.address}
            </div>
            <p className="text-gray-700 text-sm mb-2">
              ☏ <a href="tel:PHONE_NUM"> {business.phone}</a>
            </p>
            <p className="text-gray-700 text-base mb-4">
              {business.description}
            </p>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <img
                  src={`http://localhost:3001/${business.photo}`}
                  alt=""
                  className="w-8 h-8 object-cover rounded-full mr-2"
                />
                <p className="text-gray-700 text-sm">
                  {business.name}
                </p>

                <ShowRating rating={business.rating} />
                {Math.round(business.rating)}
              </div>
              <p className="text-gray-700 text-sm">
                {business.email}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <a
                href={business.website}
                target="_blank"
                rel="noreferrer"
                className="text-gray-700 text-sm hover:text-gray-600"
              >
                {business.website}
              </a>
            </div>
          </div>
        </div>
      </div>
    ));

  /**
   * The function takes an object as an argument, and then uses the object's selected property to set
   * the pageNumber state
   */
  const changePage = ({ selected }) => {
    console.log(selected);
    setPageNumber(selected);
  };

  return (
    <>
      <div className="flex wrap content-center justify-between items-baseline xs:justify-center flex-nowrap">
        <FilterByCat setSelected={setSelected} />
        <Search searchTerm={searchTerm} handleSearch={handleSearch} />
      </div>
      <div className="flex-col">
        {displayBusinesses}
        <ReactPaginate
          className="btn-group mx-auto py-1 my-1 xs:ml-14  "
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"btn-group"}
          activeClassName={"btn btn-active"}
          previousLabel={"Previous"}
          nextLabel={"Next"}
          disabledClassName={"disabled"}
          pageClassName={"btn btn-accent"}
          breakClassName={"break-me"}
          pageLinkClassName={"page-link"}
          previousClassName={"btn btn-accent"}
          nextClassName={"btn btn-accent"}
          breakLinkClassName={"page-link"}
        />
      </div>
    </>
  );
};

export default ListBusiness;
