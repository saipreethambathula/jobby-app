import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import { Star, MapPin, Briefcase, ExternalLink, Loader } from "lucide-react";

import SkillsCard from "./SkillsCard";
import SimilarJobItem from "./SimilarJobItem";

const apiStatusConstants = {
  initial: "INITIAL",
  inProgress: "INPROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

const JobItem = () => {
  const { id } = useParams(); // ✅ Top-level hook
  const [jobItemList, setJobItemList] = useState({});
  const [similarJobItemList, setSimilarJobItemList] = useState([]);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);

  const getFormattedSkillData = (data) => ({
    companyLogoUrl: data.company_logo_url,
    employmentType: data.employment_type,
    jobDescription: data.job_description,
    id: data.id,
    rating: data.rating,
    location: data.location,
    title: data.title,
  });

  const getFormattedData = (data) => ({
    companyLogoUrl: data.company_logo_url,
    companyWebsiteUrl: data.company_website_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    lifeAtCompany: {
      description: data.life_at_company.description,
      imageUrl: data.life_at_company.image_url,
    },
    location: data.location,
    rating: data.rating,
    title: data.title,
    packagePerAnnum: data.package_per_annum,
    skills: data.skills.map((skill, index) => ({
      id: index,
      imageUrl: skill.image_url,
      name: skill.name,
    })),
  });

  const getJobItem = async () => {
    setApiStatus(apiStatusConstants.inProgress);
    const jwtToken = Cookies.get("jwt_token");
    const url = `https://apis.ccbp.in/jobs/${id}`;
    const options = {
      headers: { Authorization: `Bearer ${jwtToken}` },
      method: "GET",
    };
    try {
      const response = await fetch(url, options);
      if (response.ok) {
        const data = await response.json();
        setJobItemList(getFormattedData(data.job_details));
        setSimilarJobItemList(
          data.similar_jobs.map((job) => getFormattedSkillData(job))
        );
        setApiStatus(apiStatusConstants.success);
      } else {
        setApiStatus(apiStatusConstants.failure);
      }
    } catch (error) {
      setApiStatus(apiStatusConstants.failure);
    }
  };

  useEffect(() => {
    getJobItem();
  }, [id]);

  const renderJobItemDetails = () => {
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      title,
      rating,
      packagePerAnnum,
      lifeAtCompany,
      skills,
    } = jobItemList;

    const { description, imageUrl } = lifeAtCompany || {};

    return (
      <div className="flex flex-col justify-center m-6 lg:m-16 w-full max-w-6xl">
        <div className="bg-[#202020] rounded-xl p-6 lg:p-11 mb-6">
          {/* Logo & Title */}
          <div className="flex items-center mb-4">
            <img
              src={companyLogoUrl}
              alt="company logo"
              className="w-20 mr-6"
            />
            <div className="flex flex-col justify-center">
              <h1 className="text-white text-2xl font-bold mb-2">{title}</h1>
              <div className="flex items-center">
                <Star className="w-5 h-5 text-yellow-400 mr-2" />
                <p className="text-white">{rating}</p>
              </div>
            </div>
          </div>

          {/* Location, Employment Type & Package */}
          <div className="flex justify-between items-center mt-4 mb-4 flex-wrap gap-4">
            <div className="flex gap-6 flex-wrap">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-white" />
                <p className="text-white text-base">{location}</p>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-white" />
                <p className="text-white text-base">{employmentType}</p>
              </div>
            </div>
            <p className="text-white text-base">{packagePerAnnum}</p>
          </div>

          <hr className="border-gray-600 my-4" />

          {/* Description */}
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-white text-xl font-bold">Description</h1>
            <a
              href={companyWebsiteUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center text-indigo-500 font-bold text-lg"
            >
              Visit <ExternalLink className="w-5 h-5 ml-2" />
            </a>
          </div>
          <p className="text-white leading-8 mb-4">{jobDescription}</p>

          {/* Skills */}
          <h1 className="text-white text-2xl font-bold mb-4">Skills</h1>
          <ul className="flex flex-row flex-wrap gap-10 mb-6 w-full">
            {skills?.map((skill) => (
              <SkillsCard key={skill.id} skillDetails={skill} />
            ))}
          </ul>

          {/* Life at Company */}
          {lifeAtCompany && (
            <div className="flex flex-col lg:flex-row gap-10">
              <div className="flex flex-col items-left">
                <h1 className="text-white text-2xl font-bold mb-4">
                  Life at company
                </h1>
                <p className="text-white leading-8 text-base">{description}</p>
              </div>
              <img
                src={imageUrl}
                alt="life at company"
                className="w-full h-54 rounded-lg object-cover"
              />
            </div>
          )}
        </div>

        {/* Similar Jobs */}
        <h1 className="text-white text-3xl font-bold mb-4">Similar Jobs</h1>
        <ul className="flex flex-row flex-wrap gap-5 justify-center">
          {similarJobItemList.map((item) => (
            <SimilarJobItem key={item.id} jobDetails={item} />
          ))}
        </ul>
      </div>
    );
  };

  const renderFailureView = () => (
    <div className="flex flex-col items-center mt-48">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="w-80 mb-4"
      />
      <h1 className="text-white text-2xl font-bold mb-2">
        Oops! Something Went Wrong
      </h1>
      <p className="text-white text-base mb-4">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        onClick={getJobItem}
        className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold"
      >
        Retry
      </button>
    </div>
  );

  const renderLoadingView = () => (
    <div className="flex justify-center items-center mt-48">
      <Loader type="ThreeDots" color="#ffffff" height={50} width={50} />
    </div>
  );

  const renderJobViews = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderJobItemDetails();
      case apiStatusConstants.inProgress:
        return renderLoadingView();
      case apiStatusConstants.failure:
        return renderFailureView();
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      {renderJobViews()}
    </div>
  );
};

export default JobItem;
