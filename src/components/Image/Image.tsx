import srcImage from "../../assets/avatar.png";

type Props = {
  src: string | undefined;
  alt: string;
  title?: string;
  height?: string;
  width?: string;
  borderRadius?: string;
};

const Image = ({
  src,
  alt,
  title = "Image",
  height = "100px",
  width = "100px",
  borderRadius,
}: Props) => {
  return (
    <img
      src={src || srcImage}
      alt={alt}
      title={title}
      style={{ width, height, borderRadius }}
    />
  );
};

export default Image;
