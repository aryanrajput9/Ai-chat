import { Link } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";
import { ROUTES } from "../../constant";

const NotFound = () => {
    return (
        <div className="min-h-screen bg-[#08090a] text-white flex items-center justify-center px-6">
            <div className="text-center max-w-lg">

                <h1 className="text-[120px] leading-none font-bold text-lime-400">
                    404
                </h1>

                <h2 className="text-3xl font-semibold mt-4">
                    Page not found
                </h2>

                <p className="text-gray-400 mt-3">
                    The page you're looking for doesn't exist or may have
                    been moved.
                </p>

                <div className="flex justify-center gap-3 mt-8">

                    <Link
                        to={ROUTES.HOME}
                        className="flex items-center gap-2 px-5 py-3 rounded-xl bg-lime-400 text-black font-semibold"
                    >
                        <Home size={18} />
                        Go Home
                    </Link>

                    <button
                        onClick={() => window.history.back()}
                        className="flex items-center gap-2 px-5 py-3 rounded-xl border border-white/10 bg-white/5"
                    >
                        <ArrowLeft size={18} />
                        Go Back
                    </button>

                </div>
            </div>
        </div>
    );
};

export default NotFound;