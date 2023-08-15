type Props = {
  title: string,
  desc: string,
  file_path: string
}
import styles from '../../../pages/about/aboutPage.module.scss'
export default function Feature({ title, desc, file_path }: Props) {
  return (
    <div className={styles["about"]}>
      <div className={styles["about--inner"]}>
        <div className={styles["about--header"]}>
          <img
            className={styles["about--header--img"] + " white-filter"}
            src={file_path}
            alt='feature'
            width={24}
            height={24}
          />
          <p className={styles["about--body--title"]}>{title}</p>
        </div>
        <div className={styles["about--body"]}>
          <p className={styles["about--body--desc"]}>{desc.split("\n").map((line, i) => <span key={i}>{line.replace("\\n", '')}<br /></span>)}</p>
        </div>
      </div>
    </div>
  );
}