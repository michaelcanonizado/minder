export type LinkItem = {
  name: string;
  href: string;
  icon?: React.ReactNode;
};
export type LinkItems = LinkItem[];

export type Period = 'weekly' | 'monthly' | 'yearly';
