"use client"

interface MenutItemProps {
    onClick: () => void;
    label: string;
}


const MenuItem: React.FC<MenutItemProps> = ({ onClick, label }) => {
    return (
        <div onClick={onClick} className="px-4 py-3 transition font-semibold hover:bg-neutral-100">
            {label}
        </div>
    )
}

export default MenuItem
