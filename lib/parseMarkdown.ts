import React from 'react'
import remark from 'remark'
import parse from 'remark-parse'
import gfm from 'remark-gfm'
import remark2rehype from 'remark-rehype'
import rehype2react from 'rehype-react'

const markdownConverter = remark().use(parse).use(gfm).use(remark2rehype)
const markdown2react = remark().use(parse).use(gfm).use(remark2rehype).use(rehype2react, {createElement: React.createElement})

const parseMarkdown = async (markdownText: string) => {
    const mdast = markdownConverter.parse(markdownText)
    return mdast
}

const convert2react = (markdownText: string) => {
    // TODO: sanitize
    return markdown2react.processSync(markdownText).result
}

export {parseMarkdown, convert2react}
