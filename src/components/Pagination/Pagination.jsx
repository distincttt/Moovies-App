import { Pagination } from 'antd'

import './Pagination.scss'

const Pages = ({ onPageChange, total, page }) => {
  return (
    <Pagination
      className="pagination"
      current={page}
      defaultCurrent={1}
      total={total}
      pageSize={20}
      showSizeChanger={false}
      onChange={onPageChange}
    />
  )
}

export default Pages
