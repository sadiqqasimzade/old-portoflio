import { PropsWithChildren } from "react"

export const Container = ({ children }: PropsWithChildren) => {
    return (
        <div className="fullscreen flex-centered p-3">
            {children}
        </div>
    )
}