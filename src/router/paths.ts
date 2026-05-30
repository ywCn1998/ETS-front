
function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';


export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  register: path(ROOTS_AUTH, '/register'),
  forgetPassword: path(ROOTS_AUTH, '/forget-password')
};

export const PATH_PAGE = {
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page403: '/403',
  page404: '/404',
  page500: '/500',
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  dashboard: {
    contactsgroup: path(ROOTS_DASHBOARD, '/contactsgroup')
  },
  general: {
    app: path(ROOTS_DASHBOARD, '/'),
    factors: path(ROOTS_DASHBOARD, '/factors'),
    sells: path(ROOTS_DASHBOARD, '/sells'),
    sells_detail: path(ROOTS_DASHBOARD, '/sells_detail'),
    pend_factors: path(ROOTS_DASHBOARD, '/pend_factors'),
  },
  profile: {
    personalInformation: path(ROOTS_DASHBOARD, '/profile/personal-information'),
  },
};

