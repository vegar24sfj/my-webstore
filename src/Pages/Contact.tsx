const Contact = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        Contact Us
      </h1>

      <p className="text-lg text-gray-700 mb-6 text-center">
        Feel free to get in touch with us for any inquiries or support. You can
        contact us through the following channels:
      </p>

      {/* Combined Contact Information and Form in a single div */}
      <div className="space-y-8">
        {/* Contact Information */}
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Our Information
          </h2>
          <ul className="space-y-2 text-gray-700">
            <li>
              <strong>Email:</strong>{" "}
              <a
                href="mailto:support@example.com"
                className="text-blue-500 hover:underline"
              >
                support@example.com
              </a>
            </li>
            <li>
              <strong>Phone:</strong>{" "}
              <a
                href="tel:+11234567890"
                className="text-blue-500 hover:underline"
              >
                +1 (123) 456-7890
              </a>
            </li>
            <li>
              <strong>Address:</strong> 123 Main St, City, Country
            </li>
          </ul>
        </div>

        {/* Contact Form */}
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Send Us a Message
          </h2>
          <form action="#" method="POST" className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-gray-700 font-medium">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your name"
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium"
              >
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-gray-700 font-medium"
              >
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={5}
                placeholder="Write your message"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
