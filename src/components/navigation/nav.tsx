import Link from "next/link"
import ToggleThemeButton from "../theme/button.toggletheme"

interface NavProps {
    groupname:string
}

const Nav = ( { groupname }: NavProps) => {
    return (
        <nav className="border-b-2 bg-brandPrimary shadow-lg p-3 flex py-4 justify-between">
            <Link href={'/home'} className="font-bold text-white  text-4xl">BudgetWise</Link>
            <div className="flex gap-5">
                <h1 className="text-4xl text-white font-bold">{groupname}</h1>
                <ToggleThemeButton isAuthenticated={true}/>
            </div>
        </nav>
    )
}

export default Nav