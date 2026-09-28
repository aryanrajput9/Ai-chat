import { User, Mail, Lock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthHook } from "../../hook/authHook";
import { toast } from "react-toastify";

const Register = () => {



    const { register } = useAuthHook()

    const HandleFormData = async (e) => {

        e.preventDefault();

        const formData = new FormData(e.target);

        const password = formData.get("password");
        const confirmPassword = formData.get("confirmPassword");

        if (password !== confirmPassword) {
            return toast.warning("password not match")
        }

        const data = {
            username: formData.get("username"),
            email: formData.get("email"),
            password: formData.get("password"),
            avatar: formData.get("avatar")
        };

        try {

            const resp = await register(data)

            e.target.reset();

            return resp
        } catch (error) {

            console.log("LOGIN ERROR", error);
        }

    }

    return (
        <div className="min-h-screen bg-[#0b0d0e] text-gray-200 flex items-center justify-center px-4 py-8">

            <div className="w-full max-w-xl">

                {/* Header */}
                <div className="text-center mb-6">

                    <div className="
                        inline-flex items-center justify-center
                        w-11 h-11
                        rounded-xl
                        bg-[#A3FF3D]
                        text-black
                        font-black
                        text-lg
                        mb-4
                        shadow-[0_0_25px_rgba(163,255,61,0.12)]
                    ">
                        AI
                    </div>

                    <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-gray-100">
                        Create your{" "}
                        <span className="text-[#A3FF3D]">
                            account
                        </span>
                    </h1>

                    <p className="text-gray-500 mt-2 text-sm">
                        Start your journey with your AI assistant.
                    </p>

                </div>


                {/* Card */}
                <div className="
                    bg-[#151718]
                    border border-white/[0.08]
                    rounded-2xl
                    p-5 sm:p-6
                    shadow-[0_25px_70px_rgba(0,0,0,0.45)]
                ">

                    <form
                        onSubmit={HandleFormData}
                        className="space-y-4"
                    >

                        {/* Name + Email */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                            {/* Username */}
                            <div>
                                <label className="block text-xs font-medium text-gray-400 mb-1.5">
                                    Full name
                                </label>

                                <div className="relative">

                                    <User
                                        size={16}
                                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600"
                                    />

                                    <input
                                        type="text"
                                        name="username"
                                        required
                                        placeholder="Your full name"
                                        className="
                                            w-full h-11
                                            bg-[#1b1d1e]
                                            border border-white/[0.08]
                                            rounded-lg
                                            pl-10 pr-3
                                            text-sm
                                            text-gray-200
                                            outline-none
                                            placeholder:text-gray-600
                                            transition
                                            hover:border-white/[0.15]
                                            focus:border-[#A3FF3D]/50
                                            focus:ring-1
                                            focus:ring-[#A3FF3D]/15
                                        "
                                    />

                                </div>
                            </div>


                            {/* Email */}
                            <div>
                                <label className="block text-xs font-medium text-gray-400 mb-1.5">
                                    Email address
                                </label>

                                <div className="relative">

                                    <Mail
                                        size={16}
                                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600"
                                    />

                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        placeholder="you@example.com"
                                        className="
                                            w-full h-11
                                            bg-[#1b1d1e]
                                            border border-white/[0.08]
                                            rounded-lg
                                            pl-10 pr-3
                                            text-sm
                                            text-gray-200
                                            outline-none
                                            placeholder:text-gray-600
                                            transition
                                            hover:border-white/[0.15]
                                            focus:border-[#A3FF3D]/50
                                            focus:ring-1
                                            focus:ring-[#A3FF3D]/15
                                        "
                                    />

                                </div>
                            </div>

                        </div>


                        {/* Password + Confirm */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                            {/* Password */}
                            <div>
                                <label className="block text-xs font-medium text-gray-400 mb-1.5">
                                    Password
                                </label>

                                <div className="relative">

                                    <Lock
                                        size={16}
                                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600"
                                    />

                                    <input
                                        type="password"
                                        name="password"
                                        required
                                        minLength={8}
                                        placeholder="Create password"
                                        className="
                                            w-full h-11
                                            bg-[#1b1d1e]
                                            border border-white/[0.08]
                                            rounded-lg
                                            pl-10 pr-3
                                            text-sm
                                            text-gray-200
                                            outline-none
                                            placeholder:text-gray-600
                                            transition
                                            hover:border-white/[0.15]
                                            focus:border-[#A3FF3D]/50
                                            focus:ring-1
                                            focus:ring-[#A3FF3D]/15
                                        "
                                    />

                                </div>
                            </div>


                            {/* Confirm */}
                            <div>
                                <label className="block text-xs font-medium text-gray-400 mb-1.5">
                                    Confirm password
                                </label>

                                <div className="relative">

                                    <Lock
                                        size={16}
                                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600"
                                    />

                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        required
                                        placeholder="Confirm password"
                                        className="
                                            w-full h-11
                                            bg-[#1b1d1e]
                                            border border-white/[0.08]
                                            rounded-lg
                                            pl-10 pr-3
                                            text-sm
                                            text-gray-200
                                            outline-none
                                            placeholder:text-gray-600
                                            transition
                                            hover:border-white/[0.15]
                                            focus:border-[#A3FF3D]/50
                                            focus:ring-1
                                            focus:ring-[#A3FF3D]/15
                                        "
                                    />

                                </div>
                            </div>

                        </div>


                        {/* Avatar */}
                        <div>
                            <label className="block text-xs font-medium text-gray-400 mb-1.5">
                                Avatar URL{" "}
                                <span className="text-gray-600">
                                    (Optional)
                                </span>
                            </label>

                            <div className="relative">
                                <User
                                    size={16}
                                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600"
                                />

                                <input
                                    type="url"
                                    name="avatar"
                                    placeholder="https://example.com/avatar.jpg"
                                    className="
                w-full h-11
                bg-[#1b1d1e]
                border border-white/[0.08]
                rounded-lg
                pl-10 pr-3
                text-sm
                text-gray-200
                outline-none
                placeholder:text-gray-600
                transition
                hover:border-white/[0.15]
                focus:border-[#A3FF3D]/50
                focus:ring-1
                focus:ring-[#A3FF3D]/15
            "
                                />
                            </div>

                            <p className="text-[11px] text-gray-600 mt-1.5">
                                Add a direct image URL for your profile avatar.
                            </p>
                        </div>





                        {/* Button */}
                        <button
                            type="submit"
                            className="
                                w-full
                                h-11
                                flex items-center justify-center gap-2
                                rounded-lg
                                bg-[#A3FF3D]
                                text-black
                                font-semibold
                                text-sm
                                transition-all
                                hover:bg-[#B5FF66]
                                hover:shadow-[0_0_28px_rgba(163,255,61,0.18)]
                                active:scale-[0.99]
                            "
                        >
                            Create account
                            <ArrowRight size={16} />
                        </button>

                    </form>


                    {/* Bottom */}
                    <div className="
                        mt-5
                        pt-5
                        border-t border-white/[0.07]
                        text-center
                    ">

                        <p className="text-xs text-gray-500">
                            Already have an account?{" "}
                            <Link
                                to="/"
                                className="
                                    text-[#A3FF3D]
                                    hover:text-[#B5FF66]
                                    font-medium
                                    transition
                                "
                            >
                                Sign in
                            </Link>
                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Register;