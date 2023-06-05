import Follower from "./follower";

export default function Requests(props) {
  return (
    <article id="requests">
      {props.requestsSection &&
        props.followers.map((item) => {
          if (
            item.state === "request" &&
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
                renderManage={true}
              />
            );
          }
        })}
    </article>
  );
}
