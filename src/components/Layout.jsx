import "./Layout.css";

function Layout() {
  return (
    <>
      <div className="layout-header">
        <img className="layout-logo" src="/assets/Logo.svg" alt="Sportsee logo" />
        <div className="layout-nav">
          <h2>
            <a href="/pages/homepage.html">Accueil</a>
          </h2>
          <h2>Profil</h2>
          <h2>Réglage</h2>
          <h2>Communauté</h2>
        </div>
      </div>

      <div className="layout-sidebar">
        <div className="layout-sidebar-icons">
          <img src="/assets/activities/meditation-icon.svg" alt="Meditation icon" />
          <img src="/assets/activities/swimming-icon.svg" alt="Swimming icon" />
          <img src="/assets/activities/biking-icon.svg" alt="Biking icon" />
          <img src="/assets/activities/musculation-icon.svg" alt="Musculation icon" />
        </div>
        <div className="layout-sidebar-copyright">Copyright, SportSee 2020</div>
      </div>
    </>
  );
}

export default Layout;
