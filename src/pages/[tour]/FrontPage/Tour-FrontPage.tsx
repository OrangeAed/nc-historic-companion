// Front page of a tour here

import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'

// export const getStaticProps = (async (context) => {
//     // ...
// }) satisfies GetStaticProps
//
// export const getStaticPaths = (async () => {
//     // ...
// }) satisfies GetStaticPaths
//
// export const getServerSideProps = (async (context) => {
//     // ...
// }) satisfies GetServerSideProps

import Link from 'next/link'

export default function FrontPage() {
    return (
        <div>
            <h1>Welcome to the Tour</h1>
            <Link href="/src/pages/[tour]/1">
                <a>Start the tour</a>
            </Link>
        </div>
    )
}