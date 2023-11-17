import { useEffect, useState } from "react";
import eventsData from "../data/events";

interface Props {
    setSelectedCategory: React.Dispatch<React.SetStateAction<string | null>>;
    setActiveEvent: any;
}

function Search({ setSelectedCategory, setActiveEvent }: Props) {
    const categories = [
        'Israel',
        "Art",
        "Science",
        "Politics",
        "Religion",
        "Sports",
        'Military Conflict',
        'Cultural Movement',
        'Independence',
        'Space',
        'Archaeology',
        "Other",
    ];

    const [theme, setTheme] = useState("dark-theme");

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    const changeTheme = () => {
        if (theme === "light-theme") setTheme("dark-theme");
        else setTheme("light-theme");
    };

    return (
        <div className="flex gap-3 mb-4">
            <div className="w-full ">
                <select onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full rounded-md p-2 cursor-pointer border search-input">
                    <option value="">All</option>
                    {categories.map((category) => (
                        <option key={category} value={category} className="p-2">
                            {category}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex text-white gap-3">
                <input type="checkbox" hidden />
                <button className="border text-2xl rounded-md w-10 search-btn"
                    onClick={changeTheme}>
                    <i className="fa-regular fa-moon"></i>
                </button>
                <button className="border  text-2xl rounded-md w-10 search-btn"
                    onClick={() => setActiveEvent(eventsData[0])}>
                    <i className="fa-solid fa-earth-americas"></i>
                </button>
            </div>
        </div>
    );
}

export default Search;