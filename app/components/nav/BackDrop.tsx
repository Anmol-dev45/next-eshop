interface BackDropProps {
  onClick: () => void;
}

const BackDrop: React.FC<BackDropProps> = ({ onClick }) => {
  return (
    <div
      className="z-20 bg-slate-200 opacity-50 w-screen h-screen fixed top-0 right-0"
      onClick={onClick}
    />
  );
};

export default BackDrop;
