const SkillsCard = ({ skillDetails }) => {
  const { name, imageUrl } = skillDetails;

  return (
    <li className="flex flex-col justify-center">
      <div className="flex flex-row items-center">
        <img src={imageUrl} alt={name} className="h-10 mr-3" />
        <p className="text-white text-md font-roboto">{name}</p>
      </div>
    </li>
  );
};

export default SkillsCard;
