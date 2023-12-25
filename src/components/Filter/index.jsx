import { useState } from "react";
import "./index.css";
const experience = [
  { min: 0, max: 1 },
  { min: 2, max: 3 },
  { min: 4, max: 5 },
  { min: 5, max: 10 },
];

const Filter = ({
  setFilteredJobs,
  handleJobFilter,
  handleExperienceFilter,
  searchEvent,
}) => {
  const [checkedState, setCheckedState] = useState(
    new Array(experience.length).fill(false)
  );

  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);
    handleExperienceFilter(updatedCheckedState);
  };
  return (
    <>
      <div className="filter-page">
        <div className="search-box">
          <div className="search">
            <h3>Search Jobs</h3>
            <div className="job-search">
              <input
                type="text"
                className="search-term"
                placeholder="Search Here"
                onChange={searchEvent}
              />
            </div>
          </div>
          <div className="filter">
            <div className="job-category">
              <h4>Categories</h4>
              <ul>
                <li onClick={handleJobFilter}>Frontend</li>
                <li onClick={handleJobFilter}>Backend</li>
                <li onClick={handleJobFilter}>Devops</li>
                <li onClick={handleJobFilter}>Full Stack</li>
             
              </ul>
            </div>

         
          </div>
        </div>
      </div>
    </>
  );
};

export default Filter;
