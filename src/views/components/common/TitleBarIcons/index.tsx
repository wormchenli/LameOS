import { TitleBarIcons } from "@/os/resources/icons/TitleBarIcons";
import { useState } from "react";

export function TitleBarIconsComponent() {
    const [hovered, setHovered] = useState({
        close: false,
        minimize: false,
        maximize: false,
    });

    const handleMouseEnter = (icon: string) => {
        setHovered((prev) => ({ ...prev, [icon]: true }));
    };

    const handleMouseLeave = (icon: string) => {
        setHovered((prev) => ({ ...prev, [icon]: false }));
    };

    return (
        <div className="flex items-center justify-between h-full px-2 w-20">
            <div
                onMouseEnter={() => handleMouseEnter("close")}
                onMouseLeave={() => handleMouseLeave("close")}
            >
                <TitleBarIcons.close active={hovered.close} />
            </div>
            <div
                onMouseEnter={() => handleMouseEnter("minimize")}
                onMouseLeave={() => handleMouseLeave("minimize")}
            >
                <TitleBarIcons.minimize active={hovered.minimize} />
            </div>
            <div
                onMouseEnter={() => handleMouseEnter("maximize")}
                onMouseLeave={() => handleMouseLeave("maximize")}
            >
                <TitleBarIcons.maximize active={hovered.maximize} />
            </div>
        </div>
    );
}
