import type { SmartPaginationProps } from '@/utils/types'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../ui/pagination'
import { ChevronLeft, ChevronRight } from 'lucide-react'

function CustomPagination({
  totalPages,
  currentPage,
  handlePageChange,
}: SmartPaginationProps) {
  const getPageRange = () => {
    const pages: (number | '...')[] = []

    const start = Math.max(2, currentPage - 1)
    const end = Math.min(totalPages - 1, currentPage + 1)

    pages.push(1)

    if (start > 2) pages.push('...')

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    if (end < totalPages - 1) pages.push('...')

    if (totalPages > 1) pages.push(totalPages)

    return pages
  }

  const pages = getPageRange()
  console.log(currentPage)

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            size="sm"
            className={
              currentPage == 1
                ? 'pointer-events-none opacity-50'
                : 'cursor-pointer'
            }
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
          />
        </PaginationItem>

        {pages.map((page, idx) => (
          <PaginationItem key={idx}>
            {page === '...' ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                size="sm"
                className="cursor-pointer"
                isActive={page === currentPage}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            size="sm"
            className={
              currentPage == totalPages
                ? 'pointer-events-none opacity-50'
                : 'cursor-pointer'
            }
            onClick={() =>
              handlePageChange(Math.min(totalPages, currentPage + 1))
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
export default CustomPagination
