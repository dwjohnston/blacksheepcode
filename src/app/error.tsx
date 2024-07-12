'use client' // Error components must be Client Components

import { Page500 } from '@/components/error_pages/Page500'
import { useEffect } from 'react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {

    return <Page500 />
}