import React, { useState } from 'react'
import type {Block} from '../lib/Block'
import parseMarkdownBlock from '../lib/parseMarkdownBlock'
export default function InputArea({initText, pushPrev}: {initText: string, pushPrev: (arg0: Block) => void}) {
    console.log(initText)
    const [text, setText] = useState(initText)
    console.log(text)
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
            pushPrev({editing: false, markdownText: newText, content: mdast})
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