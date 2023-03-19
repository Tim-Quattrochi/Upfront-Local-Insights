import React, { useState } from "react";
import { FileUpload } from "../components/FileUpload";
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("name", formFields.name);
    formData.append("description", formFields.description);
    formData.append("selectedCategory", formFields.selectedCategory);
    formData.append("address", formFields.address);
    formData.append("phone", formFields.phone);
    formData.append("email", formFields.email);
    formData.append("website", formFields.website);

    try {
      const response = await axios.post("business", formData, {
        headers: { "Content-Type": "multipart/formdata" },
      });

      console.log(response.data);
      setFormFields(initialFormState);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields({
      ...formFields,
      [name]: name === "selectedCategory" ? value : e.target.value,
    });
  };

  return (
    <form
      className="flex flex-col py-4 items-center bg-gray-300  "
      onSubmit={handleSubmit}
    >
      <label htmlFor="name">
        Business Name:
        <input
          id="name"
          type="text"
          name="name"
          placeholder="Type here"
          className="input input-bordered input-sm w-full max-w-xs m-1"
          onChange={handleChange}
        />
      </label>
      <label htmlFor="description">
        Description:
        <input
          id="description"
          type="text"
          name="description"
          placeholder="Type here"
          className="input input-bordered input-sm w-full max-w-xs m-1"
          onChange={handleChange}
        />
      </label>
      <label htmlFor="category">
        Category:
        <select
          id="category"
          name="selectedCategory"
          value={formFields.selectedCategory}
          className="input input-bordered input-sm w-full max-w-xs"
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
      <label htmlFor="address">
        Address:
        <input
          id="address"
          type="text"
          name="address"
          placeholder="Type here"
          className="input input-bordered input-sm w-full max-w-xs m-1"
          onChange={handleChange}
        />
      </label>
      <label htmlFor="Phone Number ">
        Phone Number:
        <input
          id="phone"
          type="text"
          name="phone"
          maxLength={10}
          pattern="[0-9]*"
          placeholder="xxx-xxx-xxxx"
          className="input input-bordered input-sm w-full max-w-xs"
          onChange={handleChange}
        />
      </label>
      <label htmlFor="email ">
        Email:
        <input
          id="email"
          type="email"
          name="email"
          placeholder="company@company.com"
          className="input input-bordered input-sm w-full max-w-xs"
          onChange={handleChange}
        />
      </label>
      <label htmlFor="website ">
        Website URL:
        <input
          id="website"
          type="website"
          name="website"
          placeholder="www.company.com"
          className="input input-bordered input-sm w-full max-w-xs m-1"
          onChange={handleChange}
        />
      </label>
      <FileUpload setSelectedFile={setSelectedFile} />
      <button className="btn btn-primary mt-4">
        Submit Business
      </button>
    </form>
  );
};

export default SubmitBusiness;
