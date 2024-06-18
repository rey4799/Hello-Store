import Image from "next/image";

const HomeBanner = () => {
  return (
    <div
      className="relative bg-gradient-to-r
    from-sky-500 to-sky-700 mb-8"
    >
      <div className="mx-auto px-8 py-12 flex flex-column gap-2 md:flex-row items-center justify-evenly">
        <div className="mb-8 md:mb-0 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-pink-600 mb-4">
            Terjangkau.Andal.Begitu memukau
          </h1>
          <p className="text-lg md:text-xl mb-2">Apple watch SE 40mm</p>
          <p className="text-2xl md:text-5xl">
            kini hanya{" "}
            <span className="text-2xl md:text-5xl text-bold text-indigo-900">
              Rp 3.999.000
            </span>
          </p>
          <button className="mt-4 px-4 py-2 bg-slate-600 text-white rounded-full shadow-md hover:bg-slate-700 transition duration-300">
            Selengkapnya
          </button>
        </div>
        <div className="w-full md:w-1/3 relative">
          <Image
            src="/pngwing.com.png"
            alt="Banner Image"
            layout="responsive"
            width={600}
            height={400}
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;
