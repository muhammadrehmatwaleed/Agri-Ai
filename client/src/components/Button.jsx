function Button({ children, type = "button", onClick, className = "" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-800 hover:scale-105 transition duration-300 ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;