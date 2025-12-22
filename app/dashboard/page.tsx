import Header from "./_components/Header";
import TodoSection from "./_components/TodoSection";

const Dashboard = () => {
  return (
    <div>
      <Header />
      <div className="min-h-screen">
        <h1 className="text-4xl font-bold text-center mt-10 bg-linear-to-r from-cyan-500 to-blue-500 text-transparent bg-clip-text">
          Welcome to Listify Dashboard
        </h1>
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-lg text-muted-foreground">
            Manage your tasks and to-do lists efficiently.
          </p>
        </div>
        <TodoSection />
      </div>
    </div>
  );
};

export default Dashboard;
