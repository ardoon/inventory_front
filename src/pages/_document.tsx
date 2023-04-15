import { Html, Head, Main, NextScript, DocumentProps } from 'next/document'

export default function Document(props: DocumentProps) {

  const fontClass = `${props.locale === 'fa' ? 'font-irsans' : ''} ${props.locale === 'ckb' ? 'font-rudaw' : ''}`

  const bodyStyles = ``
  
  return (
    <Html lang={props.locale} dir={props.locale === 'fa' || props.locale === 'ckb' ? 'rtl': 'ltr'} className={fontClass}>
      <Head />
      <body className='bg-slate-950'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
