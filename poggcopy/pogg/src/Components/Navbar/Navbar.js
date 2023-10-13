import { Link } from "react-router-dom";

const Navbar = () => (
  <div>
    <nav>
      <ul>
        <li>
          <Link to="/">Main</Link>
        </li>
        <li>
          <Link to="/matchhistory">Match History</Link>
        </li>
        <li>
          <Link to="/leaderboards">Leaderboards</Link>
        </li>
      </ul>
    </nav>
  </div>
);

export default Navbar;
