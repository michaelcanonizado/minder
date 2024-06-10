import React from 'react';

import {
  Pagination as PaginationShadcn,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination';

const Pagination = ({
  pathname,
  currentPage,
  pagesCount
}: {
  pathname: string;
  currentPage: number;
  pagesCount: number;
}) => {
  const isPreviousDisabled = currentPage <= 1;
  const isNextDisabled = currentPage >= pagesCount;

  const renderPaginationLinkSequence = () => {
    const linkSequence = [];
    const numOfLinks = 5;
    const midPoint = Math.floor((numOfLinks + 1) / 2);

    console.log('midpoint', midPoint);
    console.log('curpage', currentPage);
    console.log('max', pagesCount);

    if (
      currentPage > midPoint - 1 &&
      currentPage < pagesCount - (midPoint - 2)
    ) {
      let offset = (midPoint - 1) * -1;

      for (let i = 0; i < numOfLinks; i++) {
        linkSequence.push(
          <PaginationItem>
            <PaginationLink
              href={`${pathname}?page=${currentPage}`}
              isActive={i == midPoint - 1 ? true : false}
            >
              {currentPage + offset}
            </PaginationLink>
          </PaginationItem>
        );

        offset += 1;
      }

      return linkSequence;
    } else if (
      currentPage < pagesCount - (midPoint - 2) &&
      !(currentPage > midPoint - 1)
    ) {
      for (let i = 1; i <= numOfLinks; i++) {
        linkSequence.push(
          <PaginationItem>
            <PaginationLink
              href={`${pathname}?page=${i}`}
              isActive={i == currentPage}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
      return linkSequence;
    } else if (
      currentPage > midPoint - 1 &&
      !(currentPage < pagesCount - (midPoint - 2))
    ) {
      for (let i = pagesCount - numOfLinks + 1; i <= pagesCount; i++) {
        linkSequence.push(
          <PaginationItem>
            <PaginationLink
              href={`${pathname}?page=${i}`}
              isActive={i == currentPage}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
      return linkSequence;
    }
  };

  return (
    <PaginationShadcn>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={`${pathname}?page=${currentPage > 1 ? currentPage - 1 : 1}`}
            disabled={isPreviousDisabled}
          />
        </PaginationItem>
        {renderPaginationLinkSequence()}
        <PaginationItem>
          <PaginationNext
            href={`${pathname}?page=${currentPage + 1}`}
            disabled={isNextDisabled}
          />
        </PaginationItem>
      </PaginationContent>
    </PaginationShadcn>
  );
};

export default Pagination;
