
import { Store } from "./dag-implementation/store";
import { INode, IStore } from "./types";

/**
 * This is meant to provide an interface that doesn't require explicit declaration of options & parameters. 
 * When serialization is a thing, it should take care of that.  Currently it uses the "addExamples" function
 * 
 * @returns An initialized FosInterpreter with sensible defaults
 */

export type FosOptions =  { json?: string, publicKey?: string }


export const Fos = (options?: FosOptions) => {
  const fos = new Store(options)
  
  return fos
}

export type {
    IStore,
    INode,
}