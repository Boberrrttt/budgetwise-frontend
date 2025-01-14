import Link from "next/link"
import ToggleThemeButton from "../theme/button.toggletheme"

interface NavProps {
    groupname:string
}

const Nav = ( { groupname }: NavProps) => {
    return (
        <nav className="border-b-2 border-black dark:border-white p-3 flex justify-between">
            <Link href={'/home'} className="font-bold text-brandPrimary dark:text-brandPrimary text-4xl">BudgetWise</Link>
            <div className="flex gap-5">
                <h1 className="text-4xl text-brandPrimary font-bold">{groupname}</h1>
                <ToggleThemeButton isAuthenticated={true}/>
            </div>
        </nav>
    )
}

export default Nav