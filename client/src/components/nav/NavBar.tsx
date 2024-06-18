import Link from "next/link";
import Container from "../Container";
import { FaShoppingBag, FaUser } from "react-icons/fa";
import ButtonLogout from "../ButtonLogout";
import { cookies } from "next/headers";
import SearchInput from "../searchInput";

const NavBar = () => {
  const cookieStore = cookies();
  const authorization = cookieStore.get("Authorization");

  return (
    <nav className="sticky top-0 w-full z-30 shadow-sm bg-white px-4 py-2">
      <Container>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-10">
            <Link href="/">
              <img
                src="https://www.hellostore.id/cdn/shop/files/HELLO_logo.svg?v=1678431581&width=50"
                width={60}
                height={30}
                alt="Picture of logo"
              />
            </Link>
            <ul className="hidden md:flex items-center gap-4 text-slate-500">
              <li>
                <Link href="/products">Belanja</Link>
              </li>
              <li>
                <Link href="#">Promo</Link>
              </li>
              <li>
                <Link href="#">Lokasi Toko</Link>
              </li>
              <li>
                <Link href="#">Lacak Pesanan</Link>
              </li>
            </ul>
          </div>
          <div className="flex items-center gap-4 md:gap-8">
            <SearchInput />
            <Link href="/wishlist" className="flex items-center">
              <FaShoppingBag size={22} />
            </Link>
            <Link href="/login" className="flex items-center">
              <FaUser size={22} />
            </Link>
            {authorization?.value ? <ButtonLogout /> : null}
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default NavBar;
