const CloseIcon: React.FC<{ active: boolean }> = ({ active }) => {
    return active ? (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="8" fill="#FF5F56" />
            <path
                d="M5 5L11 11M11 5L5 11"
                stroke="black"
                strokeWidth="1.5"
                strokeLinecap="round"
            />
        </svg>
    ) : (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="8" fill="#FF5F56" />
        </svg>
    );
};

const MinimizeIcon: React.FC<{ active: boolean }> = ({ active }) => {
    return active ? (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="8" fill="#FFBD2E" />
            <rect
                x="4"
                y="7.25"
                width="8"
                height="1.5"
                fill="black"
                rx="0.75"
            />
        </svg>
    ) : (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="8" fill="#FFBD2E" />
        </svg>
    );
};

const MaximizeIcon: React.FC<{ active: boolean }> = ({ active }) => {
    return active ? (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="8" fill="#27C93F" />
            <path
                d="M5 5H11V11H5V5Z"
                fill="none"
                stroke="black"
                strokeWidth="1.5"
            />
        </svg>
    ) : (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="8" fill="#27C93F" />
        </svg>
    );
};

export const TitleBarIcons = {
    close: CloseIcon,
    minimize: MinimizeIcon,
    maximize: MaximizeIcon,
};
