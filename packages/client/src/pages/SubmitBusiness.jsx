import React, { useState } from "react";
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
  const [formData, setFormData] = useState(initialFormState);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("business", formData);

      console.log(response.data);
      setFormData(initialFormState);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "selectedCategory" ? value : e.target.value,
    });
  };

  return (
    <form
      className="flex flex-col py-4 items-center bg-secondary  "
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
          value={formData.selectedCategory}
          className="input input-bordered input-sm w-full max-w-xs"
          onChange={handleChange}
        >
          <option value={formData.category}>Select One</option>
          {formData.category.map((category) => (
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
      <button className="btn btn-primary mt-4">
        Submit Business
      </button>
    </form>
  );
};

export default SubmitBusiness;
