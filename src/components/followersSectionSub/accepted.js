import Follower from "./follower";

export default function Accepted(props) {
  return (
    <article id="accepted">
      {props.followers.map((item) => {
        if (
          item.state === "accepted" &&
          item.username.toLowerCase().includes(props.browser.toLowerCase())
        ) {
          return (
            <Follower
              username={item.username}
              image={item.image}
              backgroundImage={item.backgroundImage}
              role={item.role}
              email={item.email}
              setFollowers={(value) => props.setFollowers(value)}
              followers={props.followers}
              key={Math.random()}
              renderManage={false}
            />
          );
        }
      })}
    </article>
  );
}
