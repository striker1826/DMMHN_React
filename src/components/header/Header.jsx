import { styled } from "styled-components";
import headerLogo from "assets/headerLogo.png";
import Hamburger from "components/header/Hamburger";
import menuIcon from "assets/Vector.svg";
import iconText from "assets/iconText.png";
import logo from "assets/logo-img.png";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = ({ loginModal, signup }) => {
  const [isFixed, setIsFixed] = useState("true");
  const [isMenu, setIsMenu] = useState(false);
  const user = useSelector((state) => state.user);
  const modalRef = useRef();
  const navigate = useNavigate();

  const handleIsMenu = () => {
    setIsMenu((current) => !current);
  };

  const handleIsFixed = () => {
    if (window.scrollY > 0) {
      setIsFixed("false");
    } else {
      setIsFixed("true");
    }
  };

  const clickOutsideModal = (e) => {
    if (isMenu && modalRef.current && !modalRef.current.contains(e.target)) {
      setIsMenu(false);
    }
  };

  useEffect(() => {
    window.addEventListener("mousedown", clickOutsideModal);

    return () => {
      window.removeEventListener("mousedown", clickOutsideModal);
    };
  });

  useEffect(() => {
    window.addEventListener("scroll", handleIsFixed);
    return () => {
      window.removeEventListener("scroll", handleIsFixed);
    };
  });

  return (
    <Ctn $isfixed={isFixed} $signup={signup}>
      <IconCtn onClick={() => navigate("/")}>
        <Icon src={logo} alt="headerLogo" />
        <IconText src={iconText} alt="headerText" />
      </IconCtn>
      {/* <BtnCtn> */}
      {/* {user.id ? (
          <UserInfo>
            <UserProfile src={user.profileImg} />
            <p>{user.nickname}</p>
          </UserInfo>
        ) : (
          // <Btn onClick={loginModal}>Log in</Btn>
        )} */}
      {/* <Btn
          onClick={() => {
            navigate("/signup");
          }}
        >
          Sign up
        </Btn> */}
      {/* <MenuIcon ref={modalRef} $image={menuIcon} onClick={handleIsMenu}>
          {isMenu ? <Hamburger loginModal={loginModal} /> : null}
        </MenuIcon>
      </BtnCtn> */}
    </Ctn>
  );
};

const Ctn = styled.div`
  z-index: 1;
  position: sticky;
  background-color: ${(props) => {
    if (props.$signup === "true") {
      return "#004922";
    } else if (props.$isfixed === "true") {
      return "#transparent";
    } else {
      return "#004922";
    }
  }};
  top: 0;
  padding: 0 132.5px;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 1200px) {
    padding: 20px;
  }
`;

const IconCtn = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const Icon = styled.img`
  height: 60px;
`;

const IconText = styled.img`
  height: 40px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;

  > p {
    font-size: 20px;
    color: #fff;
  }
`;

const UserProfile = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  margin-right: 20px;
`;

const BtnCtn = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Btn = styled.button`
  margin-right: 26px;
  background-color: transparent;
  border: none;
  color: rgb(255, 255, 255);
  cursor: pointer;
`;

const MenuIcon = styled.div`
  background-image: url(${(props) => props.$image});
  width: 30px;
  height: 20px;
  cursor: pointer;
  position: relative;
`;

export default Header;
