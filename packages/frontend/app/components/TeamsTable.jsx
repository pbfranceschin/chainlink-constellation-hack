'use client'

import React, { useEffect, useState } from "react";
import EditIcon from "./EditIcon";

const SearchIcon = () => {
  return (
    <div className="flex flex-col place-self-center absolute left-12 bottom-8">
      <svg width="20" height="20" viewBox="0 0 0.6 0.6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.374 0.373 0.525 0.525M0.425 0.25a0.175 0.175 0 1 1 -0.35 0 0.175 0.175 0 0 1 0.35 0Z" stroke="#b3b3b3" strokeWidth="0.05" strokeLinecap="round" strokeLinejoin="round"/></svg>
    </div>
  )
}

const TeamsTable = ({ data, columns, setTargetTeamName, openTeamDepositModal }) => {
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

  const handleTeamDepositEdit = (teamName) => {
    setTargetTeamName(teamName)
    openTeamDepositModal()
  }

  
  return (
    <div className="h-0.5screen flex flex-col rounded-t-lg overflow-hidden">
      {/* Search Field */}
      <div className="px-10 py-5 bg-gray-100 relative">
        <SearchIcon />
        <input
          type="text"
          className="border py-2 px-10 rounded-lg w-0.5full"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      {/* Fixed Header */}
      <div className="grid grid-cols-5">
        {columns.map((col, index) => (
          <div key={index} className={`py-5 px-10 text-left bg-gray-300 `}>
            {col.header}
          </div>
        ))}
      </div>

      {/* Scrollable Body */}
      <div className="flex-grow overflow-y-auto bg-white rounded-b-lg custom-scrollbar">
        <div className="grid grid-cols-5">
          {filteredData.map((row, rowIndex) => (
            <React.Fragment key={rowIndex}>
              {columns.map((col, colIndex) => (
                col.accessor === 'col4'
                  ? <div key={colIndex} className={`py-5 px-10 border-b flex flex-row gap-3 place-content-center`}>
                      {row[col.accessor]}
                      <EditIcon handleOnClick={() => handleTeamDepositEdit(row['col1'])} />
                    </div>
                  : <div key={colIndex} className={`py-5 px-10 border-b ${col.accessor === 'col1' ? 'text-left' : 'text-center'}`}>
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
