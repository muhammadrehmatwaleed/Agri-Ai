import Button from "./Button";
function Hero() {
  return (
    <section
      id="home"
      className="text-center mt-20 md:mt-24 px-5 py-16 bg-green-50"
    >
      <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold text-green-700 leading-tight">
        Smart Agriculture
      </h2>

      <h3 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight">
        Powered by Artificial Intelligence
      </h3>

      <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto">
        Helping Farmers with AI Disease Detection, Weather Forecast, Crop
        Recommendation and Market Prices.
      </p>

      <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
        <Button>
        Get Started
        </Button>
        <a
          href="#footer"
          className="border border-green-700 text-green-700 px-8 py-3 rounded-lg hover:bg-green-700 hover:text-white transition w-full sm:w-auto"
        >
          Learn More
        </a>
      </div>
    </section>
  );
}

export default Hero;