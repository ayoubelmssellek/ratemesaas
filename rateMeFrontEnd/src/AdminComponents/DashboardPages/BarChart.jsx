import React, { useState, useEffect } from "react";

const BarChart = ({ data, withModal = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const itemsPerPage = 6;

  const total = data.reduce((acc, val) => acc + val.count, 0);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  const handleBarClick = (item) => {
    setCurrentItem(item);
    if (withModal) setIsOpen(true);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const getVisibleData = () => {
    if (!isMobile) return data;
    
    const startIndex = currentPage * itemsPerPage;
    return data.slice(startIndex, startIndex + itemsPerPage);
  };

  return (
    <>
      <div className="flex flex-col w-full">
        <div className="flex gap-4 mx-auto w-full h-64 rounded-xl p-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 shadow-sm overflow-hidden">
          {getVisibleData().map((item, index) => (
            <div
              key={index}
              className="flex flex-col space-y-3 justify-end items-center text-center h-full w-full cursor-pointer group"
              onClick={() => handleBarClick(item)}
            >
              {/* Count on top */}
              <div className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                {item.count}
              </div>

              {/* Bar */}
              <div
                className="bg-purple-300 dark:bg-purple-600 rounded-lg hover:bg-purple-400 dark:hover:bg-purple-500 transition-all duration-300 w-full group-hover:shadow-md"
                style={{ height: `${(item.count / total) * 100}%` }}
              />

              {/* Label */}
              <div className="mt-2 font-medium text-sm text-gray-600 dark:text-gray-300">
                {item.label}
              </div>
            </div>
          ))}
        </div>

        {/* Pagination controls for mobile */}
        {isMobile && totalPages > 1 && (
          <div className="flex justify-center mt-4 space-x-4">
            <button
              className="px-4 py-2 bg-purple-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handlePrevPage}
              disabled={currentPage === 0}
            >
              Previous
            </button>
            <div className="flex items-center">
              <span className="text-sm text-gray-600 dark:text-gray-300">
                Page {currentPage + 1} of {totalPages}
              </span>
            </div>
            <button
              className="px-4 py-2 bg-purple-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleNextPage}
              disabled={currentPage === totalPages - 1}
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Optional modal if needed */}
      {isOpen && withModal && (
        <ModalChart currentItem={currentItem} setIsOpen={setIsOpen} />
      )}
    </>
  );
};

export default BarChart;

// Optional modal (if you have subgroups for monthly breakdown)
const ModalChart = ({ currentItem, setIsOpen }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm z-50">
      <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl shadow-lg max-w-xl w-full mx-4 p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Reviews for {currentItem?.label} {currentItem?.year}
          </h3>
          <button
            className="text-gray-400 hover:text-red-500"
            onClick={() => setIsOpen(false)}
          >
            ✕
          </button>
        </div>

        <div className="text-center text-gray-700 dark:text-gray-200 text-lg font-semibold">
          {currentItem?.count} reviews
        </div>
      </div>
    </div>
  );
};