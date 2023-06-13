'use client'
import Link from "next/link"
import Image from "next/image"
import {useState, useEffect} from "react"
import {signIn, signOut, useSession, getProviders} from "next-auth/react"


const ProvidersList = ({providers}) =>{
  return providers? 
    <>
      { Object.values(providers).map((provider)=>{
          return (
            <button type="button" 
              key={provider.name}
              onClick={()=>signIn(provider.id)}
              className="black_btn">
              Sign in with {provider.name}
            </button>
          ) 
        })
      }
    </>
    : <></>
}

const Nav = () =>{
  const {data:session} = useSession()
  const [providers, setProviders] = useState(null)
  const [toggleDropdown, setToggleDropdown] = useState(false)

  // Run only once at the beginning of the component lifecycle
  useEffect(()=>{
    const loadProviders = async ()=>{
      const availableProviders = await getProviders()
      setProviders(availableProviders)
    }
    
    loadProviders()
  },[])
  // Render
  return (
    <nav className="flex-between w-full mb-16 pt-3 relative">
      <Link href={"/"}  className="flex gap-2 flex-center">
        <Image src="/assets/images/logo.svg" 
          width={50}
          height={50}
          alt="logo"
          className="object-contain"
        />
        <p className="logo_text text-center">
          NextApp
        </p>
      </Link>
      {/* Desktop Navigation */}
      <div className="md:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/item/create"
              className="black_btn">
              Create Item
            </Link>
            <button type="button"
              onClick={signOut}
              className="outline_btn">
              Sign Out
            </button>
            <Link href="/profile">
              <Image 
                alt="Profile"
                src={session?.user?.image}
                width={37}
                height={37}
                className="rounded-full"/>
            </Link>
          </div>
        ):(<ProvidersList providers={providers}/>)}
      </div>
      {/* Mobile Navigation */}
      <div className="md:hidden flex gap-3">
        {session?.user ? (
          <div className="flex">
            <Image 
              alt="Profile"
              src={session?.user?.image}
              width={37}
              height={37}
              className="rounded-full"
              onClick={()=>setToggleDropdown((prev)=>!prev)}
            />
            { toggleDropdown && (
              <div className="dropdown">
                <Link href="/profile"
                  className="dropdrown_link"
                  onClick={()=>setToggleDropdown(false)}>
                    Profile
                </Link>
                <Link href="/item/create"
                  className="dropdrown_link"
                  onClick={()=>setToggleDropdown(false)}>
                    Create Item
                </Link>
                <hr/>
                <button type="button"
                  onClick={()=>{
                    setToggleDropdown(false)
                    signOut()
                  }}
                  className="black_btn">
                    Sign Out
                </button>
              </div>
            )}
          </div>
        ):(<ProvidersList providers={providers}/>)}
      </div>
    </nav>
  )
}
export default Nav