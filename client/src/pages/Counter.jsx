import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-green-50">
      <h1 className="text-5xl font-bold text-green-700 mb-10">
        React Counter
      </h1>

      <h2 className="text-7xl font-bold mb-10">
        {count}
      </h2>

      <div className="flex gap-5">

        <button
          onClick={() => setCount(count + 1)}
          className="bg-green-700 text-white px-8 py-3 rounded-lg"
        >
          Increase
        </button>

        <button
          onClick={() => setCount(count - 1)}
          className="bg-red-600 text-white px-8 py-3 rounded-lg"
        >
          Decrease
        </button>

        <button
          onClick={() => setCount(0)}
          className="bg-gray-700 text-white px-8 py-3 rounded-lg"
        >
          Reset
        </button>

      </div>
    </div>
  );
}

export default Counter;