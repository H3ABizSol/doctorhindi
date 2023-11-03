import "./style.scss";
const Live = ({ live }: any) => {
  return (
    <div className="live-wrapper">
      <div className="container">
        <div className="left">
          <figure>
            <img src={`/uploads/${live?.image}`} alt="" />
          </figure>
          <div>
            <h2>Questions? Dr. Tom answers them LIVE!</h2>
            <p>{live?.title}</p>
            <div className="link-wrapper">
              {live &&
                live.link?.map((l: any) => {
                  return <a href={l}>{l}</a>;
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Live;
