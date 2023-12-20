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


  

  const ScreenHeadComponent = getScreenHead(leftNode, nodes)

  const screenHeadProps = getScreenHeadProps(rightNode, nodes)

 

  const rows = nodes[rightNode]?.content
  const value = nodes[rightNode]?.value

  if (!rows) {
    throw new Error(`now rows for ${rightNode}... shouldn't have gotten here`)
  }

  const items = rows.map((edge: any) => ({
    id: edge.join('-'),
    left: edge[0],
    right: edge[1]
  }))

 


  return (<div>
     <div style={{padding: '15px 0px'}}>
       <ScreenHeadComponent {...screenHeadProps} />
          {/* <AddOption /> */}
      </div>
      <SortableContext 
      items={items}
      strategy={verticalListSortingStrategy}
      >
      {items.length > 0 ? 
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
        : <AddRow  />      
      }
    </SortableContext>
    <div style={{padding: '15px 0px'}}>
      <AddRow />
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



const RootScreenRow = ({
  left,
  right,
  dragging, 
  nodes,
  updateNodes,
  appendToPath,
} : {
  left: string,
  right: string,
  dragging: string | null,
  nodes: {[key: string]: { value?: any, content: [string, string][]}}
  updateNodes: (nodes: any) => void
  appendToPath: (left: string, right: string) => void
}) => {


  /**
   * TODO: 
   * - Separate out rows into new component
   * - Left node should have been parsed... parse right node appropriately
   * 
   */

  const updateRow = React.useCallback((newLeft: {value?: any, content: [string, string][]}, newRight:  {value?: any, content: [string, string][]}) => {

    console.log('updateRow', newLeft, nodes[left], newRight, nodes[right])
    if (JSON.stringify(newLeft) !== JSON.stringify(nodes[left])){
      updateNodes({...nodes, [left]: newLeft})
    }
    if (JSON.stringify(newRight) !== JSON.stringify(nodes[right])){
      updateNodes({...nodes, [right]: newRight})
    }
  }, [updateNodes])

  const zoom = () => {
    console.log('zoom', left, right)
    appendToPath(left, right)  
  }





  return (<div>test</div>)

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
    <Button onClick={() => setShowActions(!showActions)}  variant='ghost'
    >{showActions ? <MinusIcon /> : <PlusIcon />}
    </Button>
    {showActions && (<>
      {/* <div style={{padding: "10px 0"}}>
        <Input placeholder="" value={""} onChange={(e) => changeName(e.target.value)} />
      </div> */}
      <div style={{padding: "10px 0"}}>
        <Button variant={"secondary"} className='bg-emerald-900'><QuestionMarkCircledIcon /></Button>
        <Button variant={"secondary"} className='bg-emerald-900'><PlayIcon /></Button>
      </div>
    </>)
  }</>)
}





const AddRow = ({
}: {
}) => {


  const handleAddRow = () => {

  }

  return (
    <Button 
      onClick={handleAddRow} variant='ghost'
      style={{padding: '15px 15px 15px 15px'}}
      >
      <PlusCircledIcon />
    </Button>
  )
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

