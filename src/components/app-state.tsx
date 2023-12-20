import React from "react"




export const useAppState = <T,>(name: string, initialValue: T) => {

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
