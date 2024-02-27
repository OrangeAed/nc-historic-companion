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
    // If a tour is specified in the URL, render the FrontPage component
    return (
        <div>
            Welcome to the site! Select a tour to get started.
            {Object.keys(tours).map(tour => (
                <Link key={tour} href={`/${tour}`}>
                    <a>{tour}</a>
                </Link>
            ))}
        </div>
    );
}