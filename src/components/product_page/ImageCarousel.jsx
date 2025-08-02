import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const ImageCarousel = ({ images }) => {
  const [api, setApi] = useState(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  const handleThumbnailClick = (index) => {
    api?.scrollTo(index);
  };

  return (
    <div>
      <Carousel setApi={setApi} className="w-full max-w-lg">
        <CarouselContent>
          {images?.map((image, index) => (
            <CarouselItem key={index}>
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-0">
                  <img
                    src={image}
                    alt={`Product image ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="flex gap-2 justify-center mt-4">
        {images?.map((image, index) => (
          <button
            key={index}
            onClick={() => handleThumbnailClick(index)}
            className="w-16 h-16"
          >
            <img
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className={`w-full h-full object-cover rounded-md cursor-pointer ${index === current ? "border-2 border-primary" : "opacity-50"}`}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
