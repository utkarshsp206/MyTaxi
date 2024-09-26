import { SignUp } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return(
    <div className="flex justify-center flex-col m-5 items-center" style={{padding:'100px'}}>
       <div 
    className="absolute top-0 left-0 w-full h-full"
    style={{
      backgroundImage: `url('/signup-back.png')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}
  />
       <SignUp />
    </div>
  )
  
 
}