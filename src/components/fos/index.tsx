import React, { ReactElement, useEffect, useState } from 'react'


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

import { initialNodes } from './initialNodes'


import { useAppState } from '@/components/app-state'

export const MainView = ({ pathCallback }: any ) => {



  const [nodes, setNodes] = useAppState<any>("nodes", initialNodes)

  const [path, setPath] = useAppState<[[string, string], ...[string, string][]]>("path", [["{id}", "root" as string]])

  
 

  const updateNodes = (newNodes: any) => {
    // console.log('updateNodes', newNodes)
    /**
     * typecheck nodes before saving --- 
     * 
     * - don't save if invalid?
     * - add type error node if invalid?
     *  
     * 
     * - typecheck
     *  - before save
     *  - before display
     *  - on input change 
     *  - before merge into main
     * 
     */
    setNodes(newNodes)
  }

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
  
  // console.log('path', path)
  const [leftNode, rightNode] = path[path.length - 1] as [string, string]


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
    

  const ScreenView = getScreenView(leftNode, nodes)

  return (
    <DndContext 
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
      <div className='w-full'> 
        <div className='flex w-full overflow-x-scroll'>
            {path.map((item, index) => {
              
              const breadcrumbPath = path.slice(0, index + 1) as [[string, string], ...[string, string][]]

              // console.log('item', item, breadcrumbPath, index, path)

              const handleClick = () => {
                console.log('handleClick', breadcrumbPath, item, index, path)
                setPath(breadcrumbPath)
              }


              const display = (breadcrumbPath.length === 1) ? <HomeIcon /> : JSON.stringify(breadcrumbPath[breadcrumbPath.length - 1]?.[1]?.slice(0,10) as string)

              return (
                <Button key={index + 1} onClick={handleClick} variant="secondary" disabled={index === path.length - 1}>{display}</Button>
              )
            })}
        </div>
        <div className="w-full">
        { <ScreenView nodes={nodes} leftNode={leftNode} rightNode={rightNode} dragging={activeId} updateNodes={updateNodes} path={path} updatePath={setPath} />}
        </div>

      </div>
    </DndContext>
  )
}


export default MainView






const getScreenView = (leftNode: string, nodes: {[key: string]: { content: [string, string][]}}) => {

  /**
   * typecheck --- if type error, use TypeErrorScreenView
   */

  return RootScreenView
}

