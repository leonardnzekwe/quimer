// Default Skeleton Loader component
export default function DefaultLoader() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="relative flex flex-col items-center">
        {/* Spinner */}
        <div className="h-24 w-24 rounded-full border-8 border-gray-300 border-t-8 border-t-amber-500 animate-spin mb-4"></div>
        {/* Text */}
        <p className="text-gray-400">Loading...</p>
      </div>
    </div>
  );
};

// Dashboard Skeleton Loader component
export const DashboardLoader = () => (
  <div className="relative flex h-screen text-white">
    {/* Sidebar */}
    <div className="flex flex-col justify-center">
      <div className="fixed rounded-lg my-4 ml-2 bg-neutral-800 h-fit w-16 hover:w-fit animate-pulse hover:animate-none">
        {/* Sidebar content */}
        <ul className="py-6 items-center">
          <li className="rounded-lg px-4 py-2">
            <div className="h-6 w-6 bg-gray-300 rounded-md mb-2"></div>
          </li>
          <li className="rounded-lg px-4 py-2">
            <div className="h-6 w-6 bg-gray-300 rounded-md mb-2"></div>
          </li>
          <li className="rounded-lg px-4 py-2">
            <div className="h-6 w-6 bg-gray-300 rounded-md mb-2"></div>
          </li>
          <li className="rounded-lg px-4 py-2">
            <div className="h-6 w-6 bg-gray-300 rounded-md mb-2"></div>
          </li>
          <li className="rounded-lg px-4 py-2">
            <div className="h-6 w-6 bg-gray-300 rounded-md mb-2"></div>
          </li>
        </ul>
      </div>
    </div>

    {/* Dashboard Content */}
    <div className="flex flex-col flex-1">
      {/* Top bar */}
      <div className="p-4">
        {/* Dashboard Navigation Section */}
        <div className="sticky top-0 z-50 bg-white/10 rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="h-6 w-20 bg-gray-300 rounded-md mb-2"></div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="h-8 w-32 bg-neutral-500 rounded-md"></div>
            <div className="h-8 w-32 bg-neutral-500 rounded-md"></div>
            <div className="h-8 w-32 bg-neutral-500 rounded-md"></div>
          </div>
        </div>
      </div>

      {/* Conditional rendering based on user status */}
      <div className="flex flex-col items-center mt-7">
        <div className="animate-spin bg-amber-500 h-10 w-10 mb-5"></div>
        <div className="bg-neutral-500 text-white text-center px-12 py-4 rounded-lg mb-4 h-16 w-6 animate-pulse"></div>
        <div className="bg-neutral-500 text-white text-center px-12 py-4 rounded-lg mb-4 h-16 w-64 animate-pulse"></div>
      </div>
    </div>
  </div >
);

// Submission Skeleton Loader component
export const SubmissionLoader = () => (
  <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-neutral-300/25">
    <div className="relative flex flex-col items-center bg-white p-8 rounded-lg">
      {/* Spinner */}
      <div className="h-24 w-24 rounded-full border-8 border-gray-300 border-t-8 border-t-amber-500 animate-spin mb-4"></div>
      {/* Text */}
      <p className="text-gray-600">Submiting...</p>
    </div>
  </div>
);