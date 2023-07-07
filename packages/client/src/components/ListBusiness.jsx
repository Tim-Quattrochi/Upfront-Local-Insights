import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import axios from "../hooks/useAxios";
import Search from "./Search";
import FilterByCat from "./FilterByCat";
import BusinessCard from "./BusinessCard";

const ListBusiness = () => {
  const [searchFilter, setSearchFilter] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [businesses, setBusinesses] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [selected, setSelected] = useState(""); //selected for filter by category.
  const [error, setError] = useState(null);

  const businessesPerPage = 5;
  const pagesVisited = pageNumber * businessesPerPage;

  useEffect(() => {
    axios
      .get("business")
      .then((response) => {
        setBusinesses(response.data.businesses);
      })
      .catch((err) => setError(err));
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
      <BusinessCard business={business} key={business._id} />
    ));

  /**
   * The function takes an object as an argument, and then uses the object's selected property to set
   * the pageNumber state
   */
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <>
      <div className="flex   items-center  min-w-1/2 sm:justify-center">
        <FilterByCat setSelected={setSelected} />
        <Search searchTerm={searchTerm} handleSearch={handleSearch} />
      </div>
      <div className="">
        {displayBusinesses}
        <ReactPaginate
          breakLabel="..."
          marginPagesDisplayed={2}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"flex  bottom-0 z-10  "}
          activeClassName={"z-10 bg-blue-500 text-white"}
          previousLabel={"Previous"}
          nextLabel={"Next"}
          disabledClassName={"disabled"}
          pageClassName={
            "mx-1 py-2  w-10 text-center bg-gray-200 hover:bg-gray-300"
          }
          breakClassName={"break-me"}
          pageLinkClassName={"z-10 text-gray-700 hover:text-white"}
          previousClassName={
            "z-10 mx-1 py-2  bg-secondary hover:bg-gray-300"
          }
          nextClassName={
            "z-10 mx-1 py-2 w-10 bg-secondary hover:bg-gray-300"
          }
          breakLinkClassName={"text-gray-700 hover:text-white"}
          renderOnZeroPageCount={null}
        />
      </div>
    </>
  );
};

export default ListBusiness;
