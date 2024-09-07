"use client";
import Image from "next/image";

export default function MarketingPage() {
  return (
    <div class="bg-gradient-to-b from-green-50 to-green-100">
      <header class="">
        <div class="px-4 mx-auto sm:px-6 lg:px-8">
          <div class="flex items-center justify-between h-16 lg:h-20">
            <div class="flex-shrink-0">
              <a href="#" title="" class="flex">
                {/* <img class="w-auto h-8" src="https://cdn.rareblocks.xyz/collection/celebration/images/hero/2/logo.svg" alt="" /> */}
              </a>
            </div>

            <button
              type="button"
              class="inline-flex p-1 text-black transition-all duration-200 border border-black lg:hidden focus:bg-gray-100 hover:bg-gray-100"
            >
              {/* Menu open: "hidden", Menu closed: "block" */}
              <svg
                class="block w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>

              {/* < Menu open: "block", Menu closed: "hidden" > */}
              <svg
                class="hidden w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>

            <div class="hidden ml-auto lg:flex lg:items-center lg:justify-center lg:space-x-10">
              <a
                href="#"
                title=""
                class="text-base font-semibold text-black transition-all duration-200 hover:text-opacity-80"
              >
                {" "}
                Caracteristicas{" "}
              </a>

              <a
                href="#"
                title=""
                class="text-base font-semibold text-black transition-all duration-200 hover:text-opacity-80"
              >
                {" "}
                Soluciones{" "}
              </a>

              <a
                href="#"
                title=""
                class="text-base font-semibold text-black transition-all duration-200 hover:text-opacity-80"
              >
                {" "}
                Recursos{" "}
              </a>

              <a
                href="#"
                title=""
                class="text-base font-semibold text-black transition-all duration-200 hover:text-opacity-80"
              >
                {" "}
                Precios{" "}
              </a>

              <div class="w-px h-5 bg-black/20"></div>

              <a
                href="#"
                title=""
                class="text-base font-semibold text-black transition-all duration-200 hover:text-opacity-80"
              >
                {" "}
                Acceso{" "}
              </a>

            </div>
          </div>
        </div>
      </header>

      <section class="py-10 sm:py-16 lg:py-24">
        <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div class="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <h1 class="text-4xl font-bold text-black sm:text-6xl lg:text-7xl">
              Colaborar de forma remota, con
                <div class="relative inline-flex">
                  <span class="absolute inset-x-0 bottom-0 border-b-[30px] border-[#4aa8de]"></span>
                  <h1 class="relative text-4xl font-bold text-black sm:text-6xl lg:text-7xl">
                    Taks Master.
                  </h1>
                </div>
              </h1>

              <p class="mt-8 text-base text-black sm:text-xl">
                Con esta maravillosa herramienta podras tener
                tus actividades mas organizadas para una facil
                gestion.
              </p>

              <div class="mt-10 sm:flex sm:items-center sm:space-x-8">
                <a
                  href="#"
                  title=""
                  class="inline-flex items-center justify-center px-10 py-4 text-base font-semibold text-white transition-all duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-600"
                  role="button"
                >
                  {" "}
                  Start exploring{" "}
                </a>
              </div>
            </div>

            <div>
              {/* <img
                class="w-full"
                src="https://cdn.rareblocks.xyz/collection/celebration/images/hero/2/hero-img.png"
                alt=""
              /> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
