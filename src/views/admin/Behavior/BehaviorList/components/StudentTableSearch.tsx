import { useState, useEffect, useRef } from 'react'
import Input from '@/components/ui/Input'
import { HiOutlineSearch } from 'react-icons/hi'
import debounce from 'lodash/debounce'
import type { ChangeEvent } from 'react'
import { apiSearchBehavior } from '@/services/managementService'

const BehaviorSearch = () => {
    const [query, setQuery] = useState('')
    const searchInput = useRef<HTMLInputElement>(null)

    // Debounced API call
    const fetchBehavior = debounce(async (searchQuery: string) => {
        try {
            const response = await apiSearchBehavior(searchQuery)
            const data = await response.json()
            console.log(data) // Handle the response data as needed
        } catch (error) {
            console.error('Error fetching behavior:', error)
        }
    }, 300) // Adjust the debounce delay as needed

    // Handle input change
    const onEdit = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setQuery(value)
        fetchBehavior(value)
    }

    return (
        <Input
            ref={searchInput}
            className="max-w-md md:w-52 md:mb-0 mb-4"
            size="sm"
            placeholder="Tìm sinh viên"
            prefix={<HiOutlineSearch className="text-lg" />}
            onChange={onEdit}
        />
    )
}

export default BehaviorSearch
