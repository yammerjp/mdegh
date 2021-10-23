import React, { useState, useRef, useEffect } from 'react'
import type {Block} from '../lib/Block'
import parseMarkdownBlock from '../lib/parseMarkdownBlock'
import {convert2react} from '../lib/parseMarkdown'

type Props = {
  item: Block;
  updateBlock: (arg0: Block) => void;
  moveEditingArea: (arg0: -1 | 1) => void;
};
export default function EditableBlockItem({item, updateBlock, moveEditingArea}: Props) {
    const [text, setText] = useState('')
    const [blockType, setBlockType] = useState('')
    const updateText = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
       const newText = e.target.value
        setText(newText)

        const mdast = await parseMarkdownBlock(newText).catch(() => {return})
        if (mdast === undefined) {
            if (/\n\n$/.test(newText)) {
                // move next block
                setText('')
                setBlockType('')
            }
            return
        }
        if (/\n\n$/.test(newText) || (mdast && mdast.type === 'heading' && /\n$/.test(newText))) {
            console.log(`updateBlock({editing: false, markdownText: ${newText}, content: ${mdast}})`)
            updateBlock({editing: false, markdownText: newText, content: mdast, component: convert2react(newText)})
            moveEditingArea(1)
            // setText('')
            // setBlockType('')
        } else {
            setBlockType(mdast?.type || '')
        }
    }

    const textareaElement = useRef<HTMLTextAreaElement>(null)
    useEffect(() => {
        if (textareaElement.current !== null)
        textareaElement.current.focus()
    },[])
 
    if (!item.editing) {
        // return <>{item.component}</>
        return <>{convert2react(item.markdownText)}</>
    }
    return  (<> 
    <textarea onChange={updateText} value={text} style={{width: '100%'}} ref={textareaElement}/>
    <div>block type: {blockType}</div>
    </>)
}
