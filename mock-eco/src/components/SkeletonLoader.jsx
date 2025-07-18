export default function SkeletonLoader({ type = 'default' }) {
  const SkeletonBox = ({ className }) => (
    <div className={`bg-gray-300 animate-pulse rounded ${className}`}></div>
  );

  const SkeletonText = ({ className }) => (
    <div className={`bg-gray-300 animate-pulse rounded-full ${className}`}></div>
  );

  if (type === 'home') {
    return (
      <div className="w-full min-h-screen animate-fade-in">
        {/* Hero Section Skeleton */}
        <section className="w-full h-[600px] border-t-2 border-b-2 border-black flex items-center justify-center">
          <div className="w-[95%] h-[90%] flex flex-row items-center justify-between bg-gray-200 border-2 border-black rounded-[20px] pl-15 overflow-hidden">
            <div className="w-[500px] h-[450px] flex flex-col justify-center space-y-4">
              <SkeletonText className="h-12 w-3/4" />
              <SkeletonText className="h-16 w-full" />
              <SkeletonText className="h-16 w-full" />
              <SkeletonText className="h-16 w-full" />
              <SkeletonBox className="h-12 w-40 mt-4" />
            </div>
            <SkeletonBox className="w-[750px] h-[400px]" />
          </div>
        </section>

        {/* Marquee Skeleton */}
        <div className="w-full h-[50px] bg-gray-800 flex items-center justify-center">
          <SkeletonText className="h-6 w-96 bg-gray-600" />
        </div>

        {/* Product Sections Skeleton */}
        <section className="w-full h-[600px] border-b-2 border-black">
          <div className="w-full h-[100px] flex flex-row items-center justify-between px-15 pt-10">
            <SkeletonText className="h-10 w-64" />
            <SkeletonBox className="h-12 w-32" />
          </div>
          <div className="w-full h-[500px] flex items-center justify-center px-10">
            <div className="flex space-x-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-4">
                  <SkeletonBox className="w-[280px] h-[280px]" />
                  <SkeletonText className="h-6 w-full" />
                  <SkeletonText className="h-8 w-20" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* More sections... */}
        <section className="w-full h-[400px] border-b-2 border-black bg-gray-200">
          <div className="w-full h-[400px] flex items-center justify-center px-10">
            <div className="flex space-x-6">
              {[...Array(3)].map((_, i) => (
                <SkeletonBox key={i} className="w-[280px] h-[280px]" />
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (type === 'product') {
    return (
      <div className="w-full min-h-screen animate-fade-in">
        {/* Marquee Skeleton */}
        <div className="w-full h-[50px] bg-gray-800 flex items-center justify-center">
          <SkeletonText className="h-6 w-96 bg-gray-600" />
        </div>

        {/* Title Skeleton */}
        <div className="w-full h-[150px] flex flex-row justify-between px-10">
          <div className="h-[150px] flex flex-col justify-end items-start space-y-2">
            <SkeletonText className="h-12 w-24" />
            <SkeletonText className="h-16 w-32" />
          </div>
        </div>

        {/* Main Content Skeleton */}
        <div className="w-full flex flex-row items-start justify-center mt-10 gap-8 px-10 pb-10">
          {/* Filter Skeleton */}
          <div className="w-[300px] min-h-[500px] bg-gray-100 border-2 border-black rounded-2xl p-6 space-y-6">
            <SkeletonText className="h-8 w-20" />
            <SkeletonBox className="h-12 w-full rounded-full" />
            <div className="space-y-4">
              <SkeletonText className="h-6 w-32" />
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center space-x-3">
                  <SkeletonBox className="w-5 h-5 rounded-full" />
                  <SkeletonText className="h-4 w-20" />
                  <SkeletonText className="h-4 w-8 ml-auto" />
                </div>
              ))}
            </div>
          </div>

          {/* Products Grid Skeleton */}
          <div className="flex-1 min-h-[500px]">
            <div className="grid grid-cols-3 gap-6">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="flex justify-center">
                  <div className="space-y-4">
                    <SkeletonBox className="w-[280px] h-[280px] rounded-lg" />
                    <SkeletonText className="h-6 w-full" />
                    <SkeletonText className="h-8 w-20" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'item') {
    return (
      <div className="w-full min-h-screen  animate-fade-in">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 mt-12">
            {/* Left - Image Skeleton */}
            <div className="relative flex-1 lg:flex-none lg:w-1/2 flex flex-col items-center justify-center">
              <SkeletonBox className="w-full aspect-square rounded-2xl mb-4" />
              <div className="flex justify-center space-x-2">
                {[...Array(3)].map((_, i) => (
                  <SkeletonBox key={i} className="w-3 h-3 rounded-full" />
                ))}
              </div>
            </div>

            {/* Right - Product Info Skeleton */}
            <div className="space-y-6 flex-1 lg:flex-none lg:w-1/2">
              {/* Title and Price */}
              <div className="space-y-4">
                <SkeletonText className="h-12 w-3/4" />
                <SkeletonText className="h-12 w-32" />
              </div>

              {/* Description */}
              <div className="space-y-4">
                <SkeletonText className="h-6 w-full" />
                <SkeletonText className="h-6 w-full" />
                <SkeletonText className="h-6 w-3/4" />
                <SkeletonText className="h-6 w-full" />
                <SkeletonText className="h-6 w-2/3" />
                <SkeletonText className="h-6 w-24" />
              </div>

              {/* Quantity and Cart */}
              <div className="space-y-4">
                <SkeletonBox className="h-12 w-32 rounded-full" />
                <SkeletonBox className="h-14 w-full rounded-full" />
              </div>

              {/* Shipping Info */}
              <SkeletonBox className="h-32 w-full rounded-2xl" />

              {/* FAQ */}
              <SkeletonBox className="h-16 w-full rounded-2xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default skeleton
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-white animate-fade-in">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-[#ecd448] border-t-4 border-t-[#cd4c3a] rounded-full animate-spin mx-auto mb-4"></div>
        <SkeletonText className="h-6 w-48 mx-auto" />
      </div>
    </div>
  );
} 