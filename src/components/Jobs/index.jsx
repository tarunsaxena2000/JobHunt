import React, { useState } from "react";
import Navbar from "../Navbar";
import { Link } from "react-router-dom";
import "./index.css";
import Job from "./../../Assets/jobs.json";
import Filter from "../Filter";


const experience = [
  { min: 0, max: 1 },
  { min: 2, max: 3 },
  { min: 4, max: 5 },
  { min: 5, max: 10 },
];

const Jobs = () => {
  const JobData = JSON.parse(localStorage.getItem("item")) || [];
  const [filteredJobs, setFilteredJobs] = useState([...JobData, ...Job]);
  const [searchterm, setSearchTerm] = useState("");
  const [active, setActive] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  function handleJobFilter(event) {
    const value = event.target.innerText;
    event.preventDefault();
    setFilteredJobs(
      Job.filter((job) => {
        return job.Description === value;
      })
    );
  }

  function saveClick(id, company, Title, Location, posted, Description, link) {
    window.localStorage.setItem(
      "Job",
      JSON.stringify({
        id,
        company,
        Title,
        Location,
        posted,
        Description,
        link,
      })
    );
    console.log(JobData);
  }

  const searchEvent = (event) => {
    const data = event.target.value;
    setSearchTerm(data);
    if (searchterm !== "" || searchterm.length > 2) {
      const filterData = Job.filter((item) => {
        if (item) {
          return Object.values(item)
            .join("")
            .toLowerCase()
            .includes(searchterm.toLowerCase());
        } else {
          return 0;
        }
      });
      setFilteredJobs(filterData);
    } else {
      setFilteredJobs(Job);
    }
  };

  function handleExperienceFilter(checkedState) {
    let filters = [];
    checkedState.forEach((item, index) => {
      if (item === true) {
        const filterS = Job.filter((job) => {
          return (
            job.experience >= experience[index].min &&
            job.experience <= experience[index].max
          );
        });
        filters = [...filters, ...filterS];
      }
      setFilteredJobs(filters);
    });
  }

  return (
    <>
      <Navbar />
      <div className="jobs-for-you">
        <div className="job-background">
          <div className="title">
            <h2>Our Jobs</h2>
          </div>
        </div>
        <div className="job-section">
          <div className="job-page">
            {filteredJobs.map(({ id, company, Title, Location, Description, link }) => {
              return (
                <div className="job-list" key={id}>
                  <div className="job-card">
                    <div className="job-name">
                      <div className="job-detail">
                        <h4>{company}</h4>
                        <h3>{Title}</h3>
                        <div className="category">
                          <p >{Location}</p>
                                         
                          <div
      className="job-description"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(true)}
    >
      <h4>Description:</h4>
      <p className="description-text">
        {Description.length > 150
          ? `${Description.slice(0, 15)}...`
          : Description}
      </p>
      {Description.length > 150 && (
        <div className={`popup-overlay ${isHovered ? "visible" : ""}`}>
          <div className="popup-content">
            <p>{Description}</p>
          </div>
        </div>
      )}
      </div>
     
                        </div>
                      </div>
                    </div>
                    <div className="job-button">
                      <div className="job-posting">
                        <Link to={link}>Apply Now</Link>
                      </div>
                      <div className="save-button">
                        <Link
                          to="/Jobs"
                          onClick={() => {
                            saveClick(
                              id,
                              company,
                              Title,
                              Location,
                              null, // You might want to provide the correct 'posted' value
                              Description,
                              link
                            );
                            setActive(!active);
                          }}
                        >
                          {/* ... (your existing code for the save button) */}
                        </Link>
                      </div>
                    </div>
                    {/* Add the following section to display the description */}


                  </div>
                </div>
              );
            })}
          </div>

          <Filter
            setFilteredJobs={setFilteredJobs}
            handleJobFilter={handleJobFilter}
            handleExperienceFilter={handleExperienceFilter}
            searchEvent={searchEvent}
          />
        </div>
      </div>
    </>
  );
};

export default Jobs;
