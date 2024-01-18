"use client";
import React, { useState } from "react";

// hi, Sir this is a demo of my work on the task you gave me. i can Improve it more if you want.
//  -  Thank you
// By -  Vikash Khati

interface Props {
  id: number;
  keyword: string;
  searchVolume: number;
  date?: any;
}

const Page = () => {
  //Demo keyword data
  const [keyword, setKeyword] = useState([
    { id: 1, keyword: "pen", searchVolume: 0, date: "18/01/2024 07:42" },
    { id: 2, keyword: "paper", searchVolume: 1, date: "18/01/2024 07:42" },
  ]);

  //Demo highest search volume
  const search = keyword.reduce((prev, current) => {
    return prev.searchVolume > current.searchVolume ? prev : current;
  }, keyword[0]);
  const [highestsearchVolume, setHighestsearchVolume] = useState(
    search.keyword
  );

  const date = new Date();
  const dateOptions: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  const indianDateString = date.toLocaleDateString("en-IN", dateOptions);
  const indianTimeString = date.toLocaleTimeString("en-IN", timeOptions);

  const formattedDateTime = `${indianDateString} ${indianTimeString}`;

  //Handle search
  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setHighestsearchVolume(search.keyword);
    const searchKeyword = event.currentTarget.product.value;
    const existingKeyword = keyword.find(
      (item: Props) => item.keyword === searchKeyword
    );

    if (existingKeyword) {
      existingKeyword.searchVolume += 1;
      existingKeyword.date = formattedDateTime;
      setKeyword([...keyword]); // Update the state to trigger re-render
    } else {
      setKeyword([
        ...keyword,
        {
          id: keyword.length + 1,
          keyword: searchKeyword,
          searchVolume: 1,
          date: formattedDateTime,
        },
      ]);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center py-5">
      <form onSubmit={handleSearch} className="flex gap-2 py-2">
        <input
          className=" px-2 py-1 outline-none border border-black rounded-md"
          name="product"
          type="text"
          placeholder="Search products"
        />
        <button
          className="bg-red-500 px-2 py-1 rounded-md text-white border border-black"
          type="submit"
        >
          Search
        </button>
      </form>

      <ul className="flex flex-col gap-2">
        <h1 className="font-semibold text-md text-center bg-gray-500 text-white border rounded-md">
          BASED ON HIGHER SEARCH VOLUME
          <p className="bg-red-500">Trending Keyword - {highestsearchVolume}</p>
        </h1>
        {keyword
          .sort((a, b) => b.searchVolume - a.searchVolume) // Sort by searchVolume in descending order
          .map((product) => (
            <li className="border px-2 py-2 rounded-md gap-2" key={product.id}>
              id = {product.id} Keyword= {product.keyword} SearchVolume ={" "}
              {product.searchVolume} Date = {product.date}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Page;
