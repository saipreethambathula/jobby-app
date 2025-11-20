import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Loader } from "lucide-react";

const apiStatusConstants = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

const ProfileDetails = () => {
  const [profile, setProfile] = useState(null);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);

  const getProfileDetails = async () => {
    setApiStatus(apiStatusConstants.inProgress);
    const jwtToken = Cookies.get("jwt_token");
    const url = "https://apis.ccbp.in/profile";

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        const profileData = {
          name: data.profile_details.name,
          profileImageUrl: data.profile_details.profile_image_url,
          shortBio: data.profile_details.short_bio,
        };
        setProfile(profileData);
        setApiStatus(apiStatusConstants.success);
      } else {
        setApiStatus(apiStatusConstants.failure);
      }
    } catch (error) {
      setApiStatus(apiStatusConstants.failure);
    }
  };

  useEffect(() => {
    getProfileDetails();
  }, []);

  const renderProfileDetails = () => (
    <div className="bg-cover bg-[url('https://assets.ccbp.in/frontend/react-js/profile-bg.png')] w-72 rounded-xl p-5 mb-6">
      <img
        src={profile.profileImageUrl}
        alt="profile"
        className="w-12 h-12 rounded-full"
      />
      <h1 className="text-indigo-500 font-bold text-xl mt-4">{profile.name}</h1>
      <p className="text-gray-400 text-base mt-4 leading-7">
        {profile.shortBio}
      </p>
    </div>
  );

  const renderLoadingView = () => (
    <div className="flex justify-center items-center mt-48">
      <Loader className="animate-spin text-indigo-500" size={48} />
    </div>
  );

  const renderFailureView = () => (
    <div className="flex justify-center mt-48">
      <button
        type="button"
        className="bg-indigo-500 px-4 py-2 rounded-md text-white font-medium"
        onClick={getProfileDetails}
      >
        Retry
      </button>
    </div>
  );

  switch (apiStatus) {
    case apiStatusConstants.success:
      return renderProfileDetails();
    case apiStatusConstants.inProgress:
      return renderLoadingView();
    case apiStatusConstants.failure:
      return renderFailureView();
    default:
      return null;
  }
};

export default ProfileDetails;
