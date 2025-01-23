import Link from "next/link"
import ToggleThemeButton from "../theme/button.toggletheme"
import { usePathname, useRouter } from "next/navigation"

interface NavProps {
    groupname?:string
}

const Nav = ( { groupname }: NavProps) => {
    const router = useRouter();
    const pathname = usePathname();
    

    return (
        <nav className="border-b-2 bg-brandPrimary shadow-lg p-3 flex py-4 justify-between">
            <Link href={'/home'} className="font-bold text-white hover:text-brandNeutralGray  text-4xl">BudgetWise</Link>
            <div className="flex gap-5">
                <h1 onClick={() => { (groupname !== '' && pathname !== '/group-plan') && router.back()}} className="text-4xl text-white font-bold hover:cursor-pointer hover:text-brandNeutralGray">
                    {groupname}
                </h1>
                <ToggleThemeButton isAuthenticated={true}/>
            </div>
        </nav>
    )
}

export default Nav