import React, { useState } from 'react'
import type {Block} from '../lib/Block'
import parseMarkdownBlock from '../lib/parseMarkdownBlock'
export default function InputArea({pushPrev}: {pushPrev: (arg0: Block) => void}) {
    const [text, setText] = useState('')
    const [blockType, setBlockType] = useState('')
    const updateText = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newText = e.target.value
        setText(newText)

        const mdast = await parseMarkdownBlock(newText).catch(() => {return})

        if (/\n\n$/.test(newText) || (mdast && mdast.type === 'heading' && /\n$/.test(newText))) {
            pushPrev({markdownText: newText, content: mdast})
            setText('')
            setBlockType('')
        } else {
            setBlockType(mdast?.type || '')
        }
    }

    const linesCount = text.split('\n').length

    return  (<>
    <textarea onChange={updateText} value={text} style={{width: '100%'}}/>
    <div>line: {linesCount}</div>
    <div>block type: {blockType}</div>
    </>)
}

const headingNumber = (line: string): 1|2|3|4|5|6|undefined => {
    if (!/^#+ /.test(line)) {
        return undefined
    }
    const headingNum = line.split(' ')[0].length
    if (headingNum > 6) {
        return undefined
    }
    return headingNum as 1|2|3|4|5|6
}