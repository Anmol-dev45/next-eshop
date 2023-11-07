import Image from "next/image";

const HomeBanner = () => {
  return (
    <section className="relative mb-8 bg-gradient-to-r from-sky-500 to-sky-700">
      <div className="mx-auto flex  flex-col items-center justify-evenly gap-8 px-8 py-12 md:flex-row">
        <div className="mb-8 text-center md:mb-0">
          <h1 className="mb-4 text-4xl font-bold text-white md:text-6xl">
            Summer Sale!
          </h1>
          <p className="mb-2 text-lg text-white md:text-xl ">
            Enjoy discount on selected items
          </p>
          <p className="text-2xl font-bold uppercase text-yellow-400 md:text-5xl">
            get 50% off
          </p>
        </div>
        <div className="relative aspect-video w-1/3">
          <Image
            fill
            priority
            src="/banner-image.png"
            alt="banner-image"
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default HomeBanner;
