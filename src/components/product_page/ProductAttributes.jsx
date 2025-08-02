import {
  Table,
  TableBody,
  TableCell,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ProductAttributes = ({ attributes }) => {
  if (!attributes || attributes.length === 0) {
    return <p>No attributes to display.</p>;
  }

  return (
    <Table>
      <TableCaption>Product Specifications</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Attribute</TableHead>
          <TableHead>Value</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {attributes.map((attr, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{attr.name}</TableCell>
            <TableCell>{attr.value}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ProductAttributes;
