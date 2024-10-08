import Image from "next/image";
import Link from "next/link";
import logo from "@/public/images/logo.png";

export default function Footer() {
  return (
    <footer className="py-10 text-white border-t-2 border-gray-500 bg-primary px-[10%] max-md:px-[2%]">
      <div className="container flex justify-between items-start flex-wrap  max-md:gap-5 gap-3">
        <Image className="w-[100px] h-auto" src={logo} width={420} height={381} alt="Logo Sapatem" />
        <div>
          <h3 className="font-bold text-[20px] max-md:text-[16px]">Menu</h3>
          <ul className="text-lighting">
            <li>
              <a href="/#sapatos" className="hover:brightness-75 max-md:text-[14px]">
                Sapatos
              </a>
            </li>
            <li>
              <a href="/#carteiras" className="hover:brightness-75 max-md:text-[14px]">
                Carteiras
              </a>
            </li>
            <li>
              <a href="/#cintos" className="hover:brightness-75 max-md:text-[14px]">
                Cintos
              </a>
            </li>
            <li>
              <a href="/admin" className="hover:brightness-75 max-md:text-[14px]">
                Administrador
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-[20px] max-md:text-[16px]">Redes Sociais</h3>
          <ul className="text-lighting">
            <li>
              <Link
                href="https://twitter.com/sapatem"
                target="_blank"
                className="hover:brightness-75 max-md:text-[14px]"
              >
                Twitter
              </Link>
            </li>
            <li>
              <Link
                href="https://www.facebook.com/sapatem"
                target="_blank"
                className="hover:brightness-75 max-md:text-[14px]"
              >
                Facebook
              </Link>
            </li>
            <li>
              <Link
                href="https://www.instagram.com/sapatem/"
                target="_blank"
                className="hover:brightness-75 max-md:text-[14px]"
              >
                Instagram
              </Link>
            </li>
            <li>
              <Link
                href="https://linkedin.com/in/sapatem/"
                target="_blank"
                className="hover:brightness-75 max-md:text-[14px]"
              >
                Linked-in
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <p className="text-white text-center mt-[15px] max-md:text-[14px]">{`Sapatem © ${new Date().getFullYear()} - Alguns direitos reservados.`}</p>
    </footer>
  );
}
