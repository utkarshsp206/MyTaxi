import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return(
    <div className="flex justify-center flex-col m-5 items-center" style={{padding:'150px'}}>
  <div 
    className="absolute top-0 left-0 w-full h-full"
    style={{
      backgroundImage: `url('/login-back.png')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}
  />
       <SignIn />
    </div>
  )
  
 
}