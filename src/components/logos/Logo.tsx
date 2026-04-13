import { Link } from "react-router";

function Logo() {
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div>
      <Link
        to={"/"}
        onClick={scrollTop}
        className="ml-4 text-xl md:text-2xl font-bold "
      >
        <span className="text-emerald-600">Park</span>
        <span className="text-slate-800">Slot</span>
        <span className="text-emerald-700">Pilot</span>
      </Link>
    </div>
  );
}

export default Logo;
