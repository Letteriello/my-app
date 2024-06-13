// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import DashboardOverview from "layouts/overview";
import Billing from "layouts/billing";
import RTL from "layouts/rtl";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";

// @mui icons
import Icon from "@mui/material/Icon";

const routes = [
  {
    type: "collapse",
    name: "Perfil do Usuário",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Visão Geral",
    key: "overview",
    icon: <Icon fontSize="small">visibility</Icon>,
    route: "/overview",
    component: <DashboardOverview />,
  },
  {
    type: "collapse",
    name: "Treinos",
    key: "billing",
    icon: <Icon fontSize="small">fitness_center</Icon>,
    route: "/billing",
    component: <Billing />,
  },
  {
    type: "collapse",
    name: "Dieta e Nutrição",
    key: "rtl",
    icon: <Icon fontSize="small">restaurant_menu</Icon>,
    route: "/rtl",
    component: <RTL />,
  },
  {
    type: "collapse",
    name: "Saúde e Bem-Estar",
    key: "notifications",
    icon: <Icon fontSize="small">favorite</Icon>,
    route: "/notifications",
    component: <Notifications />,
  },
  {
    type: "collapse",
    name: "Dados e Estatísticas",
    key: "profile",
    icon: <Icon fontSize="small">bar_chart</Icon>,
    route: "/profile",
    component: <Profile />,
  },
  {
    type: "collapse",
    name: "Comunidade",
    key: "sign-in",
    icon: <Icon fontSize="small">people</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  {
    type: "collapse",
    name: "Ferramentas Adicionais",
    key: "sign-up",
    icon: <Icon fontSize="small">build</Icon>,
    route: "/authentication/sign-up",
    component: <SignUp />,
  },
  {
    type: "collapse",
    name: "Configurações",
    key: "divider",
    icon: <Icon fontSize="small">dashboard</Icon>, 
    route: "/divider", 
    component: <Icon fontSize="small">more_horiz</Icon>
  },
  {
    type: "collapse",
    name: "Ajuda e Suporte",
    key: "divider",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/divider",
    component: <Icon fontSize="small">more_horiz</Icon>
  }
  
  
];

export default routes;
