
import React from 'react'
import { Fos, FosOptions } from '@/fos'
// import { MockFos } from './mock'

export type BreadcrumbProps = {
  setPath: (path: [[string, string], ...[string, string][]]) => void, 
  breadcrumbPath: [[string, string], ...[string, string][]] 
}[]

/**
 * type FosComponent = React.JSXElementConstructor<{interpreter: IFosInterpreter}>
 * Should be interchangeable with ReactView below
 */

// export const useFos = (options: Partial<FosOptions> & { mock?: boolean } = {}) => {

//   // const fosInstance = options.mock ? MockFos : Fos
//   const fosInstance = Fos

//   const [optionsState, setOptionsState] = React.useState<Partial<FosOptions>>(options)


//   const [fos, setFos] = React.useState<IFosInstance<any>>(fosInstance(optionsState))

//   const rootAddress = fos.getValue().rootAddress

  

//   React.useEffect(() => {
//     setFos(fosInstance(optionsState))
//   }, [rootAddress])


//   return fos

// }