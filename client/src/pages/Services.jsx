function Services() {
  return (
    <>
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-5xl font-bold text-green-700 text-center mb-12">
            Our Services
          </h1>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

            <div className="bg-white shadow-lg rounded-xl p-8">
              <h2 className="text-2xl font-bold text-green-700 mb-4">
                Disease Detection
              </h2>
              <p>
                Upload crop images and detect diseases using AI.
              </p>
            </div>

            <div className="bg-white shadow-lg rounded-xl p-8">
              <h2 className="text-2xl font-bold text-green-700 mb-4">
                Weather Forecast
              </h2>
              <p>
                Real-time weather updates for farmers.
              </p>
            </div>

            <div className="bg-white shadow-lg rounded-xl p-8">
              <h2 className="text-2xl font-bold text-green-700 mb-4">
                Crop Recommendation
              </h2>
              <p>
                AI recommends the best crop based on soil and weather.
              </p>
            </div>

            <div className="bg-white shadow-lg rounded-xl p-8">
              <h2 className="text-2xl font-bold text-green-700 mb-4">
                Market Prices
              </h2>
              <p>
                Get the latest agricultural market prices.
              </p>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}

export default Services;