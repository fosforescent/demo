import React, { ReactElement } from 'react'
import { IStore } from '@/fos'

import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

export const NameView = ({
    value,
    updateValue
  }: {
    value: string
    updateValue: (value: string) => void
}) => {


  return (<Input type="text" placeholder="" onChange={(e) => updateValue(e.target.value)} value={value} />)
}

