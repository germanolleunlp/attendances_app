export default function UserSkeleton({ number = 6 }: { number?: number }) {
  return Array.from({ length: number }, (_, i) => {
    return (
      <div key={`user-skeleton-${i}`} className="p-2 lg:w-1/3 md:w-1/2 w-full">
        <div className="h-full flex items-center border-gray-800 border p-4 rounded-lg gap-3">
          <svg
            className="w-12 h-12 me-3 text-gray-700"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
          </svg>
          <div className="flex-grow">
            <div className="h-2.5 rounded-full bg-gray-700 w-32 mb-2"></div>
            <div className="w-48 h-2.5 rounded-full bg-gray-700"></div>
          </div>
        </div>
      </div>
    );
  });
}
