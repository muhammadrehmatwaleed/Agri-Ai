function Features() {
  const features = [
    {
      title: "Disease Detection",
      icon: "🌱",
      description: "Upload crop images and detect diseases using AI.",
    },
    {
      title: "Weather Forecast",
      icon: "☀️",
      description: "Real-time weather updates for farmers.",
    },
    {
      title: "Crop Recommendation",
      icon: "🌾",
      description: "AI recommends the best crop based on soil and weather.",
    },
    {
      title: "Market Prices",
      icon: "📈",
      description: "Get the latest agricultural market prices.",
    },
  ];

  return (
    <section id="features" className="py-20 px-5 bg-white">
      <h2 className="text-4xl md:text-5xl font-bold text-center text-green-700">
        Our Features
      </h2>

      <p className="text-center text-gray-600 mt-4 text-lg">
        Smart farming solutions powered by AI.
      </p>

      <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-2xl transition duration-300"
          >
            <div className="text-6xl mb-5">{feature.icon}</div>

            <h3 className="text-2xl font-bold text-green-700 mb-4">
              {feature.title}
            </h3>

            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;