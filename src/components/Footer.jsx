import Image from "next/image"

const Footer = () =>{
  return (
    <div className="footer bg-black mt-14 p-5 flex justify-around items-center content-center">
      <div>
        <Image
          priority
          src={"/assets/images/next.svg"}
          alt="NextJs Logo"
          width={100}
          height={80}
          className="object-contain"
        />
      </div>
      <div>
        <Image
            priority
            src={"/assets/images/vercel.svg"}
            alt="NextJs Logo"
            width={100}
            height={80}
            className="object-contain"
          />
      </div>
    </div>
  )
}
export default Footer