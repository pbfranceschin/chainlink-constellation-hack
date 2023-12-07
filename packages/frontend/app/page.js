'use client'

/**
 * This component is a post-processed version of 
 * a component created with v0 by Vercel.
 * @see https://v0.dev/t/tUDdJsnd53r
 */
import Link from "next/link"
import TeamsTable from "./components/TeamsTable"
import EditIcon from "./components/EditIcon";
import Modal from './components/Modal';
import { useState } from "react";
import { sponsorDepositText, sponsorWithdrawText, teamDepositText, teamWithdrawText} from './components/utils'


 /* Initial Data */
 /* 
    Obs.: atenção com as chaves dos objetos, elas precisam 
    casar com o restante do código! 
 */
 const useTeamData = [
  { col1: 'Dortmund', col2: '190740', col3: '0', col4: '10', col5: '0' },
  { col1: 'FC Porto', col2: '0', col3: '0', col4: '0', col5: '0' },
  { col1: 'Lazio', col2: '0', col3: '0', col4: '0', col5: '0' },
  { col1: 'Benfica', col2: '0', col3: '0', col4: '0', col5: '0' },
  { col1: 'Real Madrid', col2: '0', col3: '0', col4: '0', col5: '0' },
  { col1: 'PSV', col2: '0', col3: '0', col4: '0', col5: '0' },
  { col1: 'Napoli', col2: '0', col3: '0', col4: '0', col5: '0' },
];

const columns = [
  { header: 'Team', accessor: 'col1' },
  { header: 'Total deposit (USDC)', accessor: 'col2' },
  { header: 'Total yield (USDC)', accessor: 'col3' },
  { header: 'Your deposit (USDC)', accessor: 'col4' },
  { header: 'Your yield (USDC)', accessor: 'col5' },
];

const useSponsorData = [
  {name: 'UEFA Champions League 2023', totalAmount: 10, userAmount: 0},
  {name: 'blablabal', totalAmount: 2, userAmount: 0.1}
]

export default function Home() {
  /* State management */
  const [teamTableData, setTeamTableData] = useState(useTeamData)
  const [sponsorData, setSponsorData] = useState(useSponsorData)
  const [isTeamDepositModalOpen, setIsTeamDepositModalOpen] = useState(false);
  const [isSponsorDepositModalOpen, setIsSponsorDepositModalOpen] = useState(false);
  const [targetTeamName, setTargetTeamName] = useState('');
  const [tournamentName, setTournamentName] = useState('UEFA Champions League 2023')

  /* Auxiliary functions */
  const openTeamDepositModal = () => setIsTeamDepositModalOpen(true);
  const closeTeamDepositModal = () => setIsTeamDepositModalOpen(false);
  const openSponsorDepositModal = () => setIsSponsorDepositModalOpen(true);
  const closeSponsorDepositModal = () => setIsSponsorDepositModalOpen(false);
  const handleSponsorDepositEdit = () => {
    openSponsorDepositModal()
  }
  const updateSponsorData = (targetTournament, amount) => {
    let newSponsorData = [...sponsorData]
    newSponsorData.map((tournament) => {
      if (tournament.name === targetTournament) {
        tournament.totalAmount = tournament.totalAmount + amount
        tournament.userAmount = tournament.userAmount + amount
    }})
    setSponsorData(newSponsorData)
  }
  const updateTeamTableData = (targetTeam, amount) => {
    let newTeamTableData = [...teamTableData]
    newTeamTableData.map((row) => {
      if (row.col1 === targetTeam) {
        row.col2 = parseFloat(row.col2) + parseFloat(amount)
        row.col4 = parseFloat(row.col4) + parseFloat(amount)
      }
    })
    setTeamTableData(newTeamTableData)
  }

  /* Components */
  const SponsorButton = ({ openSponsorDepositModal }) => {
    return (
      <button onClick={openSponsorDepositModal} className="w-full px-4 py-2 bg-gray-500 border-gray-500 border rounded-lg text-lg text-center">
        DEPOSIT
      </button>
    )
  }

  /* Temporary Dummy functions */
  const getDaysLeft = () => 5
  const getTotalSponsorAmount = () => sponsorData[0].totalAmount
  const getUserSponsorData = () => sponsorData[0].userAmount
  const getUserDepositAmount = (teamTableData, teamName) => {
    let currentUserDepositAmount = 0
    teamTableData.map((row) => {
      if (row.col1 === teamName) {
        currentUserDepositAmount = parseFloat(row.col4)
      }
    })
    return currentUserDepositAmount
  }

  /* Variables */
  const daysLeft = getDaysLeft();
  const totalSponsorAmount = getTotalSponsorAmount();
  const userSponsorAmount = getUserSponsorData();

  return (
    <section className="w-full">
      <header className="sticky top-0 z-50 flex items-center h-16 px-6 bg-white">
        <Link href="#">
          <div className="flex items-center space-x-2">
            <IconHome className="h-8 w-8 text-gray-900" />
            <span className="text-2xl font-semibold text-gray-900">Logo</span>
          </div>
        </Link>
      </header>
      {isTeamDepositModalOpen &&
        <Modal
          onClose={closeTeamDepositModal} 
          targetTeam={targetTeamName}
          currentUserAmount={getUserDepositAmount(teamTableData, targetTeamName)}
          setCurrentUserAmount={(amount) => updateTeamTableData(targetTeamName, amount)}
          depositText={teamDepositText(targetTeamName, getUserDepositAmount(teamTableData, targetTeamName))}
          withdrawText={teamWithdrawText(targetTeamName, getUserDepositAmount(teamTableData, targetTeamName))}
        />
      }
      {isSponsorDepositModalOpen &&
        <Modal 
          onClose={closeSponsorDepositModal} 
          targetName={tournamentName}
          currentUserAmount={getUserSponsorData()}
          setCurrentUserAmount={(amount) => updateSponsorData(tournamentName, amount)}
          depositText={sponsorDepositText(tournamentName, getUserSponsorData())}
          withdrawText={sponsorWithdrawText(tournamentName, getUserSponsorData())}
        />
      }
      <main className="container mx-auto px-8">
        <div className="grid grid-cols-10 grid-rows-8 gap-6">
          {/* <div className="text-center col-span-10 bg-red-500 text-3xl">
            Let the games begin!
          </div> */}
          <div className="col-span-10 row-start-2">
            <div className="bg-red-500">
              <p className="text-gray-900 text-2xl">
                UEFA Champions League 2023
              </p>
            </div>
          </div>
          <div className="py-6 px-12 rounded-lg bg-white col-span-4 row-span-2 row-start-3">
            <div className="flex flex-col items-center place-content-between h-full">
              <div className="bg-red-500 text-xl">This tournament ends in</div>
              <div className="bg-red-500 text-3xl">
                {daysLeft} <span className="">days</span>
              </div>
            </div>
          </div>
          <div className="col-span-6 row-span-2 col-start-5 row-start-3">
            <div className="flex flex-row gap-6 h-full">
              <div className="flex flex-col items-left place-content-between py-6 px-12 rounded-lg bg-white">
                <div className="bg-red-500 text-xl">
                  Total sponsor amount
                </div>
                <div className="bg-red-500 text-3xl">
                  {totalSponsorAmount} <span className="text-2xl">USDC</span>
                </div>
              </div>
              <div className="flex-grow flex flex-col items-left gap-5 py-6 px-12 rounded-lg bg-white ">
                <div className="bg-red-500 text-xl">
                  {userSponsorAmount > 0 
                    ? 'Your sponsor amount'
                    : 'Sponsor this tournament'}
                </div>
                <div className="text-3xl">
                  {userSponsorAmount > 0 
                    ? <div className="flex gap-3 items-end">
                        {userSponsorAmount} 
                        <span className="text-2xl"> USDC</span>
                        <div className="pl-2 place-self-center">
                          <EditIcon handleOnClick={handleSponsorDepositEdit} size={32}/>
                        </div>
                      </div>
                    : <SponsorButton openSponsorDepositModal={openSponsorDepositModal} />} 
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-10 row-span-4 row-start-5">
            <TeamsTable data={teamTableData} columns={columns} setTargetTeamName={setTargetTeamName} openTeamDepositModal={openTeamDepositModal}/>
          </div>
        </div>
      </main>
    </section>
  )
}

function IconHome(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}
