import FeaturedProducts from "@/components/FeaturedProducts";
import Container from "../components/Container";
import HomeBanner from "../components/HomeBanner";

export default function Home() {
  return (
    <main>
      <Container>
        <div>
          <HomeBanner />
          <FeaturedProducts />
        </div>
      </Container>
    </main>
  );
}
