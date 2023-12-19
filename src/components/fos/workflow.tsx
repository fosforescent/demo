import React, { ChangeEvent, ReactElement, useEffect, useState } from 'react'
// import { useRouter } from 'next/router'
// import { INode } from '../../../lib/fos/dag-implementation/types'
// import GanttComponent from './gantt'
// import { CostAllocation } from '../../../lib/fos/dag-implementation/node-data'
// import { IFosClient } from '../../../lib/fos/client/types'

// import { ReactViewOptions } from './client'
// import { IFosInterpreter } from '../../../lib/fos/interpreter/types'

// function OneOfComponent({ node, path, forceUpdate }: NodeArgs) {
//   const [selected, setSelected] = useState(0)

//   return (
//     <div>
//       OneOf: {node.getName()}
//       {node.requires.map((child, index) => (
//         <OptionRowComponent
//           key={index}
//           node={child}
//           path={path.concat([child])}
//           forceUpdate={forceUpdate}
//           selected={selected === index}
//         />
//       ))}
//       <AddNodeComponent node={node} forceUpdate={forceUpdate} />
//     </div>
//   )
// }

// const OptionRowComponent = ({
//   node,
//   path,
//   forceUpdate,
//   selected,
// }: NodeArgs & { selected: boolean }) => {
//   return (
//     <div>
//       <ZoomComponent path={path} forceUpdate={forceUpdate} />
//       <input
//         type='radio'
//         id={node.getName()}
//         name={path[path.length - 1].getName()}
//         value={node.getName()}
//         checked={selected}
//       />
//       <label htmlFor={node.getName()}>{node.getName()}</label>
//     </div>
//   )
// }

// const RequirementRowComponent = ({ node, path, forceUpdate }: NodeArgs) => {
//   return (
//     <div>
//       <ZoomComponent path={path} forceUpdate={forceUpdate} />
//       {node.isLeaf() && (
//         <input
//           type='checkbox'
//           id={node.getName()}
//           name={path[path.length - 1].getName()}
//           value={node.getName()}
//         />
//       )}
//       <label htmlFor={node.getName()}>
//         <input type='text' value={node.getName()} />
//       </label>
//     </div>
//   )
// }

// function TaskComponent({ node, path, forceUpdate }: NodeArgs) {
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   const [status, setStatus] = useState(node.status)

//   return (
//     <div>
//       Task: {node.getName()}
//       <div style={{ display: 'flex', flexFlow: 'row' }}>
//         {
//           <input
//             type='checkbox'
//             checked={node.isDone()}
//             disabled={!node.isLeaf()}
//             onChange={(event) => {
//               console.log(`input:onChange: ${event.target.checked}`)
//               event.target.checked ? node.complete() : node.uncomplete()
//               setStatus(node.status)
//               forceUpdate()
//             }}
//           />
//         }
//         <div style={{ backgroundColor: '#33333333' }}>
//           {node.requires.map((child, index) => (
//             <div key={index}>
//               <RequirementRowComponent
//                 key={index}
//                 node={child}
//                 path={path.concat([child])}
//                 forceUpdate={forceUpdate}
//               />
//             </div>
//           ))}
//           <AddNodeComponent node={node} forceUpdate={forceUpdate} />
//         </div>
//       </div>
//     </div>
//   )
// }

// function AddNodeComponent({ node, forceUpdate }: { node: INode; forceUpdate: () => void }) {
//   const [newTaskName, setNewTaskName] = React.useState('')
//   const addTask = () => {
//     node.addNewTaskWithDescription(newTaskName)
//     forceUpdate()
//   }
//   const addOption = () => {
//     node.addNewOneOfWithDescription(newTaskName)
//     forceUpdate()
//   }
//   return (
//     <div>
//       <button onClick={() => addTask()}>+Task</button>
//       <button onClick={() => addOption()}>+</button>
//       <input type='text' value={newTaskName} onChange={(e) => setNewTaskName(e.target.value)} />
//     </div>
//   )
// }

// function CostComponent({ root, forceUpdate }: { root: INode; forceUpdate: () => void }) {
//   const [totalMin, totalMax] = root.getCostRange()

//   return (
//     <div>
//       Cost: ${totalMin} - ${totalMax} <br />
//     </div>
//   )
// }

// function DataComponent({ node, path, forceUpdate }: NodeArgs) {
//   const handleCostChange = (e: any) => {
//     node.setMarginalCost(parseInt(e.target.value))
//     forceUpdate()
//   }

//   return (
//     <>
//       <div>
//         Marginal Cost:
//         <input type='number' value={node.getMarginalCost()} onChange={handleCostChange} />
//       </div>
//       <div>
//         {node.getAllocation() && (
//           <AllocationComponent allocation={node.getAllocation()} forceUpdate={forceUpdate} />
//         )}
//       </div>
//     </>
//   )
// }

// function AllocationComponent({
//   allocation,
//   forceUpdate,
// }: {
//   allocation: CostAllocation
//   forceUpdate?: () => void
// }) {
//   const handleChildAllocationChange = (e: any) => {
//     allocation.setAllocation(parseInt(e.target.value))
//     forceUpdate()
//   }

//   const handleNewAllocation = (e: any) => {
//     allocation.createChild()
//     forceUpdate()
//   }

//   const handleRemoveAllocation = (item: CostAllocation) => {
//     allocation.removeChild(item)
//     forceUpdate()
//   }

//   return (
//     <div>
//       Allocation: {allocation.getBalance()}
//       <button onClick={handleNewAllocation}>+</button>
//       <br />
//       {allocation.children.length > 0 ? (
//         allocation.children.map((item, ix) => (
//           <>
//             <AllocationComponent allocation={item} key={ix} forceUpdate={forceUpdate} />
//             <button onClick={() => handleRemoveAllocation(item)}>x</button>
//           </>
//         ))
//       ) : (
//         <div>
//           <input
//             type='number'
//             value={allocation.getBalance()}
//             onChange={handleChildAllocationChange}
//           />
//         </div>
//       )}
//     </div>
//   )
// }
