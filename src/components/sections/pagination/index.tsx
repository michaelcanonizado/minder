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

  /*
  Renders the sequence of page links. The links must 
  follow 3 rules:
    1) The current page link must be at the center 
    and have the outline (have the isActive prop). 
    Unless:
    2) The current page is in between page 1 and 
    the midpoint. E.g:
        1, [2], 3, 4, 5, 6, 7, ...
        |          |        
       min       mid
    3) And at the opposite end, where the current 
    page is between the last page and the midpoint. 
    E.g:
       ..., 7, 8, 9, 10, 11, [12], 13
                     |             |
                    mid          max
  */
  const renderPaginationLinkSequence = () => {
    const linkSequence = [];
    const numOfLinks = 5;
    const midPoint = Math.floor((numOfLinks + 1) / 2);

    // Case (1)
    if (
      currentPage > midPoint - 1 &&
      currentPage < pagesCount - (midPoint - 2)
    ) {
      let offset = (midPoint - 1) * -1;

      for (let i = 0; i < numOfLinks; i++) {
        linkSequence.push(
          <PaginationItem>
            <PaginationLink
              href={`${pathname}?page=${currentPage + offset}`}
              isActive={i == midPoint - 1 ? true : false}
            >
              {currentPage + offset}
            </PaginationLink>
          </PaginationItem>
        );

        offset += 1;
      }

      return linkSequence;
    }

    // Case (2)
    else if (
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
    }

    // Case (3)
    else if (
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
