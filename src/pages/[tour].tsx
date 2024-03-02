import Link from 'next/link'
import { Tour } from '@/app/page';
import React from "react";

type FrontPageProps = {
    tourData: Tour;
    tour: string;
};

const FrontPage: React.FC<FrontPageProps> = ({ tourData, tour }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
                <h1 className="mb-6 text-6xl font-bold">
                    Welcome to the Tour
                </h1>
                <Link href={`/${tour}/location 1`}>
                    <a className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600">
                        <h3 className="text-2xl font-bold">Start the tour</h3>
                    </a>
                </Link>
            </div>
        </div>
    )
};

export default FrontPage;
