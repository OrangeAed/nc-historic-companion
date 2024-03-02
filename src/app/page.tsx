import Link from 'next/link'
import dynamic from 'next/dynamic'
import toursData from '../data/tours.json';

export type Tour = {
    title: string;
    description: string;
    locations: {
        [location: string]: {
            title: string;
            description: string;
            text: string;
            image: string;
            location: string;
        };
    };
};

type Tours = {
    [tour: string]: Tour;
};

const tours: Tours = toursData.tours;

function fetchTourData(tour: string) {
    // Access the tour data in the imported JSON data
    const tourData = tours[tour];
    if (!tourData) {
        throw new Error(`No tour found with id ${tour}`);
    }
    return tourData;
}

const TourLocationPage = dynamic(() => import('../pages/[tour]/[location]/TourLocation'))
const FrontPage = dynamic(() => import('../pages/[tour]'))

export default function Page() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
                <h1 className="mb-6 text-6xl font-bold">
                    Welcome to the site!
                </h1>
                <p className="mb-6 text-2xl">
                    Select a tour to get started.
                </p>
                <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
                    {Object.keys(tours).map(tour => (
                        <Link key={tour} href={`/${tour}`}>
                            <a className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600">
                                <h3 className="text-2xl font-bold">{tour}</h3>
                            </a>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}