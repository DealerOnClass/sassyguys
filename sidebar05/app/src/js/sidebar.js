var Sidebar = (function(){

	var body            = document.body;
	var sidebarToggle   = document.querySelector("[data-toggle           = 'sidebar']");
	var sidebarBackdrop = document.querySelector(".offcanvas-backdrop");

	function Init() {
		AddEventListener();
		console.log("yo");
	}

	function AddEventListener() {
		sidebarToggle.addEventListener("click", ToggleSidebar);
		sidebarBackdrop.addEventListener("click", SidebarHide);
	}

	function ToggleSidebar(evt) {
		if (body.classList.contains("sidebar-is-open")) {
			SidebarHide(evt);
		} else {
			SidebarShow(evt);
		}
	}

	function SidebarHide(evt) {
		evt.target.classList.remove("active");
		body.classList.remove("sidebar-is-open");
	}

	function SidebarShow(evt) {
		evt.target.classList.add("active");
		body.classList.add("sidebar-is-open");
	}

	return {
		init: Init
	}

})();

Sidebar.init();
