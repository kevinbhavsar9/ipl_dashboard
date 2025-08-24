import React from 'react'
import MatchCard from './MatchCard';

interface MatchContainerProps {
    className?: string;
}

export const MatchContainer: React.FC<MatchContainerProps> = ({ className }) => {
    return (
        <div className={`${className} `}>

            <div className='flex flex-col'>
                <h1 className='mx-4 my-2 font-bold text-grey'>
                    Live/Upcoming Matches
                </h1>
                <div className='flex my-2'>

                    <MatchCard />
                    <MatchCard />
                    <MatchCard />
                    <MatchCard />
                </div>
            </div>
        </div>
    )
}
