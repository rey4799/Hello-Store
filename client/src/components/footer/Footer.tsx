import Link from "next/link";
import Container from "../Container";
import FooterList from "./FooterList";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import Image from "next/image";

const Footer = () => {
  return (
    <footer
      className="bg-gradient-to-b
      from-slate-100 to-white mb-8
  text-sm mt-16
  "
    >
      <Container>
        <div className="flex flex-col md:flex-row justify-between pt-16 pb-8">
          <div className="w-full md:w-1/3 bm-6 md:mb-0 ml-8">
            <Image
              src="/HELLO_logo.png"
              alt="Logo"
              width={100}
              height={100}
              className="object-contain"
            />
            <h3 className="text-base font-bold mb-2">
              Hello Store Apple Authorised Reseller
            </h3>
            <p>
              Hello adalah toko ritel Apple resmi (Apple Authorised Reseller)
              yang berdiri tahun 2022 dan merupakan bagian dari Grup PT Global
              Digital Niaga, Tbk (Blibli.com).
            </p>
            <h3 className="text-base font-bold mb-2">
              Layanan Pengaduan Konsumen
            </h3>
            <p>
              Direktorat Jenderal Perlindungan Konsumen dan Tertib Niaga
              Kementerian Perdagangan RI
            </p>
          </div>
          <FooterList>
            <h3 className="text-base font-bold mb-2">Produk</h3>
            <Link href="#">iPhone</Link>
            <Link href="#">iPad</Link>
            <Link href="#">Watch</Link>
            <Link href="#">Mac</Link>
            <Link href="#">Aksesoris</Link>
          </FooterList>
          <FooterList>
            <h3 className="text-base font-bold mb-2">Informasi</h3>
            <Link href="#">FAQ</Link>
            <Link href="#">Tentang Kami</Link>
          </FooterList>
          <FooterList>
            <h3 className="text-base font-bold mb-2">Layanan</h3>
            <Link href="#">Lacak Pesanan</Link>
            <Link href="#">Lokasi Toko</Link>
            <Link href="#">Kebijakan garansi</Link>
            <Link href="#">Hubungi Kami</Link>
          </FooterList>
          <FooterList>
            <h3 className="text-base font-bold mb-2">Ikuti Kami</h3>
            <div className="flex gap-2">
              <Link href="#">
                <FaFacebook size={25} />
              </Link>
              <FaInstagram size={25} />
            </div>
          </FooterList>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
