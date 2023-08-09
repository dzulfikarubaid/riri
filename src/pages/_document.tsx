import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <title>AELI</title>
      <link rel="shortcut icon" href="logo-aeli.png" type="image/x-icon" />
      <link href="https://fonts.googleapis.com/css?family=Poppins" rel="stylesheet"></link>
      <body className='font-sans'>
        <Main/>
        <NextScript />
      </body>
    </Html>
  )
}
