interface IProps {
    onHomeClicked: () => void;
    onNotHomeClicked: () => void;
    onFarFromHomeClicked: () => void;
}

export function TopNavigation({ onHomeClicked, onNotHomeClicked, onFarFromHomeClicked }: IProps) {
    return <div className="flex p-8">
        <button onClick={onHomeClicked} className="bg-white py-2 px-4 mx-2 rounded-lg hover:bg-slate-500">
            Home
        </button>
        <button onClick={onNotHomeClicked} className="bg-white py-2 px-4 mx-2 rounded-lg hover:bg-slate-500">
            Not Home
        </button>
        <button onClick={onFarFromHomeClicked} className="bg-white py-2 px-4 mx-2 rounded-lg hover:bg-slate-500">
            Far from Home
        </button>
    </div>;
}