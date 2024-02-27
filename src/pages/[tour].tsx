import Link from 'next/link'
import { Tour } from '../app/page';

type FrontPageProps = {
    tourData: Tour;
    tour: string;
};

const FrontPage: React.FC<FrontPageProps> = ({ tourData, tour }) => {
    return (
        <div>
            <h1>Welcome to the Tour</h1>
            <Link href={`/${tour}/1`}>
                <a>Start the tour</a>
            </Link>
        </div>
    )};

export default FrontPage;
