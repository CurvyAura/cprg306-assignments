import NewItem from './new-item';

export default function Page() {
    return (
        <main className="bg-black min-h-screen p-4">
            <h1 className="text-white text-2xl font-bold mb-4">NewItem Component</h1>
            <NewItem />
        </main>
    );
}