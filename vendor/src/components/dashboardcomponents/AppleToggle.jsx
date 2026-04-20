const AppleToggle = ({ checked, onChange, disabled }) => {
  return (
    <button
      onClick={onChange}
      disabled={disabled}
      className={`relative w-12 h-7 flex items-center rounded-full transition duration-300 
        ${checked ? "bg-green-500 shadow-lg shadow-green-500/30" : "bg-gray-600"} 
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
      `}
    >
      <span
        className={`absolute left-1 top-1 w-5 h-5 bg-white rounded-full shadow-md transform transition duration-300
          ${checked ? "translate-x-5 scale-105" : "translate-x-0"}
        `}
      />
    </button>
  );
};

export default AppleToggle