import { redirect } from "next/navigation";
import Link from "next/link";

export type PageProps = {
  params: {};
  searchParams: { ok?: "false" | "true"; message?: string };
};

export default function Register({ params, searchParams }: PageProps) {
  async function handleRegister(formData: FormData) {
    "use server";

    const rawFormData = {
      name: formData.get("name"),
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/register`,
      {
        method: "post",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(rawFormData),
      }
    );

    const result = await response.json();

    if (result.success) {
      redirect("/login");
    } else {
      redirect(`/register?ok=false&message=${result.message}`);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-4 text-center text-3xl font-extrabold text-gray-900">
            Daftar di Hello
          </h2>
        </div>
        {searchParams.ok === "false" && searchParams.message && (
          <div className="text-red-500 text-center">{searchParams.message}</div>
        )}
        <form className="mt-2 space-y-4" action={handleRegister} method="post">
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="name" className="sr-only">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Nama lengkap"
              />
            </div>
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Username"
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
          <div className="mt-2">
            <label>
              <input type="checkbox" required />
              <span>
                Dengan mencentang ini, kamu menyetujui{" "}
                <span className="text-blue-600">Syarat & Ketentuan</span> kami.
              </span>
            </label>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-black hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Daftar
            </button>
          </div>
        </form>

        <div className="text-center mt-2">
          <p className="text-sm text-gray-600">
            Sudah terdaftar?
            <Link
              href="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Masuk
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
