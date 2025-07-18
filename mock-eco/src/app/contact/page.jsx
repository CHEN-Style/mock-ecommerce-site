export default function ContactPage() {
  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-center p-8 border-t-2 border-black">
      <div className="max-w-4xl w-full text-center">
        <h1 className="text-6xl font-bold text-[#cd4c3a] mb-8 chewy-text">
          Contact Us
        </h1>
        
        <div className="bg-[#fbd576] p-8 rounded-3xl border-4 border-black shadow-2xl">
          <p className="text-2xl text-black mb-6 luckiest-text">
            Get in Touch With Us!
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-lg text-gray-800">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-[#cd4c3a] chewy-text">
                Contact Information
              </h3>
              <p>📧 Email: ChenStyle2022@gmail.com</p>
              <p>📞 Phone: +1 (555) 123-4567</p>
              <p>📍 Address: 123 E-commerce St, Shopping City, SC 12345</p>
              <p>🕐 Hours: Mon-Fri 9AM-6PM</p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-[#cd4c3a] chewy-text">
                Follow Us
              </h3>
              <p className="text-xl font-bold text-red-500 text-left">This is a simulated e-commerce independent website, 
                used as a personal full stack skill display, 
                not as a commercial purpose, if you are interested in me, 
                please click the bottom left button to contact me.
                The email address on the left is real. It's my personal email address</p>
              <div className="flex justify-center space-x-4 mt-4">
                <div className="w-12 h-12 bg-[#cd4c3a] rounded-full flex items-center justify-center text-white font-bold">
                  F
                </div>
                <div className="w-12 h-12 bg-[#cd4c3a] rounded-full flex items-center justify-center text-white font-bold">
                  T
                </div>
                <div className="w-12 h-12 bg-[#cd4c3a] rounded-full flex items-center justify-center text-white font-bold">
                  I
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <button className="btn">
              Send Message
            </button>
          </div>
        </div>
      </div>
    </section>
  );
} 