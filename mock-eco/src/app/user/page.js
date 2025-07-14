export default function UserPage() {
  return (
    <section className="w-full h-[600px] border-t-2 border-b-2 border-black p-8">
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-3xl font-bold mb-4">用户页面</h1>
        <p className="text-lg text-gray-600 mb-8">这是用户页面的内容</p>
        <div className="space-y-4">
          <div className="bg-blue-100 p-4 rounded">用户信息</div>
          <div className="bg-green-100 p-4 rounded">订单历史</div>
          <div className="bg-purple-100 p-4 rounded">个人设置</div>
        </div>
      </div>
    </section>
  );
} 