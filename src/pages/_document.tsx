import { Html, Head, Main, NextScript, DocumentProps } from 'next/document'

export default function Document(props: DocumentProps) {

  return (
    <Html lang={props.locale} dir={props.locale === 'fa' || props.locale === 'ckb' ? 'rtl': 'ltr'}>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
