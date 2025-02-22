import { useTest } from "../hooks/use-test";

const YourComponent = () => {
    const { count, increment } = useTest();

    return (
        <div>
            <p>Count: {count}</p>
            <button
                className="bg-blue-500 text-white p-2 rounded-md"
                onClick={increment}
            >
                Increment
            </button>
        </div>
    );
};

export default YourComponent;
