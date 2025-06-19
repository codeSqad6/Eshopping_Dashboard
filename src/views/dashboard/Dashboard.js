
import React from 'react'
import classNames from 'classnames'
import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcVisa,
  cilCart,
  cilDollar,
  cilUser,
  cilChartLine,
  cilStar,
  cilTags,
  cilBasket,
  cilPeople,
  cilCloudDownload,
  // cilShop,
  cilHome
} from '@coreui/icons'

import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import avatar3 from 'src/assets/images/avatars/3.jpg'

import WidgetsBrand from '../widgets/WidgetsBrand'
import WidgetsDropdown from '../widgets/WidgetsDropdown'
import MainChart from './MainChart'

const Dashboard = () => {
  // Key metrics data
  const metricsData = [
    { title: 'Total Revenue', value: '$48,562', percent: 12, color: 'success', icon: cilDollar },
    { title: 'Total Orders', value: '1,254', percent: 8, color: 'info', icon: cilCart },
    { title: 'New Customers', value: '324', percent: 5, color: 'warning', icon: cilUser },
    { title: 'Conversion Rate', value: '3.2%', percent: 0.8, color: 'danger', icon: cilChartLine },
  ]

  // Weekly sales data
  const weeklySales = [
    { title: 'Monday', online: 42, physical: 18 },
    { title: 'Tuesday', online: 56, physical: 24 },
    { title: 'Wednesday', online: 38, physical: 16 },
    { title: 'Thursday', online: 64, physical: 22 },
    { title: 'Friday', online: 72, physical: 38 },
    { title: 'Saturday', online: 85, physical: 45 },
    { title: 'Sunday', online: 58, physical: 32 },
  ]

  // Product categories data
  const categoriesData = [
    { title: 'Electronics', icon: cilTags, percent: 38, value: '12,543' },
    { title: 'Fashion', percent: 25, value: '8,217' },
    { title: 'Home & Kitchen', icon: cilHome, percent: 18, value: '5,932' },
    { title: 'Beauty', icon: cilStar, percent: 12, value: '3,941' },
  ]

  // Recent orders table data
  const ordersTable = [
    {
      avatar: { src: avatar1, status: 'success' },
      customer: {
        name: 'Alex Johnson',
        type: 'New',
        ordered: 'Today, 10:45 AM',
      },
      amount: '$245.99',
      status: {
        text: 'Processing',
        color: 'info'
      },
      payment: { name: 'Visa', icon: cibCcVisa },
      items: 3,
    },
    {
      avatar: { src: avatar2, status: 'warning' },
      customer: {
        name: 'Sarah Williams',
        type: 'Returning',
        ordered: 'Today, 09:30 AM',
      },
      amount: '$189.50',
      status: {
        text: 'Shipped',
        color: 'success'
      },
      payment: { name: 'Mastercard', icon: cibCcMastercard },
      items: 5,
    },
    {
      avatar: { src: avatar3, status: 'danger' },
      customer: {
        name: 'Michael Brown',
        type: 'VIP',
        ordered: 'Yesterday, 4:20 PM',
      },
      amount: '$542.75',
      status: {
        text: 'Delivered',
        color: 'primary'
      },
      payment: { name: 'PayPal', icon: cibCcPaypal },
      items: 7,
    },
    {
      avatar: { src: avatar1, status: 'secondary' },
      customer: {
        name: 'Jessica Lee',
        type: 'Returning',
        ordered: 'Yesterday, 2:15 PM',
      },
      amount: '$321.20',
      status: {
        text: 'Cancelled',
        color: 'danger'
      },
      payment: { name: 'Amex', icon: cibCcAmex },
      items: 2,
    },
    {
      avatar: { src: avatar2, status: 'success' },
      customer: {
        name: 'David Wilson',
        type: 'New',
        ordered: 'Yesterday, 11:05 AM',
      },
      amount: '$98.99',
      status: {
        text: 'Processing',
        color: 'info'
      },
      payment: { name: 'Apple Pay', icon: cibCcApplePay },
      items: 1,
    },
  ]

  return (
    <>
      {/* <WidgetsDropdown className="mb-4" /> */}

      <CCard className="mb-4">
    
        <CCardFooter>
          <CRow
            xs={{ cols: 1, gutter: 4 }}
            sm={{ cols: 2 }}
            lg={{ cols: 4 }}
            className="mb-2 text-center"
          >
            {metricsData.map((item, index) => (
              <CCol key={index}>
                <div className="text-body-secondary">
                  <CIcon icon={item.icon} className="me-1" />
                  {item.title}
                </div>
                <div className="fw-semibold text-truncate">
                  {item.value} <span className="text-success small">(+{item.percent}%)</span>
                </div>
                <CProgress thin className="mt-2" color={item.color} value={item.percent * 5} />
              </CCol>
            ))}
          </CRow>
        </CCardFooter>
      </CCard>

      <CRow>
        <CCol xs={12} md={6}>
          <CCard className="mb-4">
            <CCardHeader>Weekly Sales Channels</CCardHeader>
            <CCardBody>
              {weeklySales.map((item, index) => (
                <div className="progress-group mb-4" key={index}>
                  <div className="progress-group-prepend">
                    <span className="text-body-secondary small">{item.title}</span>
                  </div>
                  <div className="progress-group-bars">
                    <CProgress thin color="info" value={item.online} />
                    <CProgress thin color="success" value={item.physical} />
                  </div>
                  <div className="progress-group-footer">
                    <small className="text-muted">Online: {item.online}</small>
                    <small className="ms-auto text-muted">Physical: {item.physical}</small>
                  </div>
                </div>
              ))}
            </CCardBody>
          </CCard>
        </CCol>

        <CCol xs={12} md={6}>
          <CCard className="mb-4">
            <CCardHeader>Product Categories Performance</CCardHeader>
            <CCardBody>
              {categoriesData.map((item, index) => (
                <div className="progress-group mb-4" key={index}>
                  <div className="progress-group-header">
                    <CIcon className="me-2" icon={item.icon} size="lg" />
                    <span>{item.title}</span>
                    <span className="ms-auto fw-semibold">
                      {item.value}{' '}
                      <span className="text-body-secondary small">({item.percent}%)</span>
                    </span>
                  </div>
                  <div className="progress-group-bars">
                    <CProgress thin color="warning" value={item.percent} />
                  </div>
                </div>
              ))}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CCard className="mb-4">
        <CCardHeader>
          <CRow>
            <CCol sm={5}>
              Recent Orders
            </CCol>
            <CCol sm={7} className="d-none d-md-block">
              <CButton color="primary" className="float-end">
                View All Orders
              </CButton>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <CTable align="middle" className="mb-0 border" hover responsive>
            <CTableHead className="text-nowrap">
              <CTableRow>
                <CTableHeaderCell className="bg-body-tertiary text-center">
                  <CIcon icon={cilPeople} />
                </CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary">Customer</CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary text-center">
                  Amount
                </CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary">Status</CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary text-center">
                  Payment
                </CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary">Items</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {ordersTable.map((item, index) => (
                <CTableRow key={index}>
                  <CTableDataCell className="text-center">
                    <CAvatar size="md" src={item.avatar.src} status={item.avatar.status} />
                  </CTableDataCell>
                  <CTableDataCell>
                    <div>{item.customer.name}</div>
                    <div className="small text-body-secondary text-nowrap">
                      <span className={item.customer.type === 'VIP' ? 'text-warning' : ''}>
                        {item.customer.type}
                      </span> | Ordered: {item.customer.ordered}
                    </div>
                  </CTableDataCell>
                  <CTableDataCell className="text-center fw-semibold">
                    {item.amount}
                  </CTableDataCell>
                  <CTableDataCell>
                    <span className={`badge bg-${item.status.color}`}>
                      {item.status.text}
                    </span>
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    <CIcon size="xl" icon={item.payment.icon} />
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    {item.items}
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Dashboard
