const ReviewModal = ({
  children,
  title,
  handleSubmit,
  showModal,
  setShowModal,
}) => {
  return (
    <>
      <label htmlFor="my-modal-4" className="btn">
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
        <label className="modal-box relative " htmlFor="">
          <form
            className="flex flex-col  py-4 items-center bg-gray-300 w-full max-w-md"
            onSubmit={handleSubmit}
          >
            {children}
          </form>
        </label>
      </label>
    </>
  );
};

export default ReviewModal;
