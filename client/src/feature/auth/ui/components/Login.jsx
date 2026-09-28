import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthHook } from "../../hook/authHook";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useAuthHook()


    const HandleFormData = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const data = {
            email: formData.get("email"),
            password: formData.get("password")
        };

        try {
            const resp = await login(data)
            console.log(resp)
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className="min-h-screen bg-[#090B09] text-white flex items-center justify-center px-4 py-10 relative overflow-hidden">

            {/* Background Glow */}
            <div className="absolute -top-40 -right-40 w-[450px] h-[450px] rounded-full bg-[#2F7D32]/10 blur-[130px]" />
            <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-[#72A85A]/5 blur-[120px]" />

            <div className="relative w-full max-w-md">

                {/* Logo + Heading */}
                <div className="text-center mb-7">

                    <div
                        className="
                            inline-flex
                            w-12 h-12
                            items-center justify-center
                            rounded-2xl
                            bg-gradient-to-br from-[#9ACF75] to-[#2F7D32]
                            text-black
                            font-black
                            text-xl
                            shadow-[0_8px_30px_rgba(114,168,90,0.18)]
                            mb-5
                        "
                    >
                        AI
                    </div>

                    <h1 className="text-3xl font-semibold tracking-tight text-gray-100">
                        Welcome{" "}
                        <span className="text-[#72A85A]">
                            back
                        </span>
                    </h1>

                    <p className="text-gray-500 text-sm mt-2">
                        Sign in to continue to your account
                    </p>

                </div>


                {/* Login Card */}
                <div
                    className="
                        bg-[#111511]
                        border border-white/[0.07]
                        rounded-2xl
                        p-6
                        shadow-[0_25px_80px_rgba(0,0,0,0.5)]
                    "
                >

                    <form onSubmit={HandleFormData} className="space-y-5">

                        {/* Email */}
                        <div>

                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Email address
                            </label>

                            <div className="relative">

                                <Mail
                                    size={17}
                                    className="
                                        absolute
                                        left-4
                                        top-1/2
                                        -translate-y-1/2
                                        text-gray-600
                                    "
                                />

                                <input
                                    type="email"
                                    required
                                    name="email"
                                    placeholder="you@example.com"
                                    className="
                                        w-full
                                        h-12
                                        bg-[#181C18]
                                        border border-white/[0.08]
                                        rounded-xl
                                        pl-11
                                        pr-4
                                        text-sm
                                        text-gray-200
                                        outline-none
                                        placeholder:text-gray-600
                                        transition-all
                                        hover:border-white/[0.14]
                                        focus:border-[#72A85A]/60
                                        focus:ring-1
                                        focus:ring-[#72A85A]/15
                                    "
                                />

                            </div>

                        </div>


                        {/* Password */}
                        <div>

                            <div className="flex justify-between items-center mb-2">

                                <label className="text-sm font-medium text-gray-300">
                                    Password
                                </label>

                                <Link
                                    to="/forgot-password"
                                    className="
                                        text-xs
                                        text-[#72A85A]
                                        hover:text-[#9ACF75]
                                        transition
                                    "
                                >
                                    Forgot password?
                                </Link>

                            </div>

                            <div className="relative">

                                <Lock
                                    size={17}
                                    className="
                                        absolute
                                        left-4
                                        top-1/2
                                        -translate-y-1/2
                                        text-gray-600
                                    "
                                />

                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    name="password"
                                    placeholder="Enter your password"
                                    className="
                                        w-full
                                        h-12
                                        bg-[#181C18]
                                        border border-white/[0.08]
                                        rounded-xl
                                        pl-11
                                        pr-12
                                        text-sm
                                        text-gray-200
                                        outline-none
                                        placeholder:text-gray-600
                                        transition-all
                                        hover:border-white/[0.14]
                                        focus:border-[#72A85A]/60
                                        focus:ring-1
                                        focus:ring-[#72A85A]/15
                                    "
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="
                                        absolute
                                        right-4
                                        top-1/2
                                        -translate-y-1/2
                                        text-gray-600
                                        hover:text-[#9ACF75]
                                        transition
                                    "
                                >
                                    {showPassword ? (
                                        <EyeOff size={17} />
                                    ) : (
                                        <Eye size={17} />
                                    )}
                                </button>

                            </div>

                        </div>





                        {/* Button */}
                        <button
                            type="submit"
                            className="
                                w-full
                                h-12
                                rounded-xl
                                flex
                                items-center
                                justify-center
                                gap-2
                                font-semibold
                                text-sm
                                text-[#071006]
                                bg-gradient-to-r
                                from-[#9ACF75]
                                via-[#72A85A]
                                to-[#4F913F]
                                hover:from-[#A8DA84]
                                hover:via-[#7DBD65]
                                hover:to-[#5BA44A]
                                shadow-[0_8px_30px_rgba(114,168,90,0.16)]
                                hover:shadow-[0_8px_35px_rgba(114,168,90,0.25)]
                                transition-all
                                active:scale-[0.99]
                            "
                        >
                            Sign in
                            <ArrowRight size={17} />
                        </button>

                    </form>


                    {/* Register */}
                    <div className="mt-6 pt-6 border-t border-white/[0.07] text-center">

                        <p className="text-sm text-gray-500">

                            Don't have an account?{" "}

                            <Link
                                to="/register"
                                className="
                                    text-[#72A85A]
                                    hover:text-[#9ACF75]
                                    font-medium
                                    transition
                                "
                            >
                                Create account
                            </Link>

                        </p>

                    </div>

                </div>


                {/* Footer */}
                <p className="text-center text-[11px] text-gray-600 mt-5">
                    Secure authentication • Your data stays private
                </p>

            </div>
        </div>
    );
};

export default Login;