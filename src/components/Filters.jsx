import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

const Filters = () => {
  // Dummy data for filters - this will be replaced with dynamic data later
  const brands = ["Apple", "Samsung", "Sony", "LG"];
  const priceRanges = [
    { value: "0-100", label: "$0 - $100" },
    { value: "100-500", label: "$100 - $500" },
    { value: "500-1000", label: "$500 - $1000" },
    { value: "1000+", label: "Over $1000" },
  ];
  const ratings = [5, 4, 3, 2, 1];

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold mb-4">Filters</h3>
      <Accordion type="multiple" defaultValue={["price", "brands"]}>
        <AccordionItem value="price">
          <AccordionTrigger>Price</AccordionTrigger>
          <AccordionContent>
            <RadioGroup>
              {priceRanges.map((range) => (
                <div key={range.value} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={range.value}
                    id={`price-${range.value}`}
                  />
                  <Label htmlFor={`price-${range.value}`}>{range.label}</Label>
                </div>
              ))}
            </RadioGroup>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="brands">
          <AccordionTrigger>Brands</AccordionTrigger>
          <AccordionContent>
            {brands.map((brand) => (
              <div key={brand} className="flex items-center space-x-2 mb-2">
                <Checkbox id={`brand-${brand}`} />
                <Label htmlFor={`brand-${brand}`}>{brand}</Label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="rating">
          <AccordionTrigger>Rating</AccordionTrigger>
          <AccordionContent>
            <RadioGroup>
              {ratings.map((rating) => (
                <div key={rating} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={rating.toString()}
                    id={`rating-${rating}`}
                  />
                  <Label htmlFor={`rating-${rating}`}>{rating} & up</Label>
                </div>
              ))}
            </RadioGroup>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Filters;
