import Card from './Card'
import Container from '../desktop/column/Column'

export default {
  component: Card,
  title: 'Global/Containers/Card',
}

const Template = (args: any) => {
  return (
    <Container theme={args.theme}>
      <Card {...args}>
        <div>Test 1!</div>
      </Card>
    </Container>
  )
}

export const Default = Template.bind({})
Default.args = {
  theme: 'dark',
  status: null,
  message: null,
  children: <div>TEST1</div>,
}
