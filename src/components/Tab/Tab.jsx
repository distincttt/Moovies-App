import { Tabs } from 'antd'

import './Tab.scss'

const Tab = ({ items }) => {
  return (
    <Tabs
      indicatorSize={40}
      centered
      defaultActiveKey="1"
      size="large"
      items={items}
      onChange={(key) => {
        console.log(key)
      }}
    />
  )
}
export default Tab
