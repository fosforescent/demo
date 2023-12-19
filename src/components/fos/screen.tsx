import React, { ReactElement, useState } from 'react'
import { ReactViewOptions } from '../../lib/client'
import { IFosInterpreter, INode } from '@/fos'
import Row from './row'
import { PlusCircledIcon } from '@radix-ui/react-icons'

// import { TreeIcon } from '@radix-ui/react-icons'

import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { th } from 'date-fns/locale';
import { Button } from '../ui/button';


export function ScreenView({
  interpreter,
  options,
  dragging,
}: {
  interpreter: IFosInterpreter
  options: ReactViewOptions
  dragging: string | null
}) {
  const [showTree, setShowTree] = React.useState(false)

  // if (distribution.remainingUrlPath.length > 1) {
  //   const urlChild = childInfo.filter(
  //     ([childDistribution, childInterpreter]) =>
  //       childInterpreter.getStubString() === distribution.remainingUrlPath[1],
  //   )
  //   if (urlChild.length !== 1) {
  //     throw new Error(`Could not find path ${distribution.remainingUrlPath[0]}`)
  //   }

  //   return new ReactClient(urlChild[0][1]).getView({ ...urlChild[0][0] })
  // }
  const newOptions = {
    ...options, 
    setStack: (newStack: IFosInterpreter[]) => {
      // options.setStack(newStack.slice(1, newStack.length))
    }
  }

  const items = interpreter.getChildren().map((x) => x.getStubString());

  return (
    <div>
      {/* <div style={{padding: '15px'}}>
        <button onClick={() => setShowTree(!showTree)}>{showTree ? '-' : '+'}</button>
        {showTree ? 'Hide' : 'Show'} Tree
        {showTree && <pre style={{fontSize: '8px'}}>{interpreter.formatTree({ current: interpreter })}</pre>}
      </div> */}
      <AddOption interpreter={interpreter} options={options} />
      <SortableContext 
        items={items}
        strategy={verticalListSortingStrategy}
        >
        {interpreter.getTasks().map((task, index) => {

          const rowOptions = newOptions
        
          return (
            <Row key={index} interpreter={task} options={options} dragging={dragging} />
          )
        })}
      </SortableContext>
      <AddRow interpreter={interpreter} options={options} />
      
      {/* {node.data.duration && <GanttComponent root={node} />} */}
      {/* <DataComponent node={node} path={path} forceUpdate={forceUpdate} /> */}
      {/* {node.data.cost && <CostComponent root={node} forceUpdate={forceUpdate} />} */}
    </div>
  )
}

const AddRow = ({
  interpreter,
  options,
}: {
  interpreter: IFosInterpreter
  options: ReactViewOptions
}) => {

  const availableInstructions = interpreter.getAvailableInstructions()

  if (availableInstructions.length === 0) {
    throw new Error('no available instructions')
  }

  const handleAddRow = () => {
    const newStack = interpreter.getBlank(availableInstructions[0] as INode)
    // options.setStack(newStack.slice(1, newStack.length))
  }

  return availableInstructions.length > 0 ? (
    <Button 
      onClick={handleAddRow} variant='ghost'
      style={{padding: '15px 15px 15px 15px'}}
      >
      <PlusCircledIcon />
    </Button>
  ) : (
    <></>
  )
}



const AddOption = ({
  interpreter,
  options,
}: {
  interpreter: IFosInterpreter
  options: ReactViewOptions
}) => {

  const availableInstructions = interpreter.getAvailableInstructions()

  if (availableInstructions.length === 0) {
    throw new Error('no available instructions')
  }

  const handleAddOption = () => {
    const newStack = interpreter.getBlank(availableInstructions[0] as INode)
    // options.setStack(newStack.slice(1, newStack.length))
  }

  return availableInstructions.length > 0 ? (
    <Button 
      onClick={handleAddOption} variant='ghost'
      style={{padding: '15px 15px 15px 15px'}}
      >
      <PlusCircledIcon />
    </Button>
  ) : (
    <></>
  )
}