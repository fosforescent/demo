


import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { TrashIcon, PlayIcon, Folder } from "lucide-react"
import { QuestionMarkCircledIcon, ComponentNoneIcon } from "@radix-ui/react-icons"
import { th } from "date-fns/locale"

export const FolderRowMenu = ({ 
  valueNode,
  nodes
}: {
  valueNode: string ,
  nodes: {[key: string]: { value?: any, content: [string, string][]}}
}) => {

  return (<div className='flex w-60 justify-around'>
    <Button variant={"secondary"} className='bg-emerald-900'><QuestionMarkCircledIcon /></Button>
    <Button variant={"secondary"} className='bg-emerald-900'><PlayIcon /></Button>
    <Button variant={"destructive"}><TrashIcon /></Button>
    <Button variant={"destructive"}><ComponentNoneIcon /></Button>
  </div>)
}


export const FolderRow = ({
  valueNodeId,
  nodes
}: {
  valueNodeId: string,
  nodes: {[key: string]: { value?: any, content: [string, string][]}}
}) => {

  const updateValue = (newVal: string) => {
    console.log('thest1')
  }

  const valueNode = nodes[valueNodeId]
  if(!valueNode){
    throw new Error('no value node')
  }

  console.log('valueNode', valueNode)

  const nameNodeId = valueNode.content.find((item) => item[0] === 'name')?.[1]

  if(!nameNodeId) return (<div>error - no name provided</div>)

  const contentNodeId = valueNode.content.find((item) => item[0] === 'content')?.[1] 

  if(!contentNodeId) return (<div>error - no content provided</div>)

  const name = nodes[nameNodeId]?.value

  const numItems = valueNode.content.length

  return (<div className="flex">
    <div style={{padding: '10px 10px 10px 0', position: 'relative', fontSize: '.7rem'}}><Folder style={{position: 'absolute', top: 5, left: -10, width: '25px', height: '25px' }} />{numItems}</div>
    <Input type="text" placeholder="" onChange={(e) => updateValue(e.target.value)} value={name} />
  </div>)
}

export const CoreFolderRow = ({
  leftNode, 
  rightNode,
  updateRow,
  nodes
}: {
  leftNode: {value?: any, content: [string, string][] },
  rightNode: {value?: any, content: [string, string][] },
  updateRow: (leftValue: {value?: any, content: [string, string][]}, rightValue: {value?: any, content: [string, string][]}) => void
  nodes: {[key: string]: { value?: any, content: [string, string][]}}
}) => {

  const updateValue = (newVal: string) => {
    console.log('thest1')
  }

  // console.log('valueNode', rightNode)

  const nameNodeId = rightNode.content.find((item) => item[0] === 'name')?.[1]

  if(!nameNodeId) return (<div>error - no name provided</div>)

  const contentNodeId = rightNode.content.find((item) => item[0] === 'content')?.[1] 

  if(!contentNodeId) return (<div>error - no content provided</div>)

  const name = nodes[nameNodeId]?.value

  const numItems = rightNode.content.length

  return (<div className="flex">
    <div style={{padding: '10px 10px 10px 0', position: 'relative', fontSize: '.7rem'}}><Folder style={{position: 'absolute', top: 5, left: -10, width: '25px', height: '25px' }} />{numItems}</div>
    <div>{name}</div>
  </div>)
}

