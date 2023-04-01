import React, { useEffect } from "react";

const Toast = ({
  position,
  appearance,
  message,
  onHide,
  error,
  errorMsg,
}) => {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onHide();
    }, 5000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [onHide]);

  return (
    <div className={`toast ${position}`}>
      <div className={`alert ${appearance}`}>
        <div>
          <span>{error ? errorMsg : message}</span>
        </div>
      </div>
    </div>
  );
};

export default Toast;
