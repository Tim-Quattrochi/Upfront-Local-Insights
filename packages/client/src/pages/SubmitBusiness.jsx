import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FileUpload } from "../components/FileUpload";
import BusinessSubmitModal from "../components/BusinessSubmitModal";
import ViewSingleBusiness from "../components/ViewSingleBusiness";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const initialFormState = {
  name: "",
  description: "",
  category: [
    "Restaurant",
    "Bar",
    "Cafe",
    "Retail",
    "Salon",
    "Animal",
    "Auto",
    "Hardware",
    "Gas Station",
    "Other",
  ],
  address: "",
  phone: "",
  website: "",
  selectedCategory: "",
  errorMsg: null,
};

const SubmitBusiness = () => {
  const axios = useAxiosPrivate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [formFields, setFormFields] = useState(initialFormState);
  const [businessId, setBusinessId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    /* Creating a new form data object and appending the form fields to it. */
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("name", formFields.name);
    formData.append("description", formFields.description);
    formData.append("selectedCategory", formFields.selectedCategory);
    formData.append("address", formFields.address);
    formData.append("phone", formFields.phone);
    formData.append("website", formFields.website);

    /* This is the code that is being executed when the user clicks the submit button. */
    try {
      const response = await axios.post("business", formData, {
        headers: { "Content-Type": "multipart/formdata" },
      });

      setBusinessId(response.data._id);
      setShowModal(false); // close modal after form submission
      setFormFields({ ...initialFormState });
      navigate(`/businesses/${response.data._id}`);
    } catch (error) {
      setFormFields({
        ...formFields,
        errorMsg: error.response.data.error,
      });
      console.log(error);
    }
  };

  /**
   * The handleChange function takes an event as an argument, and then sets the formFields state to the
   * name and value of the event target
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields({
      ...formFields,
      [name]: name === "selectedCategory" ? value : e.target.value,
    });
  };

  return (
    /* This is a modal that is being used to submit a business. */
    <BusinessSubmitModal
      title="Submit Business"
      handleSubmit={handleSubmit}
      showModal={showModal}
      setShowModal={setShowModal}
    >
      <div className="flex justify-center mt-2">
        <div className="flex flex-col  py-4 items-center w-full max-w-md">
          <label htmlFor="name" className="w-full ">
            Business Name:
            <input
              id="name"
              type="text"
              name="name"
              className="input input-bordered  input-sm w-full mt-1"
              onChange={handleChange}
            />
          </label>
          <label htmlFor="description" className="w-full ">
            Description:
            <input
              id="description"
              type="text"
              name="description"
              className="input input-bordered input-sm w-full mt-1"
              onChange={handleChange}
            />
          </label>
          <label htmlFor="category" className="w-full ">
            Category:
            <select
              id="category"
              name="selectedCategory"
              value={formFields.selectedCategory}
              className="input input-bordered input-sm w-full mt-1"
              onChange={handleChange}
            >
              <option value={formFields.category}>Select One</option>
              {formFields.category.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="address" className="w-full ">
            Address:
            <input
              id="address"
              type="text"
              name="address"
              className="input input-bordered input-sm w-full mt-1"
              onChange={handleChange}
            />
          </label>
          <label htmlFor="phone" className="w-full ">
            Phone Number:
            <input
              id="phone"
              type="text"
              name="phone"
              maxLength={10}
              pattern="[0-9]*"
              placeholder="numbers only no dashes"
              className="input input-bordered input-sm w-full mt-1"
              onChange={handleChange}
            />
          </label>

          <label htmlFor="website" className="w-full ">
            Website URL:
            <input
              id="website"
              type="website"
              name="website"
              placeholder="www.company.com"
              className="input input-bordered input-sm w-full mt-1"
              onChange={handleChange}
            />
          </label>
          <button type="submit" className="btn m-1">
            Submit
          </button>
          {formFields.errorMsg && (
            <div
              className="flex bg-red-100 rounded-lg p-3 mb-3 mt-1 text-sm text-red-700"
              role="alert"
            >
              <svg
                className="w-5 h-5 inline mr-3"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <div>
                <span className="font-medium">Error</span>{" "}
                {formFields.errorMsg && formFields.errorMsg}
              </div>
            </div>
          )}
          <FileUpload setSelectedFile={setSelectedFile} />
        </div>
      </div>
    </BusinessSubmitModal>
  );
};

export default SubmitBusiness;
