import { Star, Briefcase, MapPin } from "lucide-react";

const SimilarJobItem = ({ jobDetails }) => {
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    title,
    rating,
  } = jobDetails;

  return (
    <li className="bg-[#202020] p-7 w-[370px] rounded-[15px]">
      <div className="flex items-center mb-4">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="w-15 mr-5"
        />
        <div>
          <h1 className="text-white font-roboto text-xl font-bold">{title}</h1>
          <div className="flex items-center mt-1">
            <Star className="w-5 h-5 text-yellow-400 mr-1" />
            <p className="text-white">{rating}</p>
          </div>
        </div>
      </div>

      <h1 className="text-white text-xl font-roboto mb-3">Description</h1>
      <p className="text-white text-base font-roboto leading-8">
        {jobDescription}
      </p>

      <div className="flex mt-4 gap-6">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-white" />
          <p className="text-white text-base">{location}</p>
        </div>
        <div className="flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-white" />
          <p className="text-white text-base">{employmentType}</p>
        </div>
      </div>
    </li>
  );
};

export default SimilarJobItem;
