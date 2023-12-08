const Button = ({ label, handleOnClick, isActive=true, isPrize=false}) => {
  const colors = (isActive && !isPrize)
    ? 'bg-primary border-primary text-text1 hover:scale-105 active:scale-95'
    : (isPrize
      ? 'bg-[#C3D350] border-[#C3D350] text-background2 hover:scale-105 active:scale-95'
      : 'bg-background4 border-background4 text-text4')
  return (
    <button 
      onClick={handleOnClick}
      // className={`w-full px-4 py-2 border rounded-2xl text-lg text-center tracking-wider font-semibold transition ease ${isActive ? 'bg-primary border-primary text-text1 hover:scale-105 focus:scale-95' : 'bg-background4 border-background4 text-text4'} ${isPrize ? 'bg-[#C3D350] border-[#C3D350] text-background2' : ''}`}
      className={`w-full px-4 py-2 border rounded-2xl text-lg text-center tracking-wider font-semibold transition ease ${colors}`}
      disabled={!isActive}
    >
      {label}
    </button>
  )
}

export default Button;