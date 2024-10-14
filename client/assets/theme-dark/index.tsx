/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import { createTheme } from "@mui/material/styles";
// import Fade from "@mui/material/Fade";

// Material Dashboard 2 React base styles
import colors from "@/client/assets/theme-dark/base/colors";
import breakpoints from "@/client/assets/theme-dark/base/breakpoints";
import typography from "@/client/assets/theme-dark/base/typography";
import boxShadows from "@/client/assets/theme-dark/base/boxShadows";
import borders from "@/client/assets/theme-dark/base/borders";
import globals from "@/client/assets/theme-dark/base/globals";

// Material Dashboard 2 React helper functions
import boxShadow from "@/client/assets/theme-dark/functions/boxShadow";
import hexToRgb from "@/client/assets/theme-dark/functions/hexToRgb";
import linearGradient from "@/client/assets/theme-dark/functions/linearGradient";
import pxToRem from "@/client/assets/theme-dark/functions/pxToRem";
import rgba from "@/client/assets/theme-dark/functions/rgba";

// Material Dashboard 2 React components base styles for @mui material components
import sidenav from "@/client/assets/theme-dark/components/sidenav";
import list from "@/client/assets/theme-dark/components/list";
import listItem from "@/client/assets/theme-dark/components/list/listItem";
import listItemText from "@/client/assets/theme-dark/components/list/listItemText";
import card from "@/client/assets/theme-dark/components/card";
import cardMedia from "@/client/assets/theme-dark/components/card/cardMedia";
import cardContent from "@/client/assets/theme-dark/components/card/cardContent";
import button from "@/client/assets/theme-dark/components/button";
import iconButton from "@/client/assets/theme-dark/components/iconButton";
import input from "@/client/assets/theme-dark/components/form/input";
import inputLabel from "@/client/assets/theme-dark/components/form/inputLabel";
import inputOutlined from "@/client/assets/theme-dark/components/form/inputOutlined";
import textField from "@/client/assets/theme-dark/components/form/textField";
import menu from "@/client/assets/theme-dark/components/menu";
import menuItem from "@/client/assets/theme-dark/components/menu/menuItem";
import switchButton from "@/client/assets/theme-dark/components/form/switchButton";
import divider from "@/client/assets/theme-dark/components/divider";
import tableContainer from "@/client/assets/theme-dark/components/table/tableContainer";
import tableHead from "@/client/assets/theme-dark/components/table/tableHead";
import tableCell from "@/client/assets/theme-dark/components/table/tableCell";
import linearProgress from "@/client/assets/theme-dark/components/linearProgress";
import breadcrumbs from "@/client/assets/theme-dark/components/breadcrumbs";
import slider from "@/client/assets/theme-dark/components/slider";
import avatar from "@/client/assets/theme-dark/components/avatar";
import tooltip from "@/client/assets/theme-dark/components/tooltip";
import appBar from "@/client/assets/theme-dark/components/appBar";
import tabs from "@/client/assets/theme-dark/components/tabs";
import tab from "@/client/assets/theme-dark/components/tabs/tab";
import stepper from "@/client/assets/theme-dark/components/stepper";
import step from "@/client/assets/theme-dark/components/stepper/step";
import stepConnector from "@/client/assets/theme-dark/components/stepper/stepConnector";
import stepLabel from "@/client/assets/theme-dark/components/stepper/stepLabel";
import stepIcon from "@/client/assets/theme-dark/components/stepper/stepIcon";
import select from "@/client/assets/theme-dark/components/form/select";
import formControlLabel from "@/client/assets/theme-dark/components/form/formControlLabel";
import formLabel from "@/client/assets/theme-dark/components/form/formLabel";
import checkbox from "@/client/assets/theme-dark/components/form/checkbox";
import radio from "@/client/assets/theme-dark/components/form/radio";
import autocomplete from "@/client/assets/theme-dark/components/form/autocomplete";
import container from "@/client/assets/theme-dark/components/container";
import popover from "@/client/assets/theme-dark/components/popover";
import buttonBase from "@/client/assets/theme-dark/components/buttonBase";
import icon from "@/client/assets/theme-dark/components/icon";
import svgIcon from "@/client/assets/theme-dark/components/svgIcon";
import link from "@/client/assets/theme-dark/components/link";
import dialog from "@/client/assets/theme-dark/components/dialog";
import dialogTitle from "@/client/assets/theme-dark/components/dialog/dialogTitle";
import dialogContent from "@/client/assets/theme-dark/components/dialog/dialogContent";
import dialogContentText from "@/client/assets/theme-dark/components/dialog/dialogContentText";
import dialogActions from "@/client/assets/theme-dark/components/dialog/dialogActions";

export default createTheme({
  breakpoints: { ...breakpoints },
  palette: { ...colors },
  typography: { ...typography },
  boxShadows: { ...boxShadows },
  borders: { ...borders },
  functions: {
    boxShadow,
    hexToRgb,
    linearGradient,
    pxToRem,
    rgba
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ...globals,
        ...container
      }
    },
    MuiDrawer: { ...sidenav },
    MuiList: { ...list },
    MuiListItem: { ...listItem },
    MuiListItemText: { ...listItemText },
    MuiCard: { ...card },
    MuiCardMedia: { ...cardMedia },
    MuiCardContent: { ...cardContent },
    MuiButton: { ...button },
    MuiIconButton: { ...iconButton },
    MuiInput: { ...input },
    MuiInputLabel: { ...inputLabel },
    MuiOutlinedInput: { ...inputOutlined },
    MuiTextField: { ...textField },
    MuiMenu: { ...menu },
    MuiMenuItem: { ...menuItem },
    MuiSwitch: { ...switchButton },
    MuiDivider: { ...divider },
    MuiTableContainer: { ...tableContainer },
    MuiTableHead: { ...tableHead },
    MuiTableCell: { ...tableCell },
    MuiLinearProgress: { ...linearProgress },
    MuiBreadcrumbs: { ...breadcrumbs },
    MuiSlider: { ...slider },
    MuiAvatar: { ...avatar },
    MuiTooltip: { ...tooltip },
    MuiAppBar: { ...appBar },
    MuiTabs: { ...tabs },
    MuiTab: { ...tab },
    MuiStepper: { ...stepper },
    MuiStep: { ...step },
    MuiStepConnector: { ...stepConnector },
    MuiStepLabel: { ...stepLabel },
    MuiStepIcon: { ...stepIcon },
    MuiSelect: { ...select },
    MuiFormControlLabel: { ...formControlLabel },
    MuiFormLabel: { ...formLabel },
    MuiCheckbox: { ...checkbox },
    MuiRadio: { ...radio },
    MuiAutocomplete: { ...autocomplete },
    MuiPopover: { ...popover },
    MuiButtonBase: { ...buttonBase },
    MuiIcon: { ...icon },
    MuiSvgIcon: { ...svgIcon },
    MuiLink: { ...link },
    MuiDialog: { ...dialog },
    MuiDialogTitle: { ...dialogTitle },
    MuiDialogContent: { ...dialogContent },
    MuiDialogContentText: { ...dialogContentText },
    MuiDialogActions: { ...dialogActions }
  }
});
