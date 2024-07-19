const loginPage = 'login';
const registerPage = 'register';
const recoverPasswordPage = 'recovery';
const restorePasswordPage = 'restore';

export const PATHS_AUTH_PAGES = {
	loginPage: {
		withSlash: `/${loginPage}`,
		onlyPath: loginPage
	},
	registerPage: {
		withSlash: `/${registerPage}`,
		onlyPath: registerPage
	},
	recoverPasswordPage: {
		withSlash: `/${recoverPasswordPage}`,
		onlyPath: recoverPasswordPage
	},
	restorePasswordPage: {
		withSlash: `/${restorePasswordPage}`,
		onlyPath: restorePasswordPage
	}
};

const buyPage = 'buy';

export const PATH_BUY_PAGES = {
	buyPage: {
		withSlash: `/${buyPage}`,
		onlyPath: buyPage
	}
};

const maintenancePage = 'maintenance';
const maintenanceBuyPage = 'buy';
const maintenanceEventPage = 'event';
const maintenanceGenrePage = 'genre';
const maintenanceReportPage = 'report';

export const PATH_MAINTENANCE_PAGES = {
	withSlash: `/${maintenancePage}`,
	onlyPath: maintenancePage,
	buy: {
		withSlash: `/${maintenancePage}/${maintenanceBuyPage}`,
		onlyPath: maintenanceBuyPage
	},
	events: {
		withSlash: `/${maintenancePage}/${maintenanceEventPage}`,
		onlyPath: maintenanceEventPage
	},
	genres: {
		withSlash: `/${maintenancePage}/${maintenanceGenrePage}`,
		onlyPath: maintenanceGenrePage
	},
	reports: {
		withSlash: `/${maintenancePage}/${maintenanceReportPage}`,
		onlyPath: maintenanceReportPage
	}
};
