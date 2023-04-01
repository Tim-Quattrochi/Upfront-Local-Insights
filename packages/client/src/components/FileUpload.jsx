export const FileUpload = ({ setSelectedFile }) => {
  return (
    <div className="form-control w-full max-w-xs">
      <label className="label">
        <span className="text-center">Upload photo</span>
      </label>
      <input
        type="file"
        className="file-input file-input-bordered w-full max-w-xs mb-4"
        onChange={(e) => setSelectedFile(e.target.files[0])}
      />
    </div>
  );
};
