import Image from "next/image";

import { FaUserCircle } from "react-icons/fa";

interface AvatarProps {
  src?: string | null;
}

const Avatar: React.FC<AvatarProps> = ({ src }) => {
  if (src) {
    return (
      <Image
        src={src}
        width={30}
        height={30}
        alt="avatar"
        className="rounded-full"
      />
    );
  }
  return <FaUserCircle size={24} />;
};

export default Avatar;
