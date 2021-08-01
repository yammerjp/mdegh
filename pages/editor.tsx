import { useState } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import InputArea from '../components/InputArea'
import {convert2react} from '../lib/parseMarkdown'
import BlockItem from '../components/BlockItem'
import type { Block } from '../lib/Block'

export default function Home() {
  const [blocks, setBlock] = useState<Block[]>([])

  const pushPrev = async (block: Block) => {
    // const htmlText = await convert2html(block.markdownText)
    const component = convert2react(block.markdownText)
    setBlock((bs: Block[]) => [...bs, {...block, component}])
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>mdegh</title>
        <meta name="mdegh" content="Markdown Editor for GitHub" />
      </Head>

      <main className={styles.main}>
        <div style={{textAlign: 'left', width: '100%', maxWidth: '800px'}}>
        {blocks.map((b, idx) => (<BlockItem item={b} key={idx}/>))}
        <InputArea pushPrev={pushPrev} />
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://github.com/yammerjp/mdegh"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by yammerjp
        </a>
      </footer>
    </div>
  )
}
