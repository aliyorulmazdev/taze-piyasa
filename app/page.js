import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[100dvh] px-4 md:px-6 py-12 md:py-24 lg:py-32">
      <div className="max-w-3xl text-center space-y-4 md:space-y-6">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
          Taze Piyasa'ya Hoş Geldiniz
        </h1>
        <p className="text-lg md:text-xl lg:text-lg text-gray-700 dark:text-gray-300 mb-6">
          İzmir Büyükşehir Belediyesi'nin sağladığı API noktası üzerinden
          eriştiğim fiyatları anında ve erişilebilir bir şekilde sergileyen
          projemi keşfedin. Next.js ile geliştirdiğim bu platformda, taze
          meyve, sebze ve ithal ürün fiyatlarını kolayca görüntüleyebilir,
          karşılaştırabilir ve takip edebilirsiniz.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 md:mt-12 w-full max-w-5xl">
        <Link
          className="group bg-white rounded-lg shadow-lg overflow-hidden transition-all hover:scale-[1.02] hover:shadow-xl dark:bg-gray-950"
          href="#"
        >
          <div className="aspect-square flex flex-col items-center justify-center p-8 space-y-4">
            <AppleIcon className="w-12 h-12 text-gray-900 group-hover:text-gray-700 dark:text-gray-50 dark:group-hover:text-gray-300" />
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 group-hover:text-gray-700 dark:text-gray-50 dark:group-hover:text-gray-300">
              Meyve
            </h2>
            <p className="text-gray-500 group-hover:text-gray-600 dark:text-gray-400 dark:group-hover:text-gray-300">
              Browse our selection of fresh fruits.
            </p>
          </div>
        </Link>
        <Link
          className="group bg-white rounded-lg shadow-lg overflow-hidden transition-all hover:scale-[1.02] hover:shadow-xl dark:bg-gray-950"
          href="#"
        >
          <div className="aspect-square flex flex-col items-center justify-center p-8 space-y-4">
            <CarrotIcon className="w-12 h-12 text-gray-900 group-hover:text-gray-700 dark:text-gray-50 dark:group-hover:text-gray-300" />
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 group-hover:text-gray-700 dark:text-gray-50 dark:group-hover:text-gray-300">
              Sebze
            </h2>
            <p className="text-gray-500 group-hover:text-gray-600 dark:text-gray-400 dark:group-hover:text-gray-300">
              Discover our selection of fresh vegetables.
            </p>
          </div>
        </Link>
        <Link
          className="group bg-white rounded-lg shadow-lg overflow-hidden transition-all hover:scale-[1.02] hover:shadow-xl dark:bg-gray-950"
          href="#"
        >
          <div className="aspect-square flex flex-col items-center justify-center p-8 space-y-4">
            <BoxIcon className="w-12 h-12 text-gray-900 group-hover:text-gray-700 dark:text-gray-50 dark:group-hover:text-gray-300" />
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 group-hover:text-gray-700 dark:text-gray-50 dark:group-hover:text-gray-300">
              İthal
            </h2>
            <p className="text-gray-500 group-hover:text-gray-600 dark:text-gray-400 dark:group-hover:text-gray-300">
              Explore our selection of imported goods.
            </p>
          </div>
        </Link>
      </div>
    </main>
  );
}

function AppleIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z" />
      <path d="M10 2c1 .5 2 2 2 5" />
    </svg>
  );
}

function BoxIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  );
}

function CarrotIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2.27 21.7s9.87-3.5 12.73-6.36a4.5 4.5 0 0 0-6.36-6.37C5.77 11.84 2.27 21.7 2.27 21.7zM8.64 14l-2.05-2.04M15.34 15l-2.46-2.46" />
      <path d="M22 9s-1.33-2-3.5-2C16.86 7 15 9 15 9s1.33 2 3.5 2S22 9 22 9z" />
      <path d="M15 2s-2 1.33-2 3.5S15 9 15 9s2-1.84 2-3.5C17 3.33 15 2 15 2z" />
    </svg>
  );
}
