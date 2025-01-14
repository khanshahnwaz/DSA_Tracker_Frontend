import React from 'react'

const FIlterBox = ({dsaList,handleFilter,filter}) => {
  return (
    <div className={`filter-bar hidden md:flex h-max space-x-2 text-gray-500`}>
          <button
            className={` ${
              filter == "All" ? "bg-gray-600 text-gray-400" : null
            } rounded-md bg-gray-300 px-2 py-0 cursor-pointer hover:opacity-30`}
            onClick={() => handleFilter("All")}
          >
            All
          </button>
          <button
            className={` ${
              filter == "Easy" ? "bg-gray-600 text-gray-400" : null
            } rounded-md bg-gray-300 px-2 py-0 cursor-pointer hover:opacity-30`}
            onClick={() => handleFilter("Easy")}
          >
            Easy
          </button>
          <button
            className={` ${
              filter == "Medium" ? "bg-gray-600 text-gray-400" : null
            } rounded-md bg-gray-300 px-2 py-0 cursor-pointer hover:opacity-30`}
            onClick={() => handleFilter("Medium")}
          >
            Medium
          </button>
          <button
            className={` ${
              filter == "Hard" ? "bg-gray-600 text-gray-400" : null
            } rounded-md bg-gray-300 px-2 py-0 cursor-pointer hover:opacity-30`}
            onClick={() => handleFilter("Hard")}
          >
            Hard
          </button>
          <p>{dsaList?.length}</p>
        </div>
  )
}

export default FIlterBox