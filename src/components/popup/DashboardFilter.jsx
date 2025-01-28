import React, { useState } from 'react';
import { FaFilter } from "react-icons/fa";
import { MdClose } from "react-icons/md";



const DashboardFilter = ({ isOpen, closeModal, openModal }) => {
  const [year, setYear] = useState('2001');
  const [month, setMonth] = useState('Jan');
  const [subscription, setSubscription] = useState('Select');
  const [city, setCity] = useState('Select');
  const [totalGamesPlayed, setTotalGamesPlayed] = useState('Select');
  const [rating, setRating] = useState([]);
  const [sortBy, setSortBy] = useState([]);


  const handleApply = () => {
    // Apply the selected filter options
    console.log({
      year,
      month,
      subscription,
      city,
      totalGamesPlayed,
      rating,
      sortBy,
    });
    closeModal();
  };

  const handleReset = () => {
    setYear('2001');
    setMonth('Jan');
    setSubscription('Select');
    setCity('Select');
    setTotalGamesPlayed('Select');
    setRating([]);
    setSortBy([]);
  };

  return (
    <>
      {/* Open filter Button */}
      <div className='w-10 h-10 flex justify-center items-center bg-[#007acc] text-white rounded-lg cursor-pointer'
        onClick={openModal}>
        <FaFilter />
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-10 overflow-y-auto text-sm">
          <div className="flex items-center justify-center min-h-screen px-4 text-center">
            <div
              className="fixed inset-0 bg-black opacity-30"
              aria-hidden="true"
            />

            <div className="inline-block w-full max-w-2xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
              <div className='flex justify-between items-center border-b-[1px] border-gray-300 py-4 px-6'>
                <h3 className="text-2xl font-medium leading-6 text-gray-900">Filter</h3>
                <MdClose onClick={closeModal} className='text-2xl cursor-pointer' />
              </div>
              <div className="mt-2 space-y-4 p-6">
                <div className='grid grid-cols-4 gap-4'>
                  {/* year */}
                  <div>
                    <label htmlFor="year" className="block font-medium text-gray-700 mb-2">
                      Year
                    </label>
                    <select
                      id="year"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="2001">2001</option>
                    </select>
                  </div>
                  {/* month */}
                  <div>
                    <label htmlFor="month" className="block font-medium text-gray-700 mb-2">
                      Month
                    </label>
                    <select
                      id="month"
                      value={month}
                      onChange={(e) => setMonth(e.target.value)}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="Jan">Jan</option>
                    </select>
                  </div>
                  {/* Subscription */}
                  <div>
                    <label htmlFor="subscription" className="block font-medium text-gray-700 mb-2">
                      Subscription
                    </label>
                    <select
                      id="subscription"
                      value={subscription}
                      onChange={(e) => setSubscription(e.target.value)}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="Select">Select</option>
                    </select>
                  </div>
                  {/* city */}
                  <div>
                    <label htmlFor="city" className="block font-medium text-gray-700 mb-2">
                      City
                    </label>
                    <select
                      id="city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="Select">Select</option>
                    </select>
                  </div>
                </div>
                <div className='flex gap-6'>
                  <div>
                    <label htmlFor="totalGamesPlayed" className="block font-medium text-gray-700 mb-2">
                      Total Games Played
                    </label>
                    <select
                      id="totalGamesPlayed"
                      value={totalGamesPlayed}
                      onChange={(e) => setTotalGamesPlayed(e.target.value)}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="Select">Select</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-medium text-gray-700 mb-2">Rating</label>
                    <div className="flex space-x-2">
                      {['2000', '3000', '4000'].map((rating) => (
                        <div key={rating} className="flex items-center">
                          <input
                            type="checkbox"
                            // checked={rating.checked}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setRating([...rating, rating]);
                              } else {
                                setRating(rating.filter((r) => r !== rating));
                              }
                            }}
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                          />
                          <label htmlFor={rating} className="ml-2 text-gray-700">
                            {rating}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block font-medium text-gray-700 mb-2">Sort By</label>
                    <div className="flex space-x-2">
                      {['Win', 'Loses', 'Draws'].map((sort) => (
                        <div key={sort} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={sortBy.includes(sort)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSortBy([...sortBy, sort]);
                              } else {
                                setSortBy(sortBy.filter((s) => s !== sort));
                              }
                            }}
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                          />
                          <label htmlFor={sort} className="ml-2 text-gray-700">
                            {sort}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Buttons */}
                <div className="mt-4 flex justify-center items-center">
                  <button
                    type="button"
                    className="inline-flex justify-center px-8 py-2 text-sm font-medium text-white bg-[#dc3444] border border-transparent rounded-md "
                    onClick={handleReset}
                  >
                    Reset
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center ml-4 px-8 py-2 text-sm font-medium text-white bg-[#007ACC] border border-transparent rounded-md "
                    onClick={handleApply}
                  >
                    Apply
                  </button>
                </div>
              </div>


            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardFilter;