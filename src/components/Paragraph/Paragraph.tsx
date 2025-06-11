import styles from "./Paragraph.module.scss";

type Props = {
  text: string | undefined;
  fontSize?: number;
  fontWeight?: number;
  color?: string;
};

const Paragraph = ({ text, fontSize = 16, fontWeight = 200, color = "#4f4e4e" }: Props) => (
  <p
    className={styles.paragraph}
    style={{
      fontSize,
      fontWeight,
      color,
    }}
  >
    {text}
  </p>
);

export default Paragraph;
