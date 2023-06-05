import { useState, useEffect, useRef, useReducer } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./navbar.js";
import MainLeft from "./pages/main_left.js";
import NavbarBottom from "./components/navbar-bottom.js";
import "./styles/style.css";
import birdVideo from "./Images/birdVideo.mp4";
import dogVideo from "./Images/dog.mp4";
import carVideo from "./Images/car.mp4";
import owlVideo from "./Images/owl.mp4";
import partyVideo from "./Images/party.mp4";
import foodVideo from "./Images/food.mp4";
import duck from "./Images/duck.jpg";
import localforage from "localforage";
import MainRight from "./pages/main_right.js";

function reducer(state, action) {
  switch (action.type) {
    case "Feed":
      return { navigation: "feed" };
    case "Following":
      return { navigation: "following" };
    default:
      return { navigation: state.navigation };
  }
}

export default function Home() {
  const [state, dispatch] = useReducer(reducer, { navigation: "feed" });
  const location = useLocation();
  const leftMenu = useRef();
  const [homeTemporaryArray, setHomeTemporaryArray] = useState([]);
  const [updateHome, setUpdateHome] = useState(false);
  const [browser, setBrowser] = useState("");

  const users = [
    { image: duck, username: "rosydepending" },
    {
      image:
        "https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg",
      username: "tweetuphold",
    },
    {
      image:
        "https://pbs.twimg.com/media/FPsXAFAVcAIJWf4?format=jpg&name=900x900",
      username: "doubt_thrift",
    },
    {
      image:
        "https://avatars.mds.yandex.net/i?id=e67c20f98bdc512c5d3bc20c140f8fac-5719595-images-taas-consumers&n=27&h=480&w=480",
      username: "infinitechimpanzee",
    },
    {
      image:
        "https://www.arretsurimage.ma/wp-content/uploads/2020/07/A50-PORTRAITS-033-copie.jpg",
      username: "hamburgeratmosphere",
    },
    {
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/DALL-E_2_artificial_intelligence_digital_image_generated_photo.jpg/800px-DALL-E_2_artificial_intelligence_digital_image_generated_photo.jpg",
      username: "glory_carpet",
    },
  ];
  const videoArray = [
    {
      source: owlVideo,
      user: users[0],
      id: 0,
      key: Math.random(),
      allow: true,
    },
    {
      source: dogVideo,
      user: users[1],
      id: 1,
      key: Math.random(),
      allow: true,
    },
    {
      source: carVideo,
      user: users[2],
      id: 2,
      key: Math.random(),
      allow: false,
    },
    {
      source: birdVideo,
      user: users[3],
      id: 3,
      key: Math.random(),
      allow: true,
    },
    {
      source: foodVideo,
      user: users[4],
      id: 4,
      key: Math.random(),
      allow: true,
    },
    {
      source: partyVideo,
      user: users[5],
      id: 5,
      key: Math.random(),
      allow: true,
    },
  ];

  useEffect(() => {
    if (location.state) dispatch(location.state);
  }, [location.state]);

  useEffect(() => {
    setHomeTemporaryArray([]);
    JSON.parse(window.localStorage.getItem("videoArray")).map((item) => {
      if (
        window.localStorage.getItem("usersArray") &&
        JSON.parse(window.localStorage.getItem("usersArray")).filter(
          (element) => element.username === item.user.username
        ).length !== 0
      ) {
        localforage.getItem(`Video${item.id}`).then((res) => {
          setHomeTemporaryArray((prev) => [
            Object.assign({}, item, {
              source: URL.createObjectURL(res),
              video: res,
            }),
            ...prev,
          ]);
        });
      } else setHomeTemporaryArray((prev) => [...prev, item]);
    });
  }, []);

  useEffect(() => {
    if (
      homeTemporaryArray.length >
      JSON.parse(window.localStorage.getItem("videoArray")).length - 1
    ) {
      window.localStorage.setItem(
        "videoArray",
        JSON.stringify(homeTemporaryArray)
      );
      setUpdateHome(true);
    }
  }, [homeTemporaryArray]);

  if (window.localStorage.getItem("videoArray") === null) {
    window.localStorage.setItem("videoArray", JSON.stringify(videoArray));
    setUpdateHome(true);
  }

  return (
    <>
      <div id="logo-absolute">
        <img
          src="https://static.vecteezy.com/system/resources/previews/013/827/458/original/3d-arrow-icon-on-transparent-background-3d-style-arrow-icon-for-your-web-site-design-logo-app-ui-arrow-indicated-the-direction-symbol-curved-arrow-sign-free-png.png"
          width="120px"
        />
        Splendid
      </div>
      <Navbar setBrowser={setBrowser} />
      <main>
        <MainLeft
          reference={leftMenu}
          videoArray={videoArray}
          dispatch={(value) => dispatch(value)}
        />
        <MainRight
          updateHome={updateHome}
          navigation={state.navigation}
          browser={browser}
        />
      </main>
      <NavbarBottom />
    </>
  );
}
