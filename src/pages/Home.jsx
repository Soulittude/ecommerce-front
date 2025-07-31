import { useProducts } from "../hooks/queries";
import ProductCarousel from "../components/ProductCarousel";
import Banner from "../components/Banner";
import BannerLine from "../components/BannerLine";
import { HeroCarousel } from "../components/HeroCarousel";

export default function Home() {
  const { data: products = [], isLoading, isError } = useProducts();

  const carouselItems = [
    {
      imageUrl: "https://i.postimg.cc/tgCLc6d5/resim-2025-07-31-041647902.png",
      altText: "Sale 1",
      link: "/products?category=sale",
    },
    {
      imageUrl:
        "https://i.postimg.cc/G2Rsrc2q/horizontal-sale-banner-template-23-2148897327.avif",
      altText: "New Arrivals",
      link: "/products?category=new",
    },
    {
      imageUrl:
        "https://i.postimg.cc/FszkhCr5/flat-horizontal-banner-template-black-friday-sales-23-2150898106.avif",
      altText: "Best Sellers",
      link: "/products?category=best-sellers",
    },
  ];

  return (
    <main className="py-6 mx-auto max-w-screen-xl">
      <div className="mb-8 w-3/5 mx-auto">
        <HeroCarousel items={carouselItems} />
      </div>
      <ProductCarousel
        title="Featured Products"
        products={products}
        isLoading={isLoading}
        isError={isError}
      />
      <BannerLine>
        <Banner
          imageUrl="https://via.placeholder.com/600x200"
          altText="Banner 1"
          link="#"
        />
        <Banner
          imageUrl="https://via.placeholder.com/600x200"
          altText="Banner 2"
          link="#"
        />
      </BannerLine>
      <ProductCarousel
        title="New Arrivals"
        products={products}
        isLoading={isLoading}
        isError={isError}
      />
      <BannerLine>
        <Banner
          imageUrl="https://via.placeholder.com/600x200"
          altText="Banner 3"
          link="#"
        />
        <Banner
          imageUrl="https://via.placeholder.com/600x200"
          altText="Banner 4"
          link="#"
        />
        <Banner
          imageUrl="https://via.placeholder.com/600x200"
          altText="Banner 5"
          link="#"
        />
      </BannerLine>
    </main>
  );
}
