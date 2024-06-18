import { redirect } from "next/navigation";
import Link from "next/link";
import { z } from "zod";
import { User } from "@/db/models/user.model";
import { comparePassword, signToken } from "@/helpers/utils";
import { cookies } from "next/headers";

export type PageProps = {
  params: {};
  searchParams: { ok: "false" | "true"; message: string };
};

export default function LoginPage({ params, searchParams }: PageProps) {
  const login = async (formData: FormData) => {
    "use server";

    const body = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    console.log(formData);

    const loginSchema = z.object({
      email: z
        .string({ message: "email required" })
        .email({ message: "Invalid email format" }),
      password: z.string({ message: "password required" }),
    });

    const { error, data } = await loginSchema.safeParseAsync(body);
    // const { email, password } = await loginSchema.parseAsync(body);
    if (error) {
      redirect("/login?ok=false&message=" + error.errors[0].message);
    }

    const user = await User.findByEmail(data.email);
    if (!user) {
      redirect("/login?ok=false&message=Invalid email/password");
    }

    const isPasswordValid = comparePassword(data.password, user.password);
    if (!isPasswordValid) {
      redirect("/login?ok=false&message=Invalid email/password");
    }

    const access_token = signToken({ _id: user._id });

    const cookieStore = cookies();

    cookieStore.set({
      name: "Authorization",
      value: `Bearer ${access_token}`,
      httpOnly: true,
      path: "/",
    });

    redirect("/products");
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-4 text-center text-3xl font-extrabold text-gray-900">
            Masuk ke akun Anda
          </h2>
          {searchParams.ok === "false" && (
            <h5 className="text-red-500 text-xl text-center">
              {searchParams.message}
            </h5>
          )}
        </div>
        <form className="mt-2 space-y-4" action={login}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                autoComplete="email"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Kata sandi"
              />
            </div>
          </div>

          <div className="flex items-start mb-5">
            <div className="flex items-center h-5">
              <input
                id="remember"
                name="remember"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
            </div>
            <label
              htmlFor="remember"
              className="ml-2 text-sm font-medium text-gray-900"
            >
              Remember me
            </label>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-black hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Masuk
            </button>
          </div>
        </form>

        <div className="text-center mt-2">
          <p className="text-sm text-gray-600">
            Tidak punya akun?
            <Link
              href="/register"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Daftar
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
