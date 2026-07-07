function Stats() {
  const stats = [
    {
      number: "5000+",
      title: "Farmers Helped",
    },
    {
      number: "98%",
      title: "Detection Accuracy",
    },
    {
      number: "24/7",
      title: "Weather Updates",
    },
    {
      number: "100+",
      title: "Supported Crops",
    },
  ];

  return (
    <section className="py-20 bg-green-700 text-white px-5">
      <div className="max-w-7xl mx-auto">

        <h2 className="text-4xl md:text-5xl font-bold text-center mb-14">
          Our Impact
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">

          {stats.map((item, index) => (
            <div
              key={index}
              className="text-center bg-green-800 rounded-xl p-8 shadow-lg"
            >
              <h3 className="text-4xl md:text-5xl font-bold">
                {item.number}
              </h3>

              <p className="mt-3 text-lg">
                {item.title}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Stats;