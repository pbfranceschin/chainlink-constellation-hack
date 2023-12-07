// const EditIcon = ({ teamName, setTeamName, teamUserDeposit, setTeamUserDeposit, openTeamDepositModal, withBorder = true, size = 24 }) => {
// const EditIcon = ({ teamName, setTeamName, openTeamDepositModal, withBorder = true, size = 24 }) => {
const EditIcon = ({ handleOnClick, withBorder = true, size = 24 }) => {
  // const handleChangeTeamDeposit = () => {
  //   setTeamName(teamName)
  //   setTeamUserDeposit(teamUserDeposit)
  //   openTeamDepositModal()
  // }
  // const handleChangeTeamDeposit = () => {
  //   setTeamName(teamName)
  //   openTeamDepositModal()
  // }

  return (
    <svg onClick={handleOnClick} className={`cursor-pointer ${withBorder ? 'border border-[#005498] rounded-md' : ''}`} width={size} height={size} viewBox="0 -0.015 0.75 0.75" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M.399.239A.022.022 0 1 0 .364.211l.035.028ZM.205.446l.017.015A.023.023 0 0 0 .223.46L.205.446ZM.2.459.178.457.2.458Zm-.005.09L.173.548a.022.022 0 0 0 0 .003L.195.549ZM.219.57.22.592A.022.022 0 0 0 .224.591L.219.569Zm.09-.021.005.022L.308.549ZM.321.542l.017.014L.32.542ZM.52.33A.022.022 0 0 0 .485.302L.52.33ZM.365.212A.022.022 0 0 0 .4.24L.365.212ZM.429.165l.018.014A.024.024 0 0 0 .448.178L.429.165Zm.049-.01L.492.138A.023.023 0 0 0 .49.136L.478.155Zm.067.056L.561.195A.023.023 0 0 0 .559.194L.545.211Zm.01.025h.022-.022Zm-.01.025L.529.245a.023.023 0 0 0-.002.002l.018.014Zm-.061.04a.022.022 0 1 0 .035.028L.484.301Zm-.08-.08a.022.022 0 1 0-.045.007L.404.221Zm.101.116A.022.022 0 1 0 .499.292l.006.045ZM.364.211l-.177.22.035.028.177-.221L.364.21Zm-.176.22a.047.047 0 0 0-.011.026L.222.46a.001.001 0 0 1 0 .001L.188.432ZM.177.457.173.548.218.55.222.459.177.457ZM.173.551A.045.045 0 0 0 .22.592L.218.547.173.552Zm.051.04L.314.57.304.526l-.09.021.01.044ZM.314.57A.039.039 0 0 0 .337.555L.302.526.313.57ZM.338.555.519.329.484.301.303.527l.035.028ZM.399.239.447.18.412.152.364.211l.035.028ZM.448.178A.013.013 0 0 1 .466.174L.49.136a.058.058 0 0 0-.079.016l.037.026ZM.464.173l.067.056L.56.194.493.138.464.173ZM.53.227a.013.013 0 0 1 .004.009h.045A.057.057 0 0 0 .562.195L.53.227Zm.004.009A.012.012 0 0 1 .53.245l.032.032a.056.056 0 0 0 .017-.04H.534ZM.529.247.486.301l.035.028.043-.054L.529.247ZM.359.228a.129.129 0 0 0 .145.109L.498.292A.084.084 0 0 1 .403.221L.359.228Z" fill="#005498"/></svg>
  )
}

export default EditIcon;