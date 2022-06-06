import React from "react";

const chevronLeft = (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    className="stroke-white"
  >
    <path
      stroke="currentColor"
      d="M14.2,7.22l-4.11,4.11a1,1,0,0,0,0,1.41l4,4"
    />
  </svg>
);

const chevronRight = (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    className="stroke-white "
  >
    <path
      stroke="currentColor"
      d="M9.8,16.78l4.11-4.11a1,1,0,0,0,0-1.41l-4-4"
    />
  </svg>
);

const InfoTableComponent = ({
  rowsCount,
  size,
  page,
  onNext,
  onPrevious,
  onSize,
}) => {
  const pagesCount = Math.ceil(rowsCount / size);

  return (
    <>
      <div className="flex flex-row justify-between py-2 md:px-10 xs:px-5 items-center">
        <div className="font-bold text-green-600 text-center">
          Rows: <span className="font-normal text-black">{rowsCount}</span>
        </div>
        <div className="flex md:gap-5 items-center flex-1 justify-center ">
          <button
            className={`hover:bg-neutral-200 rounded-xl ${
              page === 1
                ? "opacity-50 text-neutral-500 hover:bg-transparent"
                : ""
            }`}
            disabled={page === 1}
            onClick={onPrevious}
          >
            {chevronLeft}
          </button>
          <div className="mt-1">
            {page} / {pagesCount}
          </div>
          <button
            className={`hover:bg-neutral-200 rounded-xl ${
              page === pagesCount
                ? "opacity-50 text-neutral-500 hover:bg-transparent"
                : ""
            }`}
            disabled={page === pagesCount}
            onClick={onNext}
          >
            {chevronRight}
          </button>
        </div>
        <div className="flex flex-row gap-4 items-center justify-end">
          <div className="font-bold text-green-600 flex gap-4">
            Size:{" "}
            <select className="font-normal text-black" onChange={onSize}>
              <option value="10">10</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

export default InfoTableComponent;
