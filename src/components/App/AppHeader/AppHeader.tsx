import * as React from 'react';
import { observer } from 'mobx-react-lite';
import {
  AppBar,
  Box,
  Breakpoint,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import {
  Menu,
  HelpOutline,
  DriveFolderUpload,
  DarkMode,
  LightMode,
  BugReport,
  SvgIconComponent,
} from '@mui/icons-material';
import classNames from 'classnames';

import { isDev } from 'src/core/constants/config';
import { TPropsWithClassName } from 'src/core/types';
import { appTitle } from 'src/core/constants/config/app';
import { useAppSessionStore } from 'src/store/AppSessionStore';

import styles from './AppHeader.module.scss';

/** The width of mobile menu drawer */
const drawerWidth = 280;

interface TNavItem {
  icon?: SvgIconComponent;
  id: string;
  text: string;
  title?: string;
}

export const AppHeader: React.FC<TPropsWithClassName> = observer((props) => {
  const { className } = props;
  const container = document.body;
  const appSessionStore = useAppSessionStore();
  const {
    loadNewDataCb,
    themeMode,
    // appDataStore, // TODO?
    showDemo,
    useDemo,
  } = appSessionStore;
  const hasData = false; // appDataStore?.ready && loadNewDataCb;
  const isDark = themeMode === 'dark';
  const allowDemo = isDev || useDemo;
  // TODO: Check current page
  const navItems = React.useMemo<TNavItem[]>(() => {
    // prettier-ignore
    return [
      // { id: 'home', text: 'Home', icon: Home }, // UNUSED!
      hasData && { id: 'loadData', text: 'Load new data', icon: DriveFolderUpload, title:'Reload data' },
      !hasData && { id: 'loadData', text: 'Load data', icon: DriveFolderUpload, title:'Load data' },
      !isDark && { id: 'setDarkTheme', text: 'Light theme', icon: LightMode, title:'Set dark theme' },
      isDark && { id: 'setLightTheme', text: 'Dark theme', icon: DarkMode, title:'Set light theme' },
      { id: 'showHelp', text: 'Help', icon: HelpOutline, title:'Show application help' },
      allowDemo && !showDemo && { id: 'showDemo', text: 'Demo', icon: BugReport, title: 'Show demo' },
      allowDemo && showDemo && { id: 'closeDemo', text: 'Close demo', icon: BugReport, title: 'Hide demo' },
    ].filter(Boolean) as TNavItem[];
  }, [hasData, isDark, allowDemo, showDemo]);

  /** Mobile drawer state */
  const [mobileOpen, setMobileOpen] = React.useState(false);
  /** Toggle mobile drawer... */
  const handleDrawerToggle = React.useCallback(() => {
    setMobileOpen((prevState) => !prevState);
  }, []);
  /** Handle user action... */
  const handleNavItemClick = React.useCallback<
    React.MouseEventHandler<HTMLDivElement | HTMLButtonElement>
  >(
    (ev) => {
      const { currentTarget } = ev;
      const { id } = currentTarget;
      switch (id) {
        case 'loadData': {
          appSessionStore.setShowDemo(false);
          appSessionStore.setShowHelp(false);
          if (loadNewDataCb) {
            loadNewDataCb();
          }
          appSessionStore.setReady(true);
          break;
        }
        case 'setLightTheme': {
          appSessionStore.setThemeMode('light');
          break;
        }
        case 'setDarkTheme': {
          appSessionStore.setThemeMode('dark');
          break;
        }
        case 'showHelp': {
          appSessionStore.setShowHelp(true);
          break;
        }
        case 'hideHelp': {
          appSessionStore.setShowHelp(false);
          break;
        }
        case 'showDemo': {
          appSessionStore.setShowDemo(true);
          break;
        }
        case 'closeDemo': {
          appSessionStore.setShowDemo(false);
          break;
        }
      }
    },
    [appSessionStore, loadNewDataCb],
  );

  const treshold: Breakpoint = 'md';
  const midTreshold: Breakpoint = 'sm';

  const toolbarHeight = 56;

  // TODO: Show other menu items for mobile mode...
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography className={styles.drawTitle} variant="h6" sx={{ my: 2, height: toolbarHeight }}>
        {appTitle}
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.id} disablePadding title={item.title ? item.title : undefined}>
            <ListItemButton id={item.id} onClick={handleNavItemClick}>
              {item.icon && (
                <ListItemIcon className={styles.ListItemIcon}>
                  <item.icon />
                </ListItemIcon>
              )}
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar className={classNames(className, styles.root)} component="nav">
        <Toolbar sx={{ minHeight: { xs: toolbarHeight, [treshold]: toolbarHeight } }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { [treshold]: 'none' } }}
          >
            <Menu />
          </IconButton>
          <Typography
            className={styles.appTitle}
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              display: {
                xs: 'none',
                [midTreshold]: mobileOpen ? 'none' : 'block',
                [treshold]: 'block',
              },
            }}
          >
            {/* TODO: Show logo */}
            {appTitle}
          </Typography>
          <Box sx={{ display: { xs: 'none', [treshold]: 'flex' } }} className={styles.navButtons}>
            {navItems.map((item) => (
              <Button
                key={item.id}
                id={item.id}
                sx={{ color: 'white' }}
                onClick={handleNavItemClick}
                startIcon={item.icon && <item.icon />}
                title={item.title ? item.title : undefined}
              >
                {item.text}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', [treshold]: 'none' },
            // TODO: Move to style's module
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </>
  );
});
