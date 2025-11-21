import { useState, useEffect } from "react";
import ProfileDetails from "./ProfileDetails";

const JobsFilterGroup = ({
  employmentTypesList,
  salaryRangesList,
  changeEmploymentType,
  changeSalaryRange,
}) => {
  const [filters, setFilters] = useState({
    employmentTypes: [],
    salaryRange: "",
  });

  const handleEmploymentTypeChange = (value) => {
    setFilters((prev) => {
      const updated = prev.employmentTypes.includes(value)
        ? prev.employmentTypes.filter((item) => item !== value)
        : [...prev.employmentTypes, value];
      return { ...prev, employmentTypes: updated };
    });
  };

  const handleSalaryRangeChange = (value) => {
    setFilters((prev) => ({ ...prev, salaryRange: value }));
  };

  // Notify parent whenever filters change
  useEffect(() => {
    if (changeEmploymentType) {
      changeEmploymentType(filters.employmentTypes);
    }
  }, [filters.employmentTypes, changeEmploymentType]);

  useEffect(() => {
    if (changeSalaryRange) {
      changeSalaryRange(filters.salaryRange);
    }
  }, [filters.salaryRange, changeSalaryRange]);

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
