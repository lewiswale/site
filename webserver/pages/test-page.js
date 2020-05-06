import Head from 'next/head'
import Link from 'next/link'

export default function Test() {
    return (
        <div>
            <Head>
                <title>Test Page</title>
            </Head>

            <body>
            <div>
                <h1>Test Page</h1>
            </div>
            <div>
                <Link href="/">
                <a>
                    Take me homeeee, country roaaaaad
                </a>
                </Link>
            </div>
            </body>
        </div>
    )
}
