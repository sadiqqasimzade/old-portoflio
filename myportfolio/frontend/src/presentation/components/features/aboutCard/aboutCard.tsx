type Props = {
  title: string,
  desc: string,
  file_path: string
}
export default function Feature({ title, desc, file_path }: Props) {
  return (
    <div className="about">
      <div className="about--inner">
        <div className="about--header">
          <img
            className="about--header--img white-filter"
            src={"/images/" + file_path}
            alt='feature'
          ></img>
          <p className="about--body--title">{title}</p>
        </div>
        <div className="about--body">
          <p className="about--body--desc">{desc.split("\n").map((line, i) => <span key={i}>{line.replace("\\n", '')}<br /></span>)}</p>
        </div>
      </div>
    </div>
  );
}