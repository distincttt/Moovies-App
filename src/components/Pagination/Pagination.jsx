import { Pagination } from 'antd'

import './Pagination.scss'

const Pages = ({ onPageChange }) => {
  return (
    <Pagination
      className="pagination"
      defaultCurrent={1}
      total={10000}
      pageSize={20}
      showSizeChanger={false}
      onChange={onPageChange}
    />
  )
}

export default Pages
