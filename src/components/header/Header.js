import  './Header.css';

const Header = ({ loginContainer }) => {
  return (
    <div className="app__header">
      <img
        src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
        className="app__headerImage"
        alt="our logo"
      />

      {loginContainer}
    </div>
  );
};

export default Header;
