"use client";

import { Pagination } from "@heroui/react";
import { useRouter, useSearchParams } from "next/navigation";

export default function PaginationWrapper({ totalPages, currentPage }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    
    router.push(`?${params.toString()}`);
  };

  return (
    <Pagination className="justify-center">
      <Pagination.Content>
        {/* আগের (Previous) বাটন */}
        <Pagination.Item>
          <Pagination.Previous 
            isDisabled={currentPage === 1} 
            onPress={() => handlePageChange(currentPage - 1)}
          >
            <Pagination.PreviousIcon />
            <span>Previous</span>
          </Pagination.Previous>
        </Pagination.Item>

        {/* পেজ নাম্বারগুলোর লুপ */}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <Pagination.Item key={p}>
            <Pagination.Link 
              isActive={p === currentPage} 
              onPress={() => handlePageChange(p)}
            >
              {p}
            </Pagination.Link>
          </Pagination.Item>
        ))}

        {/* পরের (Next) বাটন */}
        <Pagination.Item>
          <Pagination.Next 
            isDisabled={currentPage === totalPages} 
            onPress={() => handlePageChange(currentPage + 1)}
          >
            <span>Next</span>
            <Pagination.NextIcon />
          </Pagination.Next>
        </Pagination.Item>
      </Pagination.Content>
    </Pagination>
  );
}