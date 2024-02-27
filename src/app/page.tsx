import { useRouter } from 'next/router'
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
    const router = useRouter()
    const { tour, location } = router.query

    // Ensure tour is a string before fetching tour data
    let tourData;
    if (typeof tour === 'string') {
        tourData = fetchTourData(tour);
    } else {
        // Handle the case where tour is not a string
        return <div>Welcome to the site! Select a tour to get started.</div>
    }

    // If a location is specified in the URL, render the TourLocationPage component
    if (location && typeof location === 'string') {
        return <TourLocationPage tourData={tourData} />
    }

    // If only a tour is specified in the URL, render the FrontPage component
    if (tour) {
        return <FrontPage tourData={tourData} />
    }

    // If neither a tour nor a location is specified in the URL, render a default page
    return <div>Welcome to the site! Select a tour to get started.</div>
}