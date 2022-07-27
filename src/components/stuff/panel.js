import React, { Fragment } from "react"
import { useTranslation } from 'react-i18next';
import { getCookie, setCookie } from "../../shared/cookie";
import myClassname from "classnames";



const Panel = (props) => {
    // const { t, i18n } = useTranslation();

    // const panelSwitch = (e) => {
    //     document.querySelector(".ec-tools-sidebar-overlay").style.display = "block"
    //     document.querySelector(".ec-tools-sidebar").style.right = "0px"
    //     document.querySelector(".ec-tools-sidebar-overlay").classList.remove("in-out")
    // }

    // const clearCach = (e) => {
    //     setCookie("dark", "false")
    //     setCookie("rtl", "false")
    //     //  setCookie("fullscreen" , "false")
    //     hidePanel()
    //     props.setStyle(props.style + 1)
    // }

    // const hidePanel = (e) => {
    //     document.querySelector(".ec-tools-sidebar-overlay").style.display = "none"
    //     document.querySelector(".ec-tools-sidebar").style.right = "-200px"
    //     document.querySelector(".ec-tools-sidebar-overlay").classList.add("in-out")
    // }

    // const modeSwitch = (e) => {

    //     if (e.target.className.includes("ec-mode-switch")) {
    //         e.target.parentElement.classList.toggle("active")
    //     } else {
    //         e.target.parentElement.parentElement.classList.toggle("active")
    //     }
    //     document.querySelector("body").classList.toggle("dark")

    //     setCookie("dark", getCookie("dark") === "true" ? "false" : "true")
    //     props.setStyle(props.style + 1)

    // }


    // const rtlSwitch = (e) => {

    //     if (e.target.className.includes("ec-rtl-switch")) {
    //         e.target.parentElement.classList.toggle("active")
    //     } else {
    //         e.target.parentElement.parentElement.classList.toggle("active")
    //     }
    //     setCookie("rtl", getCookie("rtl") === "true" ? "false" : "true")
    //     props.setStyle(props.style + 1)
    // }


    // const fullscreenSwitch = (e) => {

    //     if (e.target.className.includes("ec-fullscreen-switch")) {
    //         e.target.parentElement.classList.toggle("active")
    //     } else {
    //         e.target.parentElement.parentElement.classList.toggle("active")
    //     }


    //     const body = document.querySelector("body")


    //     if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
    //         const rfs = body.requestFullscreen || body.webkitRequestFullScreen || body.mozRequestFullScreen || body.msRequestFullscreen
    //         rfs.call(body)
    //     } else {

    //         const rfs = document.exitFullscreen || document.webkitExitFullscreen || document.msExitFullscreen
    //         rfs.call(document)

    //     }

    //     // setCookie("fullscreen", getCookie("fullscreen")  === "true" ? "false" : "true")
    //     //  props.setStyle(props.style + 1)

    // }



    // const changeBg = (e) => {

    //     const cbg = getCookie("cbg") ? getCookie("cbg") : false

    //     if (cbg) {
    //         document.querySelector("body").classList.remove("body-" + cbg);

    //         if (document.head.querySelector(`link[href="/assets/css/${cbg}.css"]`)) {
    //             document.head.querySelector(`link[href="/assets/css/${cbg}.css"]`).remove()
    //         }

    //     }

    //     document.querySelector("body").classList.add("body-" + e.target.id);
    //     setCookie("cbg", e.target.id)
    //     props.setStyle(props.style + 1)

    // }

    // const changeSkin = (e) => {
    //     const cskin = getCookie("cskin") ? getCookie("cskin") : false

    //     if (cskin) {
    //         if (document.head.querySelector(`link[href="/assets/css/skin-${cskin}.css"]`))
    //             document.head.querySelector(`link[href="/assets/css/skin-${cskin}.css"]`).remove()

    //     }


    //     setCookie("cskin", e.target.getAttribute("data-color"))
    //     props.setStyle(props.style + 1)

    // }


    const closePanel = e => {

        document.querySelector(".ec-tools-sidebar-overlay").style.display = "none"
        document.querySelector(".right-sidebar-container-2").classList.remove("right-sidebar-2-visible")

    }



    return (
        <Fragment>

            <div className="theme-option">
                <div className="right-sidebar-2">
                    <div className="ec-tools-sidebar-overlay" />
                    <div className="right-sidebar-container-2">
                        <div className="slim-scroll-right-sidebar-2">
                            <div className="right-sidebar-2-header">
                                <h2>SETTINGS</h2>
                                <p>Layout Preview Settings</p>
                                <div className="btn-close-right-sidebar-2">
                                    <i className="mdi mdi-window-close" onClick={closePanel} />
                                </div>
                            </div>
                            <div className="right-sidebar-2-body" data-simplebar="init"><div className="simplebar-wrapper" style={{ margin: '-15px -30px' }}><div className="simplebar-height-auto-observer-wrapper"><div className="simplebar-height-auto-observer" /></div><div className="simplebar-mask"><div className="simplebar-offset" style={{ right: '0px', bottom: '0px' }}><div className="simplebar-ec-content-wrapper" style={{ height: '100%', overflow: 'hidden scroll' }}><div className="simplebar-content" style={{ padding: '15px 30px' }}>
                                <span className="right-sidebar-2-subtitle">Header Layout</span>
                                <div className="no-col-space">
                                    <a href="javascript:void(0);" className="btn-right-sidebar-2 ec-header-fixed-to btn-right-sidebar-2-active">Fixed</a>
                                    <a href="javascript:void(0);" className="btn-right-sidebar-2 ec-header-static-to">Static</a>
                                </div>
                                <span className="right-sidebar-2-subtitle">Sidebar Layout</span>
                                <div className="no-col-space">
                                    <select className="right-sidebar-2-select" id="sidebar-option-select">
                                        <option value="ec-sidebar-fixed">Fixed Default</option>
                                        <option value="ec-sidebar-fixed-minified">Fixed Minified</option>
                                        <option value="ec-sidebar-fixed-offcanvas">Fixed Offcanvas</option>
                                        <option value="ec-sidebar-static">Static Default</option>
                                        <option value="ec-sidebar-static-minified">Static Minified</option>
                                        <option value="ec-sidebar-static-offcanvas">Static Offcanvas</option>
                                    </select>
                                </div>
                                <span className="right-sidebar-2-subtitle">Header Background</span>
                                <div className="no-col-space">
                                    <a href="javascript:void(0);" className="btn-right-sidebar-2 btn-right-sidebar-2-active ec-header-light-to">Light</a>
                                    <a href="javascript:void(0);" className="btn-right-sidebar-2 ec-header-dark-to">Dark</a>
                                </div>
                                <span className="right-sidebar-2-subtitle">Navigation Background</span>
                                <div className="no-col-space">
                                    <a href="javascript:void(0);" className="btn-right-sidebar-2 btn-right-sidebar-2-active ec-sidebar-light-to">Light</a>
                                    <a href="javascript:void(0);" className="btn-right-sidebar-2 ec-sidebar-dark-to">Dark</a>
                                </div>
                                <span className="right-sidebar-2-subtitle">Spacing Layout</span>
                                <div className="no-col-space">
                                    <a href="javascript:void(0);" className="btn-right-sidebar-2 btn-right-sidebar-2-active default-spacing-to">Default</a>
                                    <a href="javascript:void(0);" className="btn-right-sidebar-2 compact-spacing-to">Compact</a>
                                </div>
                                <div className="d-flex justify-content-center">
                                    <div id="reset-options" style={{ width: 'auto', cursor: 'pointer' }} className="btn-right-sidebar-2 btn-reset">Reset
                                        Settings</div>
                                </div>
                            </div></div></div></div><div className="simplebar-placeholder" style={{ width: 'auto', height: '551px' }} /></div><div className="simplebar-track simplebar-horizontal" style={{ visibility: 'hidden' }}><div className="simplebar-scrollbar" style={{ width: '0px', display: 'none' }} /></div><div className="simplebar-track simplebar-vertical" style={{ visibility: 'visible' }}><div className="simplebar-scrollbar" style={{ height: '209px', transform: 'translate3d(0px, 0px, 0px)', display: 'block' }} /></div></div>
                        </div>
                    </div>
                </div>
            </div>

        </Fragment>
    );
}

export default Panel;
