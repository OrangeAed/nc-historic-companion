// Front page of a tour here

import { useRouter } from 'next/router'
import Link from 'next/link'
import { Tour } from '../app/page';


type FrontPageProps = {
    tourData: Tour;
};

const FrontPage: React.FC<FrontPageProps> = ({ tourData }) => {
    const router = useRouter()
    const { tour } = router.query

    return (
        <div>
            <h1>Welcome to the Tour</h1>
            <Link href={`/${tour}/1`}>
                <a>Start the tour</a>
            </Link>
        </div>
    )};

export default FrontPage;
