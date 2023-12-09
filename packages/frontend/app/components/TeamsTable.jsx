'use client'

import React, { useEffect, useState } from "react";
import EditIcon from "./EditIcon";

const SearchIcon = () => {
  return (
    <div className="flex flex-col place-self-center absolute left-12 bottom-8">
      <svg width="20" height="20" viewBox="0 0 0.6 0.6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.374 0.373 0.525 0.525M0.425 0.25a0.175 0.175 0 1 1 -0.35 0 0.175 0.175 0 0 1 0.35 0Z" stroke="#585858" strokeWidth="0.05" strokeLinecap="round" strokeLinejoin="round"/></svg>
    </div>
  )
}

const TeamsTable = ({ data, columns, setTargetTeamName, setTargetTeamIndex , openTeamDepositModal, isTournamentEnd }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = data.filter(row =>
      columns.some(col => 
        String(row[col.accessor]).toLowerCase().includes(lowercasedQuery)
      )
    );
    setFilteredData(filtered);
  }, [searchQuery, data, columns]);

  const handleTeamDepositEdit = (teamName, rowIndex) => {
    setTargetTeamName(teamName);
    setTargetTeamIndex(data[rowIndex].originalIndex);
    openTeamDepositModal();
  }

  
  return (
    <div className={`flex flex-col rounded-t-3xl table-container ${isTournamentEnd ? '' : 'table-container overflow-hidden '}`}>
      {/* Search Field */}
      <div className="px-10 py-5 bg-background3 relative rounded-t-3xl">
        <SearchIcon />
        <input
          type="text"
          className="focus:outline-none border py-2 px-10 rounded-2xl w-0.5full bg-background2 border-background1 text-text2 placeholder-text3 focus-within:border focus-within:border-text2 hover:border-text2"
          placeholder="Search for a team name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      {/* Fixed Header */}
      <div className="grid grid-cols-5">
        {columns.map((col, index) => (
          <div key={index} className="py-5 px-10 pr-8 text-left text-text2 font-semibold bg-background1">
            {col.header}
          </div>
        ))}
      </div>

      {/* Scrollable Body */}
      <div className="flex-grow overflow-y-auto rounded-b-3xl custom-scrollbar bg-background3">
        <div className="grid grid-cols-5 text-text2 bg-background3">
          {filteredData.map((row, rowIndex) => (
            <React.Fragment key={rowIndex}>
              {columns.map((col, colIndex) => (
                col.accessor === 'col4'
                  ? <div key={colIndex} className={`py-5 px-10 flex-grow border-b border-text3 flex flex-row gap-3 place-content-center`}>
                      {row[col.accessor]}
                      {isTournamentEnd 
                        ? <></>
                        : <EditIcon handleOnClick={() => handleTeamDepositEdit(row['col1'], rowIndex)} />
                      }
                      
                    </div>
                  : <div key={colIndex} className={`py-5 px-10 border-b border-text3 ${col.accessor === 'col1' ? 'text-left' : 'text-center'}`}>
                      {row[col.accessor]}
                    </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamsTable;
