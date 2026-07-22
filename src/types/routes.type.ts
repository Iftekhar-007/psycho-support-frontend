export type Route = {
  title: string;
  items: {
    title: string;
    url: string;
    isActive?: boolean;
    icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  }[];
};
