export default function SectionBody({ children }) {
    return (
        <div className="p-5 rounded-lg mb-5 bg-gray-200 flex flex-col">
            {children}
        </div>
    );
}