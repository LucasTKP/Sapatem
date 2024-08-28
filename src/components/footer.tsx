import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/images/logo.png";

export default function Footer() {
  return (
    <footer className="py-10 text-white border-t-2 border-gray-500 bg-primary px-[10%]">
      <div className="container flex justify-between flex-wrap  max-md:gap-5 gap-3">
        <Image className="w-[100px] h-full" src={Logo} alt="Logo 2Core" />
        <div>
          <h3 className="font-bold text-[20px]">Menu</h3>
          <ul className="text-lighting">
            <li>
              <a href="/#services" className="hover:brightness-75">
                Sapatos
              </a>
            </li>
            <li>
              <a href="/#diffs" className="hover:brightness-75">
                Carteiras
              </a>
            </li>
            <li>
              <a href="/#blog" className="hover:brightness-75">
                Cintos
              </a>
            </li>
            <li>
              <a href="/#contato" className="hover:brightness-75">
                Administrador
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-[20px]">Redes Sociais</h3>
          <ul className="text-lighting">
            <li>
              <Link
                href="https://twitter.com/sapatem"
                target="_blank"
                className="hover:brightness-75"
              >
                Twitter
              </Link>
            </li>
            <li>
              <Link
                href="https://www.facebook.com/sapatem"
                target="_blank"
                className="hover:brightness-75"
              >
                Facebook
              </Link>
            </li>
            <li>
              <Link
                href="https://www.instagram.com/sapatem/"
                target="_blank"
                className="hover:brightness-75"
              >
                Instagram
              </Link>
            </li>
            <li>
              <Link
                href="https://linkedin.com/in/sapatem/"
                target="_blank"
                className="hover:brightness-75"
              >
                Linked-in
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <p className="text-white text-center mt-[15px]">{`Sapatem © ${new Date().getFullYear()} - Alguns direitos reservados.`}</p>
    </footer>
  );
}
