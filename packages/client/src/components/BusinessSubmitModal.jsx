const BusinessSubmitModal = ({
  children,
  title,
  handleSubmit,
  showModal,
  setShowModal,
}) => {
  return (
    <>
      <label
        htmlFor="my-modal-4"
        className=" btn btn-xs sm:btn-sm md:btn-md lg:btn-md hover:text-gray-800 transition-all"
      >
        {title}
      </label>
      <input
        type="checkbox"
        id="my-modal-4"
        className="modal-toggle"
        checked={showModal}
        onChange={() => setShowModal(!showModal)}
      />
      <label htmlFor="my-modal-4" className="modal cursor-pointer">
        <label className="modal-box relative bg-inherit " htmlFor="">
          <form
            className="flex flex-col  py-4 items-center text-black bg-gray-500 w-full max-w-md"
            onSubmit={handleSubmit}
          >
            {children}
          </form>
        </label>
      </label>
    </>
  );
};

export default BusinessSubmitModal;
