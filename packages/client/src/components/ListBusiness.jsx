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
    console.log(results);
    setSearchFilter(results);
  };

  const displayBusinesses = searchFilter
    .filter(
      (business) => selected === "" || business.category === selected
    )
    .slice(pagesVisited, pagesVisited + businessesPerPage)
    .map((business) => <BusinessCard business={business} />);

  /**
   * The function takes an object as an argument, and then uses the object's selected property to set
   * the pageNumber state
   */
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <>
      <div className="flex flex-col items-center sm:flex-row sm:justify-between">
        <FilterByCat setSelected={setSelected} />
        <Search searchTerm={searchTerm} handleSearch={handleSearch} />
      </div>
      <div className="flex-col">
        {displayBusinesses}
        <ReactPaginate
          className=" btn-group mb-20  mx-auto py-1 my-1 xs:ml-14  "
          breakLabel="..."
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
          renderOnZeroPageCount={null}
        />
      </div>
    </>
  );
};

export default ListBusiness;
