const Button = ({ label, handleOnClick, isActive=true }) => {
  return (
    <button 
      onClick={handleOnClick}
      className={`w-full px-4 py-2 bg-gray-500 border-gray-500 border rounded-lg text-lg text-center ${isActive ? 'bg-gray-500 border-gray-500' : 'bg-gray-200 border-gray-200 text-gray-400'}`}
      disabled={!isActive}
    >
      {label}
    </button>
  )
}

export default Button;