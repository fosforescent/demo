import React, { useState, useEffect, useMemo } from 'react'
import { Fos } from 'fos-react'

const Main = ({path, storeData}: { path: string[], storeData: string}) => {


  return (<div>
      <Fos path={path} storeData={storeData} /> 
    </div>
  )
}

export default Main