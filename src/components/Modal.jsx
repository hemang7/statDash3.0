import React, { useState, forwardRef, useImperativeHandle } from "react";

const Modal = forwardRef((props, ref) => {
  const [showModal, setShowModal] = useState(false);

  // Open the modal using the passed ref
  useImperativeHandle(ref, () => ({
    openModal: () => {
      setShowModal(true);
    },
  }));

  // Callback to close the modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      {showModal ? (
        // Your modal content here
        // Example modal content:
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/* Content */}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/* Header */}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Terms and Conditions
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={handleCloseModal} // Close modal when "×" is clicked
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/* Body */}
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                    Welcome to the QCS Statistics Dashboard, a platform designed
                    for your statistical analysis needs. When you register,
                    please provide accurate information to maintain the
                    integrity of our community. We value your privacy and
                    collect data solely for improving our services and providing
                    important updates. We encourage responsible use, respect for
                    intellectual property, and adherence to the law. Please be
                    informed that we reserve the right to terminate accounts for
                    any violations of these terms. By using our service, you are
                    agreeing to our terms and conditions, which are designed to
                    ensure a smooth and secure user experience. Please click on
                    Agree to continue.
                  </p>
                </div>
                {/* Footer */}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="bg-emerald-500 text-white active-bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleCloseModal}
                  >
                    AGREE
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-y-0 right-0 w-full bg-black"></div>
        </>
      ) : null}
    </>
  );
});

export default Modal;
