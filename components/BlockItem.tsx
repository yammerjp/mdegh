import type {Block} from '../lib/Block'
export default function BlockItem({item}: {item : Block}) {
    //return <div dangerouslySetInnerHTML={{__html: item.htmlText || ''}}/>
    //return <div>{item.htmlText || ''}</div>
    return <>{item.component}</>
}