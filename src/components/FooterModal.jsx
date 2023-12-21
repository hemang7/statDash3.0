import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";

import emailjs from "@emailjs/browser";
import { useToast } from "@chakra-ui/react"; // Import toast from Chakra UI

const FooterModal = forwardRef((props, ref) => {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [feedback, setFeedback] = useState("");
  const [attachment, setAttachment] = useState(null);

  const toast = useToast();

  // Open the modal using the passed ref
  useImperativeHandle(ref, () => ({
    openModal: () => {
      setShowModal(true);
    },
  }));

  const form = useRef();

  // Callback to close the modal
  const handleCloseModal = () => {
    setShowModal(false);
    // Reset form fields when closing the modal
    setName("");
    setEmail("");
    setFeedback("");
    setAttachment(null);
  };

  const handleFileChange = (e) => {
    // Handle file selection
    const file = e.target.files[0];
    setAttachment(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_8bzyb3r",
        "template_gqq06b7",
        form.current,
        "uOIZJKhpS11ZyW8d2"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    handleCloseModal();
    toast({
      title: "Success",
      description: "Feedback Sent! Thank you.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <>
      {showModal ? (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold text-black">
                    Feedback
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={handleCloseModal}
                  ></button>
                </div>
                <div className="relative p-6 flex-auto text-black">
                  <form
                    enctype="multipart/form-data"
                    method="post"
                    ref={form}
                    onSubmit={handleSubmit}
                  >
                    <div className="mb-4">
                      <input
                        type="text"
                        name="from_name"
                        id="name"
                        value={name}
                        required
                        placeholder="Your Name"
                        className="w-full p-2 border rounded-md"
                      />
                    </div>
                    <div className="mb-4">
                      <input
                        type="email"
                        name="from_email"
                        id="email"
                        value={email}
                        required
                        placeholder="Your Email"
                        className="w-full p-2 border rounded-md"
                      />
                    </div>

                    <div className="mb-4">
                      <textarea
                        name="message"
                        placeholder="Please enter your feedback here."
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        required
                        className="w-full h-32 p-2 border rounded-md"
                      ></textarea>
                    </div>

                    <div className="mb-4">
                      <input
                        type="file"
                        id="attachment"
                        accept=".pdf, .doc, .docx"
                        onChange={handleFileChange}
                        name="my_file"
                        className="p-2 rounded-md"
                      />
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={handleCloseModal}
                        className="inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 bg-gray-200 transition duration-150 ease-in-out hover:bg-gray-300 focus:bg-gray-300 focus:outline-none focus:ring-0 active:bg-gray-400"
                      >
                        Cancel
                      </button>

                      <button
                        type="submit"
                        className="bg-emerald-500 text-white active-bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ml-2"
                      >
                        Send
                      </button>
                    </div>
                  </form>
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

export default FooterModal;
