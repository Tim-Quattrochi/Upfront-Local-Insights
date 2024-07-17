import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import ReactPaginate from "react-paginate";
import axios from "../hooks/useAxios";
import Search from "./Search";
import FilterByCat from "./FilterByCat";
import BusinessCard from "./BusinessCard";
import LoadingBar from "./LoadingBar";
import {
  containerClass,
  activeClass,
  inactiveClass,
  prevClass,
  nextClass,
  breakClass,
} from "../utilities/paginationStyles";

const ListBusiness = () => {
  const [searchFilter, setSearchFilter] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [businesses, setBusinesses] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [selected, setSelected] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const businessesPerPage = 5;

  useEffect(() => {
    axios
      .get("business")
      .then((response) => {
        if (response.status === 200) {
          setBusinesses(response.data.businesses);
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
      });
  }, []);

  useEffect(() => {
    setSearchFilter(businesses);
  }, [businesses]);

  const handleSearch = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  useEffect(() => {
    const results = businesses.filter((business) => {
      const nameMatch = business.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const categoryMatch =
        selected === "" || business.category === selected;
      return nameMatch && categoryMatch;
    });

    setSearchFilter(results);
  }, [businesses, searchTerm, selected]);

  const filteredBusinesses = useMemo(
    () =>
      searchFilter.filter(
        (business) =>
          selected === "" || business.category === selected
      ),
    [searchFilter, selected]
  );

  const totalFilteredResults = useMemo(
    () => filteredBusinesses.length,
    [filteredBusinesses]
  );

  const pageCount = useMemo(
    () => Math.ceil(totalFilteredResults / businessesPerPage),
    [totalFilteredResults]
  );

  const displayBusinesses = useMemo(
    () =>
      filteredBusinesses
        .slice(
          pageNumber * businessesPerPage,
          (pageNumber + 1) * businessesPerPage
        )
        .map((business) => (
          <div className="mb-5" key={business._id}>
            <BusinessCard business={business} />
          </div>
        )),
    [filteredBusinesses, pageNumber, businessesPerPage]
  );

  const changePage = useCallback(({ selected }) => {
    setPageNumber(selected);
  }, []);

  if (loading) return <LoadingBar />;

  return (
    <>
      <div className="flex items-center min-w-1/2 sm:justify-center">
        <FilterByCat setSelected={setSelected} />
        <Search searchTerm={searchTerm} handleSearch={handleSearch} />
      </div>
      <div>
        {searchFilter.length === 0 ? (
          <p className="text-center text-gray-500 my-4">
            No results found.
          </p>
        ) : (
          displayBusinesses
        )}
      </div>
      {searchFilter.length > businessesPerPage && (
        <ReactPaginate
          containerClassName={containerClass}
          activeClassName={activeClass}
          pageClassName={inactiveClass}
          pageCount={pageCount}
          breakClassName={breakClass}
          breakLabel="..."
          onPageChange={changePage}
          pageRangeDisplayed={3}
          previousClassName={prevClass}
          nextClassName={nextClass}
          marginPagesDisplayed={3}
          renderOnZeroPageCount={null}
        />
      )}
    </>
  );
};

export default ListBusiness;
