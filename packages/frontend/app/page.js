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
import React, { useState, useEffect } from "react";
import { ConnectButton } from "./components/ConnectButton";
import Button from "./components/Button";
import Logo from "./components/Logo"
import LogoName from "./components/LogoName"
import { sponsorDepositText, sponsorWithdrawText, teamDepositText, teamWithdrawText} from './components/utils'
import { useYieldByOutcome, useIndividualYield, useTVL, useTotalYield } from "./hooks/pool";
import { getApiAddress } from "./utils";
import { mumbaiUSDCPool } from "@/blockchain/addresses/testnet";
import { privateKeyToAccount } from 'viem/accounts' 

// const pkey2 = `0x${process.env.NEXT_PUBLIC_PRIVATE_KEY_2}`;
// const account = privateKeyToAccount(pkey2);

 /* Initial Test Data */
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
const useWinnerData = 'Dortmund'
const useUserPrize = 10
const useDaysLeft = 0

export default function Home() {
  /* State management */
  const [teamTableData, setTeamTableData] = useState(useTeamData)
  const [sponsorData, setSponsorData] = useState(useSponsorData)
  const [isTeamDepositModalOpen, setIsTeamDepositModalOpen] = useState(false);
  const [isSponsorDepositModalOpen, setIsSponsorDepositModalOpen] = useState(false);
  const [targetTeamName, setTargetTeamName] = useState('');
  const [tournamentName, setTournamentName] = useState('UEFA Champions League 2023');
  const [winnerTeam, setWinnerTeam] = useState(useWinnerData);
  const [userPrize, setUserPrize] = useState(useUserPrize);
  const [daysLeft, setDaysLeft] = useState(useDaysLeft);

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
      <button onClick={openSponsorDepositModal} className="w-full px-4 py-2 bg-gray-500 border-gray-500 border rounded-2xl text-lg text-center">
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
  // const tvl = useTVL();
  // const totalYield = useTotalYield(mumbaiUSDCPool);
  // const indYield = useIndividualYield(account.address, 1, mumbaiUSDCPool);
  // const yieldByOutcome = useYieldByOutcome(1, mumbaiUSDCPool);

  // useEffect(() => {
  //   const resolveApi = async() => {
  //     setApi(await getApiAddress(mumbaiUSDCPool));
  //   }
  //   resolveApi();
  // })

  // console.log('api', api);
  // console.log('indYield', indYield);
  // console.log('tvl',tvl);
  // console.log('totalYield', totalYield);
  // console.log('yieldByOutcome', yieldByOutcome);
  // console.log('pkey', pkey2);
  // console.log('account', account.address);

  /* Variables */
  const totalSponsorAmount = getTotalSponsorAmount();
  const userSponsorAmount = getUserSponsorData();

  return (
    <section className="w-full main-section bg-background2 relative">
      <header className="fixed top-0 left-0 right-0 z-50 flex flex-row items-center h-16 bg-background2">
        <div className="container mx-auto px-8 flex flex-row place-content-between items-center">
          <Link href="#">
            <div className="flex items-center place-content-center space-x-2">
              <Logo />
              {/* <span className="text-2xl font-semibold text-text1">Logo</span> */}
              <LogoName />
            </div>
          </Link>
          <ConnectButton />
        </div>
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
      <main className="h-full container mx-auto px-8 bg-background2">
        <div className="h-fit pb-6 flex flex-col gap-8 bg-background2">
          <div className="mt-6">
            <h1 className="text-text1 text-4xl font-medium">
              UEFA Champions League 2023
            </h1>
          </div>
          {
            daysLeft === 0 &&
            <div className="w-full flex justify-center">
              <div className="py-6 px-9 rounded-3xl bg-background1 h-full w-0.7full flex flex-col gap-5 items-center place-content-between text-text2 text-center text-2xl">
                <h2 className="mb-4 text-3xl">
                  This tournament has ended!
                </h2>
                <h3>
                  The winner is <span className="text-text1 font-semibold">{winnerTeam}</span>.<br />
                </h3>
                {userPrize > 0 
                  ? <>
                      <h3>
                        Your prize is <span className="text-text1 font-semibold">{userPrize} USDC.</span>
                      </h3>
                      <Button label={'WITHDRAW YOUR PRIZE'} isPrize={userPrize > 0}/>
                    </>
                  : <>
                      <h3>
                        Your have no prize to collect.
                      </h3>
                    </>
                }
                
              </div>
            </div>
          }
          <div className="grid grid-cols-3 gap-8 h-fit">
             <div className="py-6 px-9 rounded-3xl bg-background1">
                <div className="flex flex-col items-center place-content-between h-full text-text2">
                  <h2 className="text-xl">
                    This tournament ends in
                  </h2>
                  <span className="text-4xl">
                    {daysLeft} <span className="">days</span>
                  </span>
                </div>
              </div>
            <div className="py-6 px-9 rounded-3xl bg-background1 text-text2 ">
              <div className="flex flex-col items-left place-content-between h-full">
                <div className="text-xl">
                  Total sponsor amount
                </div>
                <div className="text-4xl">
                  {totalSponsorAmount} <span className="text-2xl">USDC</span>
                </div>
              </div>
            </div>
            <div className="py-6 px-9 rounded-3xl bg-background1 text-text2 ">
              <div className="flex flex-col items-left gap-6">
                <div className="text-xl">
                  {userSponsorAmount > 0 
                    ? 'Your sponsor amount'
                    : 'Sponsor this tournament'}
                </div>
                <div className="">
                  {userSponsorAmount > 0 
                    ? <div className="flex gap-3 items-end text-4xl">
                        {userSponsorAmount} 
                        <span className="text-2xl"> USDC</span>
                        <div className="pl-2 place-self-center">
                          <EditIcon handleOnClick={handleSponsorDepositEdit} size={32}/>
                        </div>
                      </div>
                    : <Button label={'DEPOSIT'} handleOnClick={openSponsorDepositModal} isActive={daysLeft > 0} />} 
                </div>
              </div>
            </div>
          </div>
          <TeamsTable data={teamTableData} columns={columns} setTargetTeamName={setTargetTeamName} openTeamDepositModal={openTeamDepositModal} isTournamentEnd={daysLeft === 0}/>
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
