import Document, { Head, Main, NextScript } from 'next/document';


export default class MyDocument extends Document {
  render() {
    return (
      <html lang="en-US">
        <Head>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <meta charSet="utf-8" />
          <meta name="author" content="Fw Test" />
          <meta name="keywords" content="unos kljucnih reci" />
          <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" crossOrigin="anonymous"></script>
          <link rel="stylesheet" crossOrigin="anonymous" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" />
          <link rel="stylesheet" crossOrigin="anonymous" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
          <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" crossOrigin="anonymous"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" crossOrigin="anonymous"></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}