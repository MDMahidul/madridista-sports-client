import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

type TBreadcrumbItemProps = {
  label: string;
  href?: string;
  isCurrentPage?: boolean;
};

type TBreadcrumbProps = {
  items: TBreadcrumbItemProps[];
};

const BreadcrumbComponent = ({ items }: TBreadcrumbProps) => {
  return (
    <Breadcrumb>
      <BreadcrumbList className="mb-10 font-semibold text-primary capitalize">
        {items?.map((item, index) => (
          <BreadcrumbItem key={index}>
            {item.isCurrentPage ? (
              <BreadcrumbPage className="text-gray-500 font-semibold">{item.label}</BreadcrumbPage>
            ) : (
              <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
            )}
            {index < items.length - 1 && <BreadcrumbSeparator />}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbComponent;
