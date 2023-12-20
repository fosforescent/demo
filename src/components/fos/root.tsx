import React, { ReactElement, useEffect, useState } from 'react'
import Row from './row'
import { Crosshair1Icon, DiscIcon, QuestionMarkCircledIcon, PlayIcon, DragHandleDots2Icon, DotsVerticalIcon, ComponentNoneIcon, TrashIcon, PlusCircledIcon, MinusIcon, PlusIcon  } from '@radix-ui/react-icons'

// import { TreeIcon } from '@radix-ui/react-icons'

import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

import RowView from './row';


export function RootScreenView({
  nodes,
  // updateNodes,
  leftNode,
  rightNode,
  updateNodes,
  dragging,
  path,
  updatePath,
}: {
  nodes: {[key: string]: { value?: any, content: [string, string][]}},
  // updateNodes: (nodes: any) => void,
  leftNode: string,
  rightNode: string ,
  updateNodes: (nodes: any) => void
  dragging: string | null
  path: [[string, string], ...[string, string][]]
  updatePath: (path: [[string, string], ...[string, string][]]) => void
}) {



  const [leftNodeA, rightNodeA] = path[path.length - 1] as [string, string]

  console.log('leftNodeA', leftNodeA, rightNodeA, leftNode, rightNode, path)

  const ScreenHeadComponent = getScreenHead(leftNode, nodes)

  const screenHeadProps = getScreenHeadProps(rightNode, nodes)


  const rows = nodes[rightNode]?.content
  const value = nodes[rightNode]?.value

  if (!rows) {
    console.log('screenprops', leftNode, rightNode, nodes)
    throw new Error(`no rows for ${rightNode}... shouldn't have gotten here`)
  }

  const items = rows.map((edge: [string, string]) => {
    if (edge.length !== 2) {
      throw new Error(`edge should have 2 items: ${JSON.stringify(edge)}`)
    }

    return {
    id: edge.join('-'),
    left: edge[0],
    right: edge[1]
    }
  })


  const newId = (leftNode: string, rightNode: string) => {
    return base64encode(`${leftNode}-${rightNode}-${items.length}`)
  }

  const base64encode = (str: string) => {
    return btoa(str)
  }

  const base64decode = (str: string) => {

  }

  const handleAddRow = () => {
    const newRowId = newId(leftNode, rightNode)

    const rightNodeObj = nodes[rightNode] 
    if(!rightNodeObj) {
      throw new Error(`no right node for ${rightNode}`)
    }

    const newNodes = {
      ...nodes, 
      [newRowId]: {
        content: [["{description}", "{description}"]], 
        value: { description: ""} 
      },
      [rightNode]: {
        ...nodes[rightNode],
        content: [...rightNodeObj.content, ["{checklist}", newRowId]]
      }
    }
    console.log('newNodes', newNodes)

    updateNodes(newNodes)
  }

  return (<div>
     <div style={{padding: '15px 0px'}}>
       <ScreenHeadComponent {...screenHeadProps} />
          {/* <AddOption /> */}
      </div>
      <SortableContext 
      items={items}
      strategy={verticalListSortingStrategy}
      >
      {items.length > 0 && 
        items.map((item, index) => {


          const rowProps = getScreenRowProps(item.right, nodes)

          return (
            // <RowComponent key={index} nodes={nodes} left={leftNode} right={rightNode} dragging={dragging} blank={false} updateRow={updateNodes} />
            <RowView 
              key={index} 
              {...rowProps} 
              updateNodes={updateNodes} 
              dragging={dragging} 
              value={value} 
              nodes={nodes} 
              updatePath={updatePath} 
              leftNode={item.left} 
              rightNode={item.right} 
              path={path}
              />
          )
        })
      }
    </SortableContext>
    <div style={{padding: '15px 0px'}}>
      <Button 
        onClick={handleAddRow} variant='ghost'
        style={{padding: '15px 15px 15px 15px'}}
        >
        <PlusCircledIcon />
      </Button>
    </div>
      {/* {node.data.duration && <GanttComponent root={node} />} */}
      {/* <DataComponent node={node} path={path} forceUpdate={forceUpdate} /> */}
      {/* {node.data.cost && <CostComponent root={node} forceUpdate={forceUpdate} />} */}
  </div>)



}



const getScreenHead = (leftNode: string, nodes: {[key: string]: {value?: any, content: [string, string][] }}) => {

  const matches = leftNode.match(/^[\{]\w[\}]$/)
  if (matches) {
    console.log('matches', matches)
    return (props: any) => <></>



  } else {
    return RootScreenHead
  }


  // const nativeInstructions = leftNode.content.filter((edge: any) => edge[0] === "nativeInstruction")

  
  
  /**
   * If left node has nativeInstruction, then get or create proper screen component
  */



  // if (!nativeInstruction) {
  //   throw new Error(`missing nativeInstruction: ${JSON.stringify(leftNode)}}`)
  // }
  return RootScreenHead

}

const getScreenHeadProps = (rightNode: string, nodes: {[key: string]: {value?: any, content: [string, string][] }}) =>  {

  return {}
}




const getScreenRowProps = (rightNode: string, nodes: {[key: string]: {value?: any, content: [string, string][] }}) =>  {

  return {}
}





const RootScreenHead = (props: any) => {


  /**
   * 
   * Validate value before showing
   * 
   * If value has native value, then apply appropriately to component
   */

  const [showActions, setShowActions] = React.useState(false)

  const changeName = (name: string) => {
    console.log('changeName', name)
  }

  return (<>
    <div style={{padding: "10px 0"}}>
      <Button onClick={() => setShowActions(!showActions)}  variant='ghost'
      >{showActions ? <MinusIcon /> : <PlusIcon />}
      </Button>
    {showActions && (<>
      {/* <div style={{padding: "10px 0"}}>
        <Input placeholder="" value={""} onChange={(e) => changeName(e.target.value)} />
      </div> */}
        <Button variant={"secondary"} className='bg-emerald-900'><QuestionMarkCircledIcon /></Button>
        <Button variant={"secondary"} className='bg-emerald-900'><PlayIcon /></Button>
    </>)}
    </div>
  </>)
}







const AddOption = ({
}: {
}) => {

  const handleAddOption = () => {
    
    // options.setStack(newStack.slice(1, newStack.length))
  }

  return (
    <Button 
      onClick={handleAddOption} variant='ghost'
      style={{padding: '15px 15px 15px 15px'}}
      >
      <PlusCircledIcon />
    </Button>
  )
}

