import { useState } from "react";
import ProfileDetails from "./ProfileDetails";

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

const JobsFilterGroup = ({ onEmploymentChange, onSalaryChange }) => {
  const [filters, setFilters] = useState({
    employmentTypes: [],
    salaryRange: "",
  });

  const handleEmploymentTypeChange = (value) => {
    setFilters((prev) => {
      const updated = prev.employmentTypes.includes(value)
        ? prev.employmentTypes.filter((item) => item !== value)
        : [...prev.employmentTypes, value];

      if (onEmploymentChange) onEmploymentChange(updated);
      return { ...prev, employmentTypes: updated };
    });
  };

  const handleSalaryRangeChange = (value) => {
    setFilters((prev) => {
      if (onSalaryChange) onSalaryChange(value);
      return { ...prev, salaryRange: value };
    });
  };

  return (
    <div className="flex flex-col w-full max-w-xs p-4 bg-[#121212] rounded-lg space-y-6">
      {/* Profile Card */}
      <ProfileDetails />

      <hr className="border-gray-700" />

      {/* Employment Type Filters */}
      <div className="flex flex-col">
        <h2 className="text-white font-semibold text-lg mb-4">
          Type of Employment
        </h2>
        <ul className="space-y-3">
          {employmentTypesList.map((item) => (
            <li key={item.employmentTypeId} className="flex items-center">
              <input
                type="checkbox"
                id={item.employmentTypeId}
                value={item.employmentTypeId}
                checked={filters.employmentTypes.includes(
                  item.employmentTypeId
                )}
                onChange={() =>
                  handleEmploymentTypeChange(item.employmentTypeId)
                }
                className="h-4 w-4 text-indigo-500 focus:ring-indigo-400 rounded"
              />
              <label
                htmlFor={item.employmentTypeId}
                className="ml-2 text-white text-sm"
              >
                {item.label}
              </label>
            </li>
          ))}
        </ul>
      </div>

      <hr className="border-gray-700" />

      {/* Salary Range Filters */}
      <div className="flex flex-col">
        <h2 className="text-white font-semibold text-lg mb-4">Salary Range</h2>
        <ul className="space-y-3">
          {salaryRangesList.map((item) => (
            <li key={item.salaryRangeId} className="flex items-center">
              <input
                type="radio"
                id={item.salaryRangeId}
                name="salary"
                value={item.salaryRangeId}
                checked={filters.salaryRange === item.salaryRangeId}
                onChange={() => handleSalaryRangeChange(item.salaryRangeId)}
                className="h-4 w-4 text-indigo-500 focus:ring-indigo-400 rounded"
              />
              <label
                htmlFor={item.salaryRangeId}
                className="ml-2 text-white text-sm"
              >
                {item.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default JobsFilterGroup;
