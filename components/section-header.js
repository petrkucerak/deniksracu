export default function SectionHeader({ title }) {
    return (
        <h2
            id={title}
            className="text-5xl font-bold text-gray-200 tracking-wider uppercase mb-[-18px] ml-2"
        >
            {title}
        </h2>
    );
}