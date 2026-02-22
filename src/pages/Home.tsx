import { Link } from "react-router";

function Home() {
  return (
    <section className="min-h-screen flex items-center justify-center">
      <article className="bg-white text-center px-10 py-10 rounded-md shadow-md">
        <h1 className="text-3xl mb-6">Parking space reservation</h1>
        <Link
          to={"/private/booking"}
          className="border-blue-600 px-6 py-4 rounded-md hover:bg-blue-600 hover:text-white"
        >
          Booking
        </Link>
      </article>
    </section>
  );
}

export default Home;
