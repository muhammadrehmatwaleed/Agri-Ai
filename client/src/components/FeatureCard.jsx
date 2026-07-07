function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300">
      <div className="text-5xl">{icon}</div>

      <h3 className="text-2xl font-bold mt-4 text-green-700">
        {title}
      </h3>

      <p className="text-gray-600 mt-3">
        {description}
      </p>
    </div>
  );
}

export default FeatureCard;