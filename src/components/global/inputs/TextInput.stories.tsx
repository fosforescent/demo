import React from 'react'
import TextInput from './TextInput'

export default {
  component: TextInput,
  title: 'Global/Inputs/TextInput',
}

const Template = (args: any) => {
  const [value, setValue] = React.useState(args.value)

  return <TextInput value={value} update={setValue} status={args.status} theme={args.theme} />
}

export const Default = Template.bind({})
Default.args = {
  theme: 'light',
  status: null,
  value: {
    data: 'test1',
    and: null,
    or: null,
  },
}
