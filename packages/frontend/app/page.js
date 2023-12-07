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
import { useTVL, useTotalYield } from "./hooks/pool";
import { mumbaiUSDCPool } from "@/blockchain/addresses/testnet";

/* Temp Dummy functions */
const useDaysLeft = () => 5
const useTotalSponsorAmount = () => 1440
const useUserSponsorAmount = () => 0.1

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const SponsorButton = () => {
    return (
      <button className="px-4 py-2 bg-gray-500 border-gray-500 border rounded-lg text-lg text-center">
        Deposit amount
      </button>
    )
  }

  const data = [
    { col1: 'Dortmund', col2: '190740', col3: '0', col4: '0', col5: '0' },
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
  const daysLeft = useDaysLeft();
  const totalSponsorAmount = useTotalSponsorAmount();
  const userSponsorAmount = useUserSponsorAmount();
  const tvl = useTVL();
  const totalYield = useTotalYield(mumbaiUSDCPool);

  console.log('tvl',tvl);
  console.log('totalYield', totalYield);


  return (
    <section className="w-full">
      <header className="sticky top-0 z-50 flex items-center h-16 px-6 bg-white">
        <Link href="#">
          <div className="flex items-center space-x-2">
            <IconHome className="h-8 w-8 text-gray-900" />
            <span className="text-2xl font-semibold text-gray-900">Logo</span>
          </div>
        </Link>
        <button onClick={openModal} className="p-2 bg-blue-500 text-white rounded">
        Open Modal
      </button>
      </header>
      <Modal isOpen={isModalOpen} onClose={closeModal} />
      <main className="container mx-auto px-8 py-4">
        <div className="grid grid-cols-10 grid-rows-8 gap-6">
          <div className="text-center col-span-10 bg-red-500 text-3xl">
            Let the games begin!
          </div>
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
              <div className="bg-red-500 text-4xl">
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
                <div className="bg-red-500 text-4xl">
                  {totalSponsorAmount} <span className="text-2xl">USDC</span>
                </div>
              </div>
              <div className="flex-grow flex flex-col items-left gap-5 py-6 px-12 rounded-lg bg-white ">
                <div className="bg-red-500 text-xl">
                  {userSponsorAmount > 0 
                    ? 'Your sponsor amount'
                    : 'Sponsor this tournament'}
                </div>
                <div className="text-4xl">
                  {userSponsorAmount > 0 
                    ? <div className="flex gap-3 items-end">
                        {userSponsorAmount} 
                        <span className="text-2xl"> USDC</span>
                        <div className="pl-2 place-self-center">
                          <EditIcon withBorder={true} size={32}/>
                        </div>
                      </div>
                    : <SponsorButton />} 
                </div>
                
              </div>
            </div>
          </div>
          <div className="col-span-10 row-span-4 row-start-5">
            <TeamsTable data={data} columns={columns} />
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
