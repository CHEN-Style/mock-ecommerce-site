import Image from "next/image";

export default function AboutPage() {
  return (
    <section className="w-full min-h-screen flex flex-col items-center border-t-2 border-b-2 border-black">
      <div className="animated-background h-[600px] flex flex-col items-center justify-center">
        <div className='w-full h-[550px] bg-[#cd4c3a] flex flex-row items-center justify-center '>
          <p className='w-[500px] luckiest-text text-7xl text-[#fbd576] text-center relative'>We sell <br /> vintage <br /> products</p>
          <Image src="/Logo/store.png" alt="store" width={500} height={500} className='w-[500px] h-[500px]' priority quality={85} />
          <p className='w-[500px] luckiest-text text-7xl text-[#fbd576] text-center '>quality <br /> is sure <br /> guaranteed</p>
        </div>
      </div>
      <div className="w-full flex flex-col items-center justify-center border-t-2 border-black">
        <div className="w-full h-[700px] flex flex-row items-center justify-center gap-10">
          <Image src="/Logo/store2.png" alt="store2" width={600} height={600} className='w-[600px] h-[600px]' loading="lazy" />
          <article className="w-[600px] h-[600px] flex flex-col items-start justify-center gap-10">
            <p className="luckiest-text text-6xl">What is EStudio?</p>
            <p className="text-2xl font-bold">At EStudio, we celebrate the timeless charm of vintage and the bold spirit of independent creators.
                We're a curated space for lovers of retro treasures and one-of-a-kind original pieces. 
                Our collection brings together handpicked vintage finds and exclusive designs from local artists 
                and makers who pour heart and soul into their craft. Whether it’s a classic denim jacket from decades 
                past or a limited-run handmade accessory, every item in our store has a story—and it starts with 
                people who dare to create differently. We’re more than a shop—we’re a community built on individuality, 
                nostalgia, and a shared love for authenticity.
            </p>
          </article>
        </div>
        <div className="w-full h-[700px] flex flex-row items-center justify-center gap-10">
          <article className="w-[600px] h-[600px] flex flex-col items-end justify-center gap-10">
            <p className="luckiest-text text-6xl">Meet our team</p>
            <p className="text-2xl font-bold text-right">EStudio was founded by Ethan, a long-time lover of all things vintage and a 
              firm believer in the power of personal style. What started as a small collection of handpicked retro gems 
              has grown into a vibrant space celebrating individuality, nostalgia, and local talent.
              Together with Stella, our ever-resourceful store curator, and Ethan, our floor lead and all-round style expert
              , we’ve built a passionate team that lives and breathes creativity. Every piece you see in our store has been 
              carefully sourced, styled, or designed with love. Whether it's finding the perfect ‘90s jacket or collaborating
              with an up-and-coming artist on a limited collection, our team is here to keep things full of
              good vibes.
            </p>
          </article>          
          <Image src="/Logo/store3.png" alt="store3" width={600} height={600} className='w-[600px] h-[600px]' loading="lazy" />
        </div>
      </div>
    </section>
  );
} 