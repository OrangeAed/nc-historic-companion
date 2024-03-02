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
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
                <h1 className="mb-6 text-6xl font-bold">
                    Tour {tour} Location {location}
                </h1>
                <p className="mb-6 text-2xl">
                    {tourData.description}
                </p>
                <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
                    {previousLocation >= 1 && (
                        <Link href={`/tour/${tour}/${previousLocation}`}>
                            <a className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600">
                                <h3 className="text-2xl font-bold">Previous location</h3>
                            </a>
                        </Link>
                    )}
                    <Link href={`/tour/${tour}/${nextLocation}`}>
                        <a className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600">
                            <h3 className="text-2xl font-bold">Next location</h3>
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const {tour, location} = context.params as { tour: string, location: string }

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