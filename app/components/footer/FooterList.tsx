interface FooterListProps {
  children: React.ReactElement[];
}

const FooterList: React.FC<FooterListProps> = ({ children }) => {
  return (
    <div className="md:1/4 mb-6 flex w-full flex-col gap-2 sm:w-1/2 lg:w-1/6">
      {children}
    </div>
  );
};

export default FooterList;
