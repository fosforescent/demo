import React, { ReactElement, useEffect, useState } from 'react'
import { BreadcrumbProps } from '@/lib/client'

import { HomeIcon } from '@radix-ui/react-icons'
import { Button } from "@/components/ui/button"
import { RootScreenView } from './root'
import {
  closestCenter,
  DndContext, 
  DragEndEvent, 
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  TouchSensor, 
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { th } from 'date-fns/locale'

const Breadcrumbs = ({
  breadcrumbs,
}: {
  breadcrumbs: BreadcrumbProps
}) => {

  return (<>
    {breadcrumbs.map((item, index) => {
      const handleClick = () => {
        console.log('handleClick', item.breadcrumbPath)
        item.setPath(item.breadcrumbPath)
      }
      
      const display = (item.breadcrumbPath.length === 1) ? <HomeIcon /> : JSON.stringify(item.breadcrumbPath[item.breadcrumbPath.length - 1]?.[1] as string)

      return (
        <Button key={index + 1} onClick={handleClick} variant="secondary">{display}</Button>
      )
    })}
  </>)
}

const Wrapper = ({
  path, 
  setPath,
  // activeItem,
  // setActiveItem, 
  nodes,
  updateNodes,
  breadcrumbs,
}: {
  path: [[string, string], ...[string, string][]],
  setPath: (path: [[string, string], ...[string, string][]]) => void
  // activeItem: [string, string] | null
  // setActiveItem: (item: [string, string] | null) => void
  nodes: {[key: string]: { content: [string, string][]}},
  updateNodes: (nodes: any) => void,
  // current: [string, string],
  breadcrumbs: BreadcrumbProps
  // updateRoot: (left: string, right: string) => void
}) => {

  
  const [activeId, setActiveId] = useState<string | null>(null);



  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      }
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }), 
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      }
    })
  );
  
  function handleDragStart(event: DragStartEvent) {
    const {active} = event;
    
    setActiveId(active.id);
  }
  

  const [leftNode, rightNode] = path[0] as [string, string]


  function handleDragEnd(event: DragEndEvent) {
    const {active, over} = event;
    console.log('drag end', active, over)
    
    if (active.id !== over?.id) {
      const reorderItems = (items: (string | null)[]) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over?.id || null);
        
        return arrayMove(items, oldIndex, newIndex);
      };
      if (!nodes[rightNode]) {
        throw new Error('no right node')
      }
      const nodesWithId = nodes[rightNode]!.content.map((edge: [string, string]) => {
        console.log('edge', edge)
        return edge.join('-')
      })
      const newNodesWithId = reorderItems(nodesWithId)

      console.log('newNodesWithId', newNodesWithId)

      const newContent = newNodesWithId.filter((edge: string | null) => edge !== null).map((edge: string | null) => (edge as string).split('-'))

      console.log('newContent', newContent)

      updateNodes({...nodes, [rightNode]: {...nodes[rightNode], content: newContent } })
    }
    
    setActiveId(null);
  }
    

  // const [leftNodeState, setLeftNodeState] = useState(leftNode)
  // const [rightNodeState, setRightNodeState] = useState(rightNode)



  const ScreenView = getScreenView(leftNode, nodes)

  return (
    <DndContext 
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
      <div className='w-full'> 
        <div className='flex w-full'>
          <div className='grow'>
            <Breadcrumbs breadcrumbs={breadcrumbs} />
          </div>
          {/* <div className='flex-none'>
            <Select onValueChange={handleWorkflowSelect} value={selected.toString()}>
              <SelectTrigger className="w-[180px]">
                {selectedChild.getName()}
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Workflows</SelectLabel>
              {interpreter.getTasks().map((task: IFosInterpreter, index: number) => (
                <SelectItem key={index} value="index">{task.getName()}</SelectItem>
              ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div> */}
        </div>
        <div className="w-full">
        { <ScreenView nodes={nodes} leftNode={leftNode} rightNode={rightNode} dragging={activeId} updateNodes={updateNodes} path={path} updatePath={setPath} />}
        </div>
        {/* <div>
          {path.map((client, index) => (
            <BreadcrumbComponent
              key={index}
              name={client.getCurrentName()}
              forceUpdate={forceUpdate}
              url={getURLFromPath(path.slice(0, index + 1))}
              current={index === path.length - 1}
            />
          ))}
        </div>
        <TaskView client={currentClient} forceUpdate={forceUpdate} /> */}
      </div>
    </DndContext>
  )
}


const getScreenView = (leftNode: string, nodes: {[key: string]: { content: [string, string][]}}) => {

  /**
   * typecheck --- if type error, use TypeErrorScreenView
   */

  return RootScreenView
}



export default Wrapper
