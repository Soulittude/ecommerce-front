import { useProducts } from "../hooks/queries";
import ProductCarousel from "../components/ProductCarousel";
import Banner from "../components/Banner";
import BannerLine from "../components/BannerLine";
import { HeroCarousel } from "../components/HeroCarousel";
import { useSeoData } from "../hooks/useSeoData.js";
import Seo from "../components/Seo.jsx";

export default function Home() {
  const seoData = useSeoData("home");

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

  const bannerLines = [
    [
      {
        imageUrl:
          "https://i.postimg.cc/tgCLc6d5/resim-2025-07-31-041647902.png",
        altText: "Banner 1",
        link: "#",
      },
      {
        imageUrl:
          "https://i.postimg.cc/FszkhCr5/flat-horizontal-banner-template-black-friday-sales-23-2150898106.avif",
        altText: "Banner 2",
        link: "#",
      },
    ],
    [
      {
        imageUrl:
          "https://img.freepik.com/free-vector/flat-horizontal-sale-banner-template-with-photo_23-2149000923.jpg",
        altText: "Banner 3",
        link: "#",
      },
      {
        imageUrl:
          "https://www.shutterstock.com/shutterstock/photos/1350294860/display_1500/stock-vector-example-of-a-sales-sign-banner-with-a-discount-big-sale-banner-special-offer-1350294860.jpg",
        altText: "Banner 4",
        link: "#",
      },
      {
        imageUrl:
          "https://images.examples.com/wp-content/uploads/2018/05/Abstract-Mobile-Sale-Banner-Example.jpg",
        altText: "Banner 5",
        link: "#",
      },
    ],
  ];

  return (
    <>
      <div className="py-6 mx-auto max-w-screen-xl">
        <div className="mb-8 w-3/5 mx-auto">
          <HeroCarousel items={carouselItems} />
        </div>
        <div className="mb-8">
          <ProductCarousel
            title="Featured Products"
            products={products}
            isLoading={isLoading}
            isError={isError}
          />
        </div>
        <BannerLine className="h-48 mb-8">
          {bannerLines[0].map((banner, index) => (
            <Banner key={index} {...banner} />
          ))}
        </BannerLine>
        <div className="mb-8">
          <ProductCarousel
            title="New Arrivals"
            products={products}
            isLoading={isLoading}
            isError={isError}
          />
        </div>
        <BannerLine className="h-48">
          {bannerLines[1].map((banner, index) => (
            <Banner key={index} {...banner} />
          ))}
        </BannerLine>
        <Seo title={seoData.title} description={seoData.description} url="/" />
      </div>
    </>
  );
}
