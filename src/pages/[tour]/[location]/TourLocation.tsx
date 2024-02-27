import fs from 'fs'
import path from 'path'
import { GetServerSideProps } from 'next'
import Link from 'next/link'

type TourLocationProps = {
    tourData: {
        description: string
    },
    tour: string,
    location: string
}

export default function TourLocationPage({ tourData, tour, location }: TourLocationProps) {
    const previousLocation = Number(location) - 1
    const nextLocation = Number(location) + 1

    return (
        <div>
            <h1>Tour {tour} Location {location}</h1>
            <p>{tourData.description}</p>
            {previousLocation >= 1 && (
                <Link href={`/tour/${tour}/${previousLocation}`}>
                    <a>Previous location</a>
                </Link>
            )}
            <Link href={`/tour/${tour}/${nextLocation}`}>
                <a>Next location</a>
            </Link>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { tour, location } = context.params as { tour: string, location: string }

    try {
        // Fetch the data for this tour and location from a local JSON file
        const filePath = path.join(process.cwd(), 'data', 'tours.json')
        const jsonData = fs.readFileSync(filePath, 'utf8')
        const tours = JSON.parse(jsonData).tours

        // Convert the tour and location parameters to strings that match the keys in the JSON file
        const tourKey = `tour ${tour}`
        const locationKey = `location ${location}`

        // Access the correct tour and location
        const tourData = tours[tourKey]?.locations[locationKey]

        if (!tourData) {
            return {
                notFound: true,
            }
        }

        return {
            props: {
                tourData,
                tour,
                location
            },
        }
    } catch (error) {
        // Log the error and return a 500 status code
        console.error(error)
        return {
            notFound: true,
        }
    }
}