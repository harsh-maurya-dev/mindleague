import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonTable = () => {
  const skeletonRows = 10;
  
  return (
    <div className="mt-8 border-[1px] border-gray-200 p-4 bg-white rounded-md h-screen relative float-right overflow-x-scroll">
      {/* Header Section */}
      <div className='flex justify-between items-center py-4'>
        <div>
          <Skeleton width={180} height={28} />
        </div>
        <div className='flex justify-between gap-4'>
          <div className='bg-[#f1f1f1] flex justify-center items-center px-2 rounded-md'>
            <Skeleton width={120} height={32} />
          </div>
          <Skeleton width={96} height={32} />
        </div>
      </div>

      {/* Main table */}
      <div className="bg-white rounded-md">
        <table className="w-full">
          <thead>
            <tr className="text-sm text-left">
              <th className="p-3"><Skeleton width={40} /></th>
              <th className="p-3"><Skeleton width={100} /></th>
              <th className="p-3"><Skeleton width={60} /></th>
              <th className="p-3"><Skeleton width={80} /></th>
              <th className="p-3"><Skeleton width={150} /></th>
              <th className="p-3"><Skeleton width={120} /></th>
              <th className="p-3"><Skeleton width={90} /></th>
              <th className="p-3"><Skeleton width={100} /></th>
              <th className="p-3"><Skeleton width={80} /></th>
              <th className="p-3"><Skeleton width={70} /></th>
            </tr>
          </thead>
          <tbody>
            {Array(skeletonRows).fill().map((_, rowIndex) => (
              <tr key={rowIndex} className="border-b border-t text-[#828282] text-[14px]">
                <td className="p-3">
                  <Skeleton width={20} />
                </td>
                <td className="p-3">
                  <Skeleton width={120} />
                </td>
                <td className="p-3">
                  <Skeleton width={30} />
                </td>
                <td className="p-3">
                  <Skeleton width={40} />
                </td>
                <td className="p-3">
                  <Skeleton width={160} />
                </td>
                <td className="p-3">
                  <Skeleton width={60} />
                </td>
                <td className="p-3">
                  <Skeleton width={90} />
                </td>
                <td className="p-3">
                  <Skeleton width={120} />
                </td>
                <td className="p-3">
                  <Skeleton width={40} />
                </td>
                <td className="p-3">
                  <div className="flex gap-2">
                    <Skeleton width={24} height={24} borderRadius={8} />
                    <Skeleton width={24} height={24} borderRadius={8} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SkeletonTable;