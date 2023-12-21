import React, { useRef } from "react";
import FooterModal from "./FooterModal"; // Import the Modal component

function Footer({ onFeedbackClick, user }) {
  const modalRef = useRef(null);

  const handleOpenModal = () => {
    modalRef.current.openModal();
  };

  return (
    <footer className="py-4 bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500 text-white">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mx-4">
          <p className="text-lg">We'd love to hear from you</p>
          <button
            className="bg-blue-700 text-white py-2 px-4 rounded-full hover:bg-blue-900 hover:text-white transition duration-300 ease-in-out"
            onClick={() => {
              handleOpenModal();
            }}
          >
            Give Feedback
          </button>
        </div>
      </div>
      {/* Feedback Modal */}
      <FooterModal ref={modalRef} user={user} />
    </footer>
  );
}

export default Footer;
