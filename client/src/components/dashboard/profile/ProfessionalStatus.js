import React from "react";

const ProfessionalStatus = () => {
  // Options for professional status
  const optionList = [
    {
      label: "Select your professional status",
      value: "Select your professional status"
    },
    { label: "Jr. Developer", value: "Jr. Developer" },
    { label: "Developer", value: "Developer" },
    { label: "Sr. Developer", value: "Sr. Developer" },
    { label: "Manager", value: "Manager" },
    { label: "Student", value: "Student" },
    { label: "Intern", value: "Intern" },
    { label: "Tech Lead", value: "Tech Lead" },
    { label: "Other", value: "Other" }
  ];
  return optionList.map((item, index) => {
    return <option key={index}>{item.value}</option>;
  });
};

export default ProfessionalStatus;
