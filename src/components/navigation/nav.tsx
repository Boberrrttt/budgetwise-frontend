import ToggleThemeButton from "../theme/button.toggletheme"

const Nav = () => {
    return (
        <nav className="border-b-2 border-black dark:border-white p-3 flex justify-between">
            <h1 className="font-bold text-brandPrimary dark:text-brandPrimary text-4xl">BudgetWise</h1>
            <ToggleThemeButton isAuthenticated={true}/>
        </nav>
    )
}

export default Nav