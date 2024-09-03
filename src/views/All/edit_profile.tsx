import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '@/utils/hooks/useAuth'

const EditProfile = () => {
    const { user, updateUser } = useAuth()
    const [name, setName] = useState(user?.name || '')
    const [email, setEmail] = useState(user?.email || '')
    const navigate = useNavigate()

    const handleSave = () => {
        // Cập nhật thông tin người dùng
        updateUser({ name, email })
        // Điều hướng về trang trước đó hoặc trang chủ
        navigate(-1)
    }

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Sửa thông tin cá nhân</h2>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Tên
                </label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Email
                </label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div className="flex items-center justify-between">
                <button
                    onClick={handleSave}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Lưu
                </button>
                <button
                    onClick={() => navigate(-1)}
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Hủy
                </button>
            </div>
        </div>
    )
}

export default EditProfile
