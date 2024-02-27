import fs from 'fs'
import path from 'path'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import Link from 'next/link'

type TourLocationProps = {
    tourData: {
        description: string
    }
}

export default function TourLocationPage({ tourData }: TourLocationProps) {
    const router = useRouter()
    const { tour, location } = router.query as { tour: string, location: string }
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

        // Access the correct tour and location
        const tourData = tours[tour]?.locations[location]

        if (!tourData) {
            return {
                notFound: true,
            }
        }

        return {
            props: {
                tourData,
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