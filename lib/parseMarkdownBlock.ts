import { Root, Content } from "mdast"
import { Node } from 'unist'
import {parseMarkdown} from "./parseMarkdown"
export default async function parseMarkdownBlock(markdownText: string): Promise<Content> {
    const mdast = await parseMarkdown(markdownText)
    if (!isRoot(mdast)) {
        return Promise.reject(new Error('Failed to parse markdwon. The type of AST\'s top node is not root.'))
    }
    if (mdast.children.length === 0) {
        return Promise.reject(new Error('markdown is Empty'))
    }
    if (mdast.children.length !== 1) {
        return Promise.reject(new Error('Failed to parse markdown. The root has a lot of nodes'))
    }
    return mdast.children[0]
}

function isRoot(node: Node): node is Root {
    return node.type === 'root'
}