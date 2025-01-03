import ToggleThemeButton from "../theme/button.toggletheme"

const Nav = () => {
    return (
        <nav className="border-b-2 p-3  ">
            <h1 className="font-bold text-brandDark text-4xl">BudgetWise</h1>
            <ToggleThemeButton isAuthenticated={true}/>
        </nav>
    )
}

export default Nav