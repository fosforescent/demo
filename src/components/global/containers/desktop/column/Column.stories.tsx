import Column from './Column'
import Card from '../../card/Card'

export default {
  component: Column,
  title: 'Global/Containers/Desktop/Column',
}

const Template = (args: any) => {
  return (
    <Column theme={args.theme}>
      <Card {...args}>
        <div>Test 1!</div>
      </Card>
      <Card {...args}>
        <div>Test 2!</div>
      </Card>
    </Column>
  )
}

export const Default = Template.bind({})
Default.args = {
  theme: 'dark',
  status: null,
  children: <div>TEST1</div>,
}
