function App() {
    const changeBackground = () => {
        const root = document.getElementById("root");
        if (root) {
            root.style.backgroundColor = "lightblue";
        }
    };

    return (
        <button
            onClick={changeBackground}
            className="px-4 py-2 bg-gray-800 text-white rounded"
        >
            Изменить фон root
        </button>
    );
}

export default App;

