import { useState } from "react";
import Buttons from "./followersSectionSub/buttons";
import Requests from "./followersSectionSub/requests";
import Accepted from "./followersSectionSub/accepted";

export default function FollowersSection(props) {
  let followersStorage = window.localStorage.getItem("followers");
  const [requestsSection, setRequestsSection] = useState(true);

  return (
    <section id="following">
      <Buttons
        length={props.length}
        setRequestsSection={setRequestsSection}
        requestsSection={requestsSection}
      />

      <Requests
        requestsSection={requestsSection}
        followers={props.followers}
        setFollowers={props.setFollowers}
        browser={props.browser}
      />

      {!requestsSection &&
        JSON.parse(followersStorage).filter((item) => item.state === "accepted")
          .length === 0 && (
          <article id="no-followers">
            <img
              src="https://images.vexels.com/media/users/3/215471/isolated/preview/c949e9400d0724b68a17c8facaa193af-chill-laying-man-flat.png"
              width="60%"
            ></img>
            <div>No followers yet...</div>
            <div>Accept follow requests or find new friends yourself!</div>
          </article>
        )}

      {!requestsSection &&
        JSON.parse(followersStorage).filter((item) => item.state === "accepted")
          .length !== 0 && (
          <Accepted
            followers={props.followers}
            setFollowers={props.setFollowers}
            browser={props.browser}
          />
        )}
    </section>
  );
}
