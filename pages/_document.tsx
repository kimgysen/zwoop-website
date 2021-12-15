import Document, {DocumentContext, Html, Head, Main, NextScript} from "next/document";
import React, {ReactElement} from "react";

class CustomDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)

    return initialProps
  }

  render(): ReactElement {
    return (
        <Html lang="en">
          <Head>
            <meta name="description" content="Micro services for developers with a question" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <body>
            <Main />
            <NextScript />
          </body>
        </Html>
    )
  }

}

export default CustomDocument;
