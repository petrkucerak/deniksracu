export default function LocalTitle({ title, subtitle }) {
    return (
        <>
            <h3 className="text-xl font-semibold">
                {title}
            </h3>
            <p className="mb-3">{subtitle}</p>
        </>
    )
}