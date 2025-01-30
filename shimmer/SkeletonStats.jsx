import React from 'react'
import Skeleton from 'react-loading-skeleton'

const SkeletonStats = () => {
  return (
    <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                {
                    Array.from({length: 8}).map((_, index) => {
                        return (
                            <div className="bg-[#007acc] transition-all delay-500  w-full md:w-64 p-6 rounded-md text-[#828282]" key={index} >
                                <Skeleton width={100} className="text-md font-bold"></Skeleton>
                                {/* <div className='flex items-center justify-between pt-2'>
                                    <div className='w-[5px] h-[30px] bg-white rounded-xl'></div>
                                    <p className="text-4xl font-bold before:content-[' '] before:w-[2px] before:bg-white before:h-[20px]"></p>
                                </div> */}
                                <Skeleton direction='rtl' width={20}/>
                            </div>
                        )
                    })
                }
            </div>
    </>
  )
}

export default SkeletonStats
