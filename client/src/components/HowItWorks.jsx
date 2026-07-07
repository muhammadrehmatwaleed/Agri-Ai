function HowItWorks() {
  const steps = [
    {
      number: "1",
      title: "Register",
      description: "Create your free AgriAI account.",
    },
    {
      number: "2",
      title: "Upload Crop",
      description: "Upload an image of your crop or plant.",
    },
    {
      number: "3",
      title: "AI Analysis",
      description: "Our AI analyzes the image instantly.",
    },
    {
      number: "4",
      title: "Get Solution",
      description: "Receive disease detection and treatment advice.",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="py-20 px-5 bg-green-50"
    >
      <div className="max-w-7xl mx-auto">

        <h2 className="text-4xl md:text-5xl font-bold text-center text-green-700">
          How AgriAI Works
        </h2>

        <p className="text-center text-gray-600 mt-4 text-lg">
          Just four simple steps to help every farmer.
        </p>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {steps.map((step) => (
            <div
              key={step.number}
              className="bg-white rounded-2xl shadow-lg p-8 text-center hover:-translate-y-2 hover:shadow-2xl transition duration-300"
            >
              <div className="w-16 h-16 mx-auto rounded-full bg-green-700 text-white flex items-center justify-center text-2xl font-bold">
                {step.number}
              </div>

              <h3 className="mt-6 text-2xl font-bold text-green-700">
                {step.title}
              </h3>

              <p className="mt-4 text-gray-600">
                {step.description}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default HowItWorks;