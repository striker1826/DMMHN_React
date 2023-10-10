import { useState } from "react";
import { styled } from "styled-components";
import Header from "../header/Header";
import Home from "components/home/Home";
import Login from "components/auth/Login";

const Layout = () => {
  const [isModal, setIsModal] = useState("false");

  const openLoginModal = () => {
    setIsModal("true");
  };

  return (
    <LayoutCtn $ismodal={isModal}>
      <Header loginModal={openLoginModal} />
      <Home />
      {isModal === "true" && <Login setIsModal={setIsModal} />}
    </LayoutCtn>
  );
};

export const LayoutCtn = styled.div`
  margin: 0;
  width: 100%;
  height: 100vh;
  position: relative;
  z-index: 1;
  &::after {
    margin: 0;
    background: linear-gradient(
      150deg,
      rgb(0, 73, 34) 0%,
      rgb(2, 99, 47) 40%,
      rgb(5, 136, 65) 70%,
      rgb(249, 249, 249) 70%
    );
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    z-index: -1;
    opacity: ${(props) => (props.$ismodal === "true" ? "0.5" : "1")};
  }
  @media (max-height: 600px) {
    margin: 0;
    height: 100%;
  }
`;

export default Layout;
