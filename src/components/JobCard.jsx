import { Star, MapPin, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const JobCard = ({ jobDetails }) => {
  const {
    title,
    companyLogoUrl,
    rating,
    employmentType,
    location,
    id,
    packagePerAnnum,
    jobDescription,
  } = jobDetails;

  return (
    <Link
      to={`/jobs/${id}`}
      className=" bg-[#202020] rounded-[15px] p-6 mb-4 w-full mr-[60px] flex flex-col no-underline hover:shadow-lg transition-shadow duration-200"
    >
      <div className="flex flex-col">
        {/* Company info */}
        <div className="flex items-center mb-7">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="w-[70px] mr-4 object-contain"
          />
          <div>
            <h1 className="text-[26px] font-extrabold text-white font-roboto">
              {title}
            </h1>
            <div className="flex items-center mt-2">
              <Star size={25} className="text-yellow-400 mt-1.5" />
              <span className="text-white text-[18px] font-medium ml-2 mt-2">
                {rating}
              </span>
            </div>
          </div>
        </div>

        {/* Location & Employment */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex">
            <div className="flex items-center mr-2 text-white text-[16px] font-roboto">
              <MapPin size={30} />
              <p className="ml-2">{location}</p>
            </div>
            <div className="flex items-center ml-[35px] text-white text-[16px] font-roboto">
              <Mail size={30} />
              <p className="ml-2">{employmentType}</p>
            </div>
          </div>
          <p className="text-white text-[16px] font-roboto">
            {packagePerAnnum}
          </p>
        </div>

        <hr className="border border-gray-500 w-full" />

        {/* Job description */}
        <div className="mt-4">
          <h1 className="text-[26px] font-extrabold text-white font-roboto mb-2">
            Description
          </h1>
          <p className="text-white text-[16px] font-roboto leading-[1.8]">
            {jobDescription}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default JobCard;
