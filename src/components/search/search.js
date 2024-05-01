import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, GEO_API_KEY } from "../../api";

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  const loadOptions = async (inputValue) => {
    try {
      const response = await fetch(
        `${GEO_API_URL}/autocomplete?text=${inputValue}&format=json&apiKey=${GEO_API_KEY}`
      );
      const result = await response.json();

      if (result.results) {
        const options = result.results.map((item) => ({
          value: `${item.lon} ${item.lat}`,
          label: `${item.address_line1},${item.address_line2}`,
        }));

        return {
          options: options,
          hasMore: false, // Assuming no pagination for now
        };
      } else {
        console.error("No data found in API response");
        return {
          options: [],
          hasMore: false,
        };
      }
    } catch (error) {
      console.error("Error fetching options:", error);
      return {
        options: [],
        hasMore: false,
      };
    }
  };

  const handleOnChange = async (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  return (
    <AsyncPaginate
      placeholder="Search for City"
      debounceTimeout={600}
      value={search}
      loadOptions={loadOptions}
      onChange={handleOnChange}
    />
  );
};

export default Search;
