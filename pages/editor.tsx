import { useState, useEffect } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import InputArea from '../components/InputArea'
import {convert2react} from '../lib/parseMarkdown'
import BlockItem from '../components/BlockItem'
import EditableBlockItem from '../components/EditableBlockItem'
import type { Block } from '../lib/Block'

export default function Home() {
  const [blocks, setBlocks] = useState<Block[]>([{editing: true, markdownText: ''}])

  console.log(blocks)

  const incrementBlockIndex = () => {
    setBlocks(blocks => {
      const beforeIndex = blocks.findIndex(b => b.editing)
      if (beforeIndex === -1) {
        return [...blocks, {editing: true, markdownText: ''}]
      }
      const newIndex = beforeIndex + 1
      if (newIndex >= blocks.length) {
        return [...blocks, {editing: true, markdownText: ''}]
      }
      blocks[beforeIndex].editing = false
      blocks[newIndex].editing = true
      return blocks 
    })
  }
  const decrementBlockIndex = () => {
    setBlocks(blocks => {
      const beforeIndex = blocks.findIndex(b => b.editing)
      if (beforeIndex === -1) {
        return blocks;
      }
      const newIndex = beforeIndex - 1
      if (newIndex < 0) {
        blocks[0].editing = true
        return blocks
      }
      blocks[beforeIndex].editing = false
      blocks[newIndex].editing = true
      return blocks
    })
  }

  useEffect(() => {
    window.addEventListener('keydown', (e) => {
      console.log(`key: ${e.key}, code: ${e.code}`)
      if (e.key == "ArrowUp") {
        decrementBlockIndex()
      } else if (e.key == "ArrowDown") {
        incrementBlockIndex()
      }
    })
  }, [])




  return (
    <div className={styles.container}>
      <Head>
        <title>mdegh</title>
        <meta name="mdegh" content="Markdown Editor for GitHub" />
      </Head>

      <main className={styles.main}>
        <div style={{textAlign: 'left', width: '100%', maxWidth: '800px'}}>
        {/*
        { blockList.blocks.slice(0, blockList.editorIndex).map((b, idx) => (<BlockItem item={b} key={idx}/>))}
        <InputArea initText={blockList.blocks.length === 0 || blockList.editorIndex === blockList.blocks.length ? "" : blockList.blocks[blockList.editorIndex].markdownText} pushPrev={pushPrev} />
        {blockList.blocks.slice(blockList.editorIndex+1, blockList.blocks.length).map((b, idx) => (<BlockItem item={b} key={idx}/>))}
 */}
        { blocks.map((b, idx) => (
          <EditableBlockItem
            item={b}
            key={idx}
            updateBlock={(block: Block) => {
              setBlocks(blocks => {
                const index = blocks.findIndex(b => b.editing)
                return [...blocks.slice(0, index), block, ...blocks.slice(index+1)]
              })
            }}
            moveEditingArea={(idxDiff: -1 | 1) => {
              if (idxDiff === -1) {
                decrementBlockIndex()
              } else {
                incrementBlockIndex()
              }
            }}
          />
       ))}
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
