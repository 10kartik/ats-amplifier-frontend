import AtsForm from "../pages/AtsForm";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
      <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 dark:from-purple-300 dark:via-pink-400 dark:to-red-400">
        ATS Hacker
      </h1>
      {/* call component named ats-form */}
      <AtsForm />
      {/* Add a footer here */}
      <footer className="text-center text-white text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 animate-pulse">
        <p>Developed by KK</p>
      </footer>
    </main>
  );
}
