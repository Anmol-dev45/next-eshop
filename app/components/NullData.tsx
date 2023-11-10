interface NullDataProps {
  text: string;
}
const NullData: React.FC<NullDataProps> = ({ text }) => {
  return (
    <div className="w-full h-[50vh] flex items-center justify-center rext-xl md:text-2xl">
      <p className="font-medium">{text}</p>
    </div>
  );
};

export default NullData;
