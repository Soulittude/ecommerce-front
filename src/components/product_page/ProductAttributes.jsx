import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ProductAttributes = ({ attributes }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Attribute</TableHead>
          <TableHead>Value</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {attributes &&
          attributes.map((attr, index) => (
            <TableRow key={index}>
              <TableCell>{attr.name}</TableCell>
              <TableCell>{attr.value}</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default ProductAttributes;
