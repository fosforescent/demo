import React from 'react'
import { Fos } from '@/fos'
import Wrapper from './wrapper'
import { set } from 'date-fns'


type MainOptions = {
  demo: boolean
}

// export const MainView = ({store, root}: {store: IStore, root: INode}) => {


// }



const useAppState = <T,>(name: string, initialValue: T) => {

  const fosStateJson = localStorage.getItem("fosState")
  // console.log('fosStateJson', fosStateJson)
  let val = null
  try {
    const fosState: any = fosStateJson ? JSON.parse(fosStateJson) : {}
    val = fosState[name]
  } catch (e) {
    localStorage.removeItem("fosState")
    throw new Error('error parsing fosState')
  }
 
  
  const [state, setState] = React.useState<T>(val || initialValue)


  const setAppState = React.useCallback((newState: T) => {
    // console.log('setAppState', name, newState)
    localStorage.setItem("fosState", JSON.stringify({...state, [name]: newState}))
    setState(newState)
  }, [state])




  // console.log('useAppState', name, val)

  return [state, setAppState] as const

}

export const MainView = ({ pathCallback }: any ) => {



  const [nodes, setNodes] = useAppState<any>("nodes", {
    root: {
      content: [
        ["{checklist}", "task1"],
      ]
    },
    task1: {
      value: {
        description: "task1",
        status: 0
      },
      content: [
        ["{description}", "{description}"],
        ["{checklist}", "subtask1"]
      ]
    },
    subtask1: {
      value: {
        description: "task1",
        status: 0
      },
      content: [
        ["{description}", "{description}"],
      ]
    },
    subtask2: {
      value: {
        description: "task2.1",
        status: 0
      },
      content: [
        ["{description}", "{description}"],
      ]
    },
    subtask3: {
      value: {
        description: "task2.2",
        status: 0
      },
      content: [
        ["{description}", "{description}"],
      ]
    },
    task2: {
      value: {
        description: "task2",
        status: 0
      },
      content: [
        ["{description}", "{description}"],
        ["{checklist}", "subtask2"],
        ["{checklist}", "subtask3"]
      ]
    },

  })

  const [path, setPath] = useAppState<[[string, string], ...[string, string][]]>("path", [["{id}", "root" as string]])
  // const [activeItem, setActiveItem] = useAppState<null | [string, string]>("activeItem", null)

  
 
  const pathWithoutCurrent = path.slice(0, path.length - 1 )

  
  // console.log('pathwithoutcurrent', pathWithoutCurrent)

  const breadcrumbs: {
    setPath: (path: [[string, string], ...[string, string][]]) => void, 
    breadcrumbPath: [[string, string], ...[string, string][]] 
  }[] = pathWithoutCurrent.map((item, index) => {
    const breadcrumbPath = path.slice(0, index + 1) as [[string, string], ...[string, string][]]

    return {setPath, breadcrumbPath}
  })

  const updateNodes = (newNodes: any) => {
    console.log('updateNodes', newNodes)
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

  return <Wrapper
    nodes={nodes}
    breadcrumbs={breadcrumbs} 
    path={path} 
    setPath={setPath}
    // activeItem={activeItem} 
    // setActiveItem={setActiveItem}
    updateNodes={updateNodes} 
    />
  // return <div>{JSON.stringify(fos.rootsHistory)}</div>
}


export default MainView