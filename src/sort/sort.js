/* eslint-disable prefer-template */
/* eslint-disable no-param-reassign */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable one-var */
/* eslint-disable no-var */
/* eslint-disable prefer-const */
/* eslint-disable react/no-array-index-key */
import React, { useState } from "react";
import { userList } from "./data";

function SortComponent() {
  const [filteredData, setFilteredData] = useState(userList);
  const [sortDirection, setSortDirection] = useState("");
  const [sortCategory, setSortCategory] = useState("duration");

  //   handle change on select
  const handleChange = (e) => {
    const { value } = e.target;
    setSortDirection(value);

    // check condition to handle sorting
    if (sortCategory === "name" && e.target.value === "ascending") {
      const filteredArray = userList.sort((a, b) => {
        let fa = a.name.toLowerCase(),
          fb = b.name.toLowerCase();

        if (fa < fb) {
          return -1;
        }
        if (fa > fb) {
          return 1;
        }
        return 0;
      });
      setFilteredData(filteredArray);
    } else if (sortCategory === "name" && e.target.value === "descending") {
      const filteredArray = userList.sort((a, b) => {
        let fa = a.name.toLowerCase(),
          fb = b.name.toLowerCase();

        if (fa > fb) {
          return -1;
        }
        if (fa < fb) {
          return 1;
        }
        return 0;
      });
      setFilteredData(filteredArray);
    } else if (sortCategory === "duration" && e.target.value === "ascending") {
      const filteredArray = userList.sort((a, b) => {
        return a.duration - b.duration;
      });
      setFilteredData(filteredArray);
    } else if (sortCategory === "duration" && e.target.value === "descending") {
      const filteredArray = userList.sort((a, b) => {
        return b.duration - a.duration;
      });
      setFilteredData(filteredArray);
    }
  };

  //   handle milliseconds to time
  const msToTime = (s) => {
    var ms = s % 1000;
    var secs = s % 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;

    s = (s - ms) / 1000;
    s = (s - secs) / 60;
    // Pad to 2 or 3 digits, default is 2
    function pad(n, z) {
      z = z || 2;
      return ("00" + n).slice(-z);
    }

    return pad(hrs) + ":" + pad(mins) + ":" + pad(secs);
  };

  return (
    <div className="bg-white w-3/5 mx-auto py-20">
      <h1 className="capitalize font-bold text-3xl text-center">
        audio track sorting
      </h1>
      <div className="flex justify-end my-10">
        <select
          value={sortCategory}
          className="bg-gray-200 w-40 text-black p-2 mr-3"
          onChange={(e) => setSortCategory(e.target.value)}
        >
          <option value="name">Name</option>
          <option value="duration">Duration</option>
        </select>
        <select
          className="bg-gray-200 w-40 text-black p-2"
          value={sortDirection}
          onChange={(e) => handleChange(e)}
        >
          <option value="ascending">Ascending</option>
          <option value="descending">Descending</option>
        </select>
      </div>
      {filteredData &&
        filteredData?.map((data, index) => {
          return (
            <div
              key={index}
              className="border-b border-gray-200 w-full py-1 mb-2"
            >
              <p className="text-black">{data.name}</p>
              <p className="text-gray-400">
                Duration: {msToTime(data.duration)}
              </p>
            </div>
          );
        })}
    </div>
  );
}

export default SortComponent;
