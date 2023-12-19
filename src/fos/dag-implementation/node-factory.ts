import { NoContextNode } from "./node";
import { IStore, INode } from "..";




export const getTerminalNode = (store: IStore) => {
  // const terminalNode = store.create([])
  const terminalNode = store.create('terminal');
  return terminalNode
}

export const getUnitNode = (store: IStore) => {
  const terminalNode = getTerminalNode(store)
  // const unitNode = store.create([[terminalNode.getAddress(), terminalNode.getAddress()]])
  const unitNode = store.create('unit');
  return unitNode
}

export const getAllOfNode = (store: IStore) => {
  const unitNode = getUnitNode(store)
  // const allOfNode = store.create([[unitNode.getAddress(), unitNode.getAddress()]])
  const allOfNode = store.create('allOf');
  return allOfNode
}

export const getIdNode = (store: IStore) => {
  // const idNode = store.create((node: INode) => node)
  const idNode = store.create('id');
  return idNode
}

export const getNothingNode = (store: IStore) => {
  const terminalNode = getTerminalNode(store)
  // const nothingNode = store.create((node: INode) => terminalNode)
  const nothingNode = store.create('nothing');
  return nothingNode
}

export const getNameNode = (store: IStore) => {
  // const terminalNode = getTerminalNode(store)
  // const unitNode = getUnitNode(store)
  // const nameNode = store.create([[terminalNode.getAddress(), unitNode.getAddress()]])
  const nameNode = store.create('name');
  return nameNode
}

export const getNthDepNodeWithPattern = (store: IStore, n: number, pattern: INode) => {
  if (n < 0) throw new Error('cannot get negative dep')

}


export const getRootInstructionNode = (store: IStore) => {
  // const terminalNode = getTerminalNode(store)
  // const rootInstructionNode = store.create([[terminalNode.getAddress(), terminalNode.getAddress()]])
  const rootInstructionNode = store.create('rootInstruction');
  return rootInstructionNode
}

export const getFolderNode = (store: IStore) => {
  // const terminalNode = getTerminalNode(store)
  // const folderNode = store.create([[terminalNode.getAddress(), terminalNode.getAddress()]])
  const folderNode = store.create('folder');
  return folderNode
}

export const getNthCommentInstructionNode = (store: IStore) => {


}

export const getWorkflowInstructionNode = (store: IStore) => {

}

export const constructAliases = (store: IStore) => Object.entries({
  terminal: getTerminalNode(store).getAddress(),
  id: getIdNode(store).getAddress(),
  nothing: getNothingNode(store).getAddress(),
  unit: getUnitNode(store).getAddress(),
  allOf: getAllOfNode(store).getAddress(),
})
