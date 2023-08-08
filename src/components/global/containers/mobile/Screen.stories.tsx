import Screen from './Screen'
import Row from '../row/Row'

export default {
  component: Screen,
  title: 'Global/Containers/Mobile/Screen',
}

const Template = (args: any) => {
  return <Screen theme={args.theme}>{args.chilren}</Screen>
}

export const Default = Template.bind({})
Default.args = {
  theme: 'dark',
  status: null,
  children: <div>TEST1</div>,
}
