import { routes } from "@shared/consts";
import { Button } from "@shared/ui";
import { LogOut } from "lucide-react";
import { cookies as _cookies } from "next/headers";
import { redirect } from "next/navigation";
import { FC, PropsWithChildren } from "react";

const layout: FC<PropsWithChildren> = ({ children }) => {
    return <>
        {children}
        <Button size='icon' className="fixed bottom-4 right-4" onClick={async () => {
            'use server'

            const cookies = await _cookies()
            cookies.delete('userId')
            redirect(routes.unAuth.login)
        }}>
            <LogOut />
        </Button>
    </>
}

export default layout