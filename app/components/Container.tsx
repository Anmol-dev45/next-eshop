interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="xl:px mx-auto max-w-[1500px] px-4 md:px-2">{children}</div>
  );
};

export default Container;
