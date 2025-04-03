import style from "./Heading.module.css"

type HeadingProps = {
    children: React.ReactNode
}

export function Heading ({children}: HeadingProps) {
    return (
        <h1 className={style.heading}>{children}</h1>
    )
}