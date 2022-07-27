import React, { Fragment } from "react"
import { Link } from "react-router-dom";

const Sidbar = () => {

  const toggleSubMenu = e => {
    const p = e.target.closest(".has-sub")
    p.classList.toggle('expand');
    p.classList.toggle('active');
    p.querySelector(".collapse").style.display = (p.querySelector(".collapse").style.display === "block") ? "none" : "block"
  }

  return (
    <Fragment>

      {/* LEFT MAIN SIDEBAR */}
      <div className="ec-left-sidebar ec-bg-sidebar">
        <div id="sidebar" className="sidebar ec-sidebar-footer">
          <div className="ec-brand">
            <Link to="/" title="Ekka">
              <img className="ec-brand-icon" src="/assets/imgs/ws-logo.png" alt="" />
              <span className="ec-brand-name text-truncate">CheapShop</span>
            </Link>
          </div>
          {/* begin sidebar scrollbar */}
          <div className="ec-navigation" data-simplebar="init">

           

            {/* sidebar menu */}
            <ul className="nav sidebar-inner" id="sidebar-menu">
              {/* Dashboard */}
              <li>
                <Link className="sidenav-item-link" to="/">
                  <i className="mdi mdi-view-dashboard-outline" />
                  <span className="nav-text">Dashboard</span>
                </Link>
                <hr />
              </li>

              {/* Users */}
              <li className="has-sub">
                <a className="sidenav-item-link" href="javascript:void(0)" onClick={toggleSubMenu}>
                  <i className="mdi mdi-account-group" />
                  <span className="nav-text">Users</span> <b className="caret" />
                </a>
                <div className="collapse">
                  <ul className="sub-menu" id="users" data-parent="#sidebar-menu">
                    <li >
                      <Link className="sidenav-item-link" to="/users">
                        <span className="nav-text">User List</span>
                      </Link>
                    </li>
                  </ul>
                </div>
                <hr />
              </li>
              {/* Category */}
              <li className="has-sub">
                <a className="sidenav-item-link" href="javascript:void(0)" onClick={toggleSubMenu}>
                  <i className="mdi mdi-dns-outline" />
                  <span className="nav-text">Categories</span> <b className="caret" />
                </a>
                <div className="collapse">
                  <ul className="sub-menu" id="categorys" data-parent="#sidebar-menu">
                    <li >
                      <Link className="sidenav-item-link" to="/main-category">
                        <span className="nav-text">Main Category</span>
                      </Link>
                    </li>
                    <li >
                      <Link className="sidenav-item-link" to="/sub-category">
                        <span className="nav-text">Sub Category</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
              {/* Products */}
              <li className="has-sub" onClick={toggleSubMenu}>
                <a className="sidenav-item-link" href="javascript:void(0)">
                  <i className="mdi mdi-palette-advanced" />
                  <span className="nav-text">Products</span> <b className="caret" />
                </a>
                <div className="collapse">
                  <ul className="sub-menu" id="products" data-parent="#sidebar-menu">
                    <li >
                      <Link className="sidenav-item-link" to="/add-product">
                        <span className="nav-text">Add Product</span>
                      </Link>
                    </li>

                    <li >
                      <Link className="sidenav-item-link" to="/products">
                        <span className="nav-text">List Product</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
              {/* Orders */}
              <li className="has-sub">
                <a className="sidenav-item-link" href="javascript:void(0)" onClick={toggleSubMenu}>
                  <i className="mdi mdi-cart" />
                  <span className="nav-text">Orders</span> <b className="caret" />
                </a>
                <div className="collapse">
                  <ul className="sub-menu" id="orders" data-parent="#sidebar-menu">
                    <li className="active">
                      <Link className="sidenav-item-link" to="/orders">
                        <span className="nav-text">Order History</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
              {/* Main */}
              <li className="has-sub" onClick={toggleSubMenu}>
                <a className="sidenav-item-link" href="javascript:void(0)">
                  <i className="mdi mdi-palette-advanced" />
                  <span className="nav-text">Sliders</span> <b className="caret" />
                </a>
                <div className="collapse">
                  <ul className="sub-menu" id="main" data-parent="#sidebar-menu">
                    <li >
                      <Link className="sidenav-item-link" to="/main">
                        <span className="nav-text">Sliders</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>

              {/* Main */}
              <li className="has-sub" onClick={toggleSubMenu}>
                <a className="sidenav-item-link" href="javascript:void(0)">
                  <i className="mdi mdi-palette-advanced" />
                  <span className="nav-text">Subscribe</span> <b className="caret" />
                </a>
                <div className="collapse">
                  <ul className="sub-menu" id="main" data-parent="#sidebar-menu">
                    <li >
                      <Link className="sidenav-item-link" to="/subscribe">
                        <span className="nav-text">Subscribe</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>

              {/* Main */}
              <li className="has-sub " onClick={toggleSubMenu}>
                <a className="sidenav-item-link" href="javascript:void(0)">
                  <i className="mdi mdi-palette-advanced" />
                  <span className="nav-text">Contacts</span> <b className="caret" />
                </a>
                <div className="collapse">
                  <ul className="sub-menu" id="main" data-parent="#sidebar-menu">
                    <li >
                      <Link className="sidenav-item-link" to="/contact">
                        <span className="nav-text">Contacts</span>
                      </Link>
                    </li>
                    <li >
                      <Link className="sidenav-item-link" to="/chat">
                        <span className="nav-text">Chat</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>





            </ul>
          </div>
        
        </div>
      </div>

    </Fragment>



  );
}
export default Sidbar;