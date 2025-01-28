import Link from "next/link"
import ToggleThemeButton from "../theme/button.toggletheme"
import { usePathname, useRouter } from "next/navigation"
import { Breadcrumb, BreadcrumbList, BreadcrumbSeparator } from "../ui/breadcrumb"
import { BreadcrumbItem } from "@nextui-org/react"
import { useEffect } from "react"

interface NavProps {
    groupname?:string,
    planName?: string
}

const Nav = ( { groupname, planName }: NavProps) => {
    const router = useRouter();
    const pathname = usePathname();
    
    const showSeperator = (index:number) => {
        if (index === 0) {
          return groupname !== undefined  && <BreadcrumbSeparator />;
        } else if (index === 1) {
          return groupname !== undefined && planName !== undefined && <BreadcrumbSeparator />;
        }
        return null;
    }

    return (
        <nav className="border-b-2 bg-brandPrimary shadow-lg p-3 flex py-4 justify-between">
            <div className="flex gap-10">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <Link href={'/home'} className="font-bold text-white hover:text-brandNeutralGray  text-4xl">BudgetWise</Link>
                        </BreadcrumbItem>
                        {showSeperator(0)}
                        <BreadcrumbItem>
                            <h1 onClick={() => { (pathname !== '/group-plan') && router.back()}} className={`text-4xl text-white font-bold ${pathname !== '/group-plan' ? 'hover:cursor-pointer hover:text-brandNeutralGray' : 'hover:cursor-default'} `}>
                            {groupname}
                            </h1>
                        </BreadcrumbItem>
                        {showSeperator(1)}
                        <BreadcrumbItem>
                            <h1 className='text-4xl text-white font-bold'>
                                {planName}
                            </h1>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            
            <ToggleThemeButton isAuthenticated={true}/>
        </nav>
    )
}

export default Nav