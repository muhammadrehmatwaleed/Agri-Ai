import { useState } from "react";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
  e.preventDefault();

  if (!name || !email || !message) {
    alert("Please fill all fields.");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  setSuccess("✅ Your message has been sent successfully!");

  setName("");
  setEmail("");
  setMessage("");
};

  return (
    <section className="py-20 px-5 bg-green-50 min-h-screen">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg">

        <h1 className="text-4xl font-bold text-center text-green-700 mb-8">
          Contact Us
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">

          <input
            type="text"
            placeholder="Your Name"
            className="w-full border rounded-lg p-4"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Your Email"
            className="w-full border rounded-lg p-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <textarea
            rows="5"
            placeholder="Your Message"
            className="w-full border rounded-lg p-4"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button
            className="w-full bg-green-700 text-white py-4 rounded-lg hover:bg-green-800 transition"
          >
            Send Message
          </button>

        </form>

        {success && (
          <p className="text-green-700 font-semibold mt-6 text-center">
            {success}
          </p>
        )}

      </div>
    </section>
  );
}

export default Contact;