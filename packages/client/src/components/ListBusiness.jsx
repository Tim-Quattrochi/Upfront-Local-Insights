import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import axios from "../hooks/useAxios";
import { Link } from "react-router-dom";
import ShowRating from "./ShowRating";

import placeHolderImage from "../assets/Place-holder-image.svg";
import Search from "./Search";
const ListBusiness = () => {
  const [searchFilter, setSearchFilter] = useState([]);
  const [searchTerm, setSearchTerm] = useState();
  const [businesses, setBusinesses] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
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
    const results = businesses.filter((business) =>
      business.name
        .toLowerCase()
        .includes(e.target.value.toLowerCase())
    );

    setSearchFilter(results);
    console.log(searchFilter);
  };

  const displayBusinesses = businesses
    .slice(pagesVisited, pagesVisited + businessesPerPage)
    .map((business) => (
      <>
        <div className="prose prose-sm mx-auto">
          <div
            key={business._id}
            className="bg-white rounded-lg shadow-md"
          >
            <div className="relative">
              {business.photo ? (
                <img
                  src={`http://localhost:3001/${business.photo}`}
                  alt=""
                  className="w-full  object-cover rounded-t-lg"
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
      </>
    ));

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <>
      <Search searchTerm={searchTerm} handleSearch={handleSearch} />
      {displayBusinesses}
      <ReactPaginate
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"pagination"}
        activeClassName={"active"}
        previousLabel={"Previous"}
        nextLabel={"Next"}
        disabledClassName={"disabled"}
        pageClassName={"page-item"}
        breakClassName={"break-me"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-link"}
        nextClassName={"page-link"}
        breakLinkClassName={"page-link"}
      />
    </>
  );
};

export default ListBusiness;
