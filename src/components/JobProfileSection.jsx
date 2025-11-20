import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Loader, Search } from "lucide-react";
import JobCard from "./JobCard";
import JobsFilterGroup from "./JobFIterGroup.jsx";

const employmentTypesList = [
  { label: "Full Time", employmentTypeId: "FULLTIME" },
  { label: "Part Time", employmentTypeId: "PARTTIME" },
  { label: "Freelance", employmentTypeId: "FREELANCE" },
  { label: "Internship", employmentTypeId: "INTERNSHIP" },
];

const salaryRangesList = [
  { salaryRangeId: "1000000", label: "10 LPA and above" },
  { salaryRangeId: "2000000", label: "20 LPA and above" },
  { salaryRangeId: "3000000", label: "30 LPA and above" },
  { salaryRangeId: "4000000", label: "40 LPA and above" },
];

const apiStatusConstants = {
  initial: "INITIAL",
  inProgress: "INPROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

const JobProfileSection = () => {
  const [jobsList, setJobsList] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [employmentType, setEmploymentType] = useState([]);
  const [salaryRange, setSalaryRange] = useState(0);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);

  useEffect(() => {
    getJobDetails();
  }, [employmentType, salaryRange]);

  const getJobDetails = async () => {
    setApiStatus(apiStatusConstants.inProgress);
    const jwtToken = Cookies.get("jwt_token");
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentType.join()}&minimum_package=${salaryRange}&search=${searchInput}`;
    const options = {
      headers: { Authorization: `Bearer ${jwtToken}` },
      method: "GET",
    };

    try {
      const response = await fetch(url, options);
      if (response.ok) {
        const data = await response.json();
        const updatedData = data.jobs.map((job) => ({
          companyLogoUrl: job.company_logo_url,
          employmentType: job.employment_type,
          id: job.id,
          jobDescription: job.job_description,
          location: job.location,
          packagePerAnnum: job.package_per_annum,
          rating: job.rating,
          title: job.title,
        }));
        setJobsList(updatedData);
        setApiStatus(apiStatusConstants.success);
      } else {
        setApiStatus(apiStatusConstants.failure);
      }
    } catch {
      setApiStatus(apiStatusConstants.failure);
    }
  };

  const handleSearchInputChange = (e) => setSearchInput(e.target.value);
  const handleSearchEnter = (e) => e.key === "Enter" && getJobDetails();
  const handleEmploymentTypeChange = (types) => setEmploymentType(types);
  const handleSalaryRangeChange = (range) => setSalaryRange(range);

  const renderLoadingView = () => (
    <div className="flex justify-center items-center h-full">
      <Loader className="text-white animate-spin" size={40} />
    </div>
  );

  const renderFailureView = () => (
    <div className="flex flex-col items-center mt-20">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="w-64 mb-6"
      />
      <h1 className="text-white text-3xl font-bold mb-2">
        Oops! Something Went Wrong
      </h1>
      <p className="text-gray-300 mb-4 text-center">
        We cannot seem to find the page you are looking for
      </p>
      <button
        onClick={getJobDetails}
        className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700"
      >
        Retry
      </button>
    </div>
  );

  const renderNoJobsView = () => (
    <div className="flex flex-col items-center mt-20">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="w-64 mb-6"
      />
      <h1 className="text-white text-3xl font-bold mb-2">No Jobs Found</h1>
      <p className="text-gray-300 text-center">
        We could not find any jobs. Try other filters.
      </p>
    </div>
  );

  const renderJobList = () =>
    jobsList.length > 0 ? (
      <ul className="flex flex-wrap gap-6">
        {jobsList.map((job) => (
          <li key={job.id} className="w-full sm:w-[48%] lg:w-full">
            <JobCard jobDetails={job} />
          </li>
        ))}
      </ul>
    ) : (
      renderNoJobsView()
    );

  const renderJobProfileDetailsList = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderJobList();
      case apiStatusConstants.failure:
        return renderFailureView();
      case apiStatusConstants.inProgress:
        return renderLoadingView();
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4 h-[calc(100vh-160px)]">
      {/* Filters */}
      <div className="w-full lg:w-1/4 shrink-0 overflow-auto">
        <JobsFilterGroup
          employmentTypesList={employmentTypesList}
          salaryRangesList={salaryRangesList}
          changeEmploymentType={handleEmploymentTypeChange}
          changeSalaryRange={handleSalaryRangeChange}
        />
      </div>

      {/* Jobs list */}
      <div className="flex-1 flex flex-col">
        {/* Sticky Search Bar */}
        <div className="sticky top-0 bg-[#202020] z-10 flex items-center w-full border border-gray-600 rounded-md px-4 py-2 mb-4">
          <input
            type="search"
            placeholder="Search"
            value={searchInput}
            onChange={handleSearchInputChange}
            onKeyDown={handleSearchEnter}
            className="bg-transparent text-white w-full outline-none"
          />
          <Search className="text-white" size={20} />
        </div>

        {/* Scrollable jobs */}
        <div className="flex-1 overflow-auto">
          {renderJobProfileDetailsList()}
        </div>
      </div>
    </div>
  );
};

export default JobProfileSection;
