import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FileUpload } from "../components/FileUpload";
import ReviewModal from "../components/ReviewModal";
import ViewSingleBusiness from "../components/ViewSingleBusiness";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const initialFormState = {
  name: "",
  description: "",
  category: ["Restaurant", "Bar", "Cafe", "Retail", "Salon", "Other"],
  address: "",
  phone: "",
  email: "",
  website: "",
  selectedCategory: "",
};

const SubmitBusiness = () => {
  const axios = useAxiosPrivate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [formFields, setFormFields] = useState(initialFormState);
  const [businessId, setBusinessId] = useState(null);
  const [showModal, setShowModal] = useState(false);
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
    formData.append("email", formFields.email);
    formData.append("website", formFields.website);

    /* This is the code that is being executed when the user clicks the submit button. */
    try {
      const response = await axios.post("business", formData, {
        headers: { "Content-Type": "multipart/formdata" },
      });

      console.log(response.data);
      setBusinessId(response.data._id);
      setShowModal(false); // close modal after form submission
      setFormFields({ ...initialFormState });
      navigate(`/businesses/${response.data._id}`);
    } catch (error) {
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
    <ReviewModal
      title="Submit Business"
      handleSubmit={handleSubmit}
      showModal={showModal}
      setShowModal={setShowModal}
    >
      <div className="flex justify-center mt-2">
        <div className="flex flex-col  py-4 items-center bg-gray-300 w-full max-w-md">
          <label htmlFor="name" className="w-full">
            Business Name:
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Type here"
              className="input input-bordered input-sm w-full mt-1"
              onChange={handleChange}
            />
          </label>
          <label htmlFor="description" className="w-full">
            Description:
            <input
              id="description"
              type="text"
              name="description"
              placeholder="Type here"
              className="input input-bordered input-sm w-full mt-1"
              onChange={handleChange}
            />
          </label>
          <label htmlFor="category" className="w-full">
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
          <label htmlFor="address" className="w-full">
            Address:
            <input
              id="address"
              type="text"
              name="address"
              placeholder="Type here"
              className="input input-bordered input-sm w-full mt-1"
              onChange={handleChange}
            />
          </label>
          <label htmlFor="phone" className="w-full">
            Phone Number:
            <input
              id="phone"
              type="text"
              name="phone"
              maxLength={10}
              pattern="[0-9]*"
              placeholder="xxx-xxx-xxxx"
              className="input input-bordered input-sm w-full mt-1"
              onChange={handleChange}
            />
          </label>
          <label htmlFor="email" className="w-full">
            Email:
            <input
              id="email"
              type="email"
              name="email"
              placeholder="company@company.com"
              className="input input-bordered input-sm w-full mt-1"
              onChange={handleChange}
            />
          </label>
          <label htmlFor="website" className="w-full">
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
          <button type="submit" className="btn">
            Submit
          </button>
          <FileUpload setSelectedFile={setSelectedFile} />
        </div>
      </div>
    </ReviewModal>
  );
};

export default SubmitBusiness;
