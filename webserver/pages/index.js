import Head from 'next/head'
import Link from 'next/link'
import testStyle from '../styles/test-style.module.css'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Lewis Wale</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <body>
        <h1>
          Lewis Wale
        </h1>

        <p>
          This is very clearly a work in progress, calm down.
        </p>

        <div>
          <Link href="test-page">
          <a>
            <h3>What could be this way?</h3>
          </a>
          </Link>
        </div>
      </body>
    </div>
  )
}
