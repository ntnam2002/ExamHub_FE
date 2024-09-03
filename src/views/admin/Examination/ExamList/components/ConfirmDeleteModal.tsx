// import React from 'react'
// import { Modal, Typography, Space, Button } from 'antd'
// import { ExclamationCircleOutlined } from '@ant-design/icons'

// const { Text } = Typography

// interface ConfirmDeleteModalProps {
//     show: boolean
//     onConfirm: () => void
//     onCancel: () => void
//     itemName?: string
// }

// const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
//     show,
//     onConfirm,
//     onCancel,
//     itemName = 'this item',
// }) => {
//     return (
//         <Modal
//             title={
//                 <Space>
//                     <ExclamationCircleOutlined style={{ color: '#faad14' }} />
//                     <Text strong>Confirm Deletion</Text>
//                 </Space>
//             }
//             open={show}
//             okText="Yes, delete"
//             cancelText="No, keep it"
//             okButtonProps={{ danger: true }}
//             onOk={onConfirm}
//             onCancel={onCancel}
//         >
//             <p>Are you sure you want to delete {itemName}?</p>
//             <Text type="secondary">
//                 This action cannot be undone. Please confirm that you want to
//                 permanently delete this item.
//             </Text>
//         </Modal>
//     )
// }

// export default ConfirmDeleteModal
