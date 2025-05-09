import "./SideBar.scss";


export const SideBar = () => {


  return (
    <div className="sidebar">
      <ul className="sidebarUl">
        <li className="sidebarIl">Personal Info</li>
        <li className="sidebarIl">Settings</li>
        <li className="sidebarIl" >
          Log Out
        </li>
      </ul>
    </div>
  );
};

// onClick={handleLogOut}