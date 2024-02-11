import * as React from 'react';
import { observer } from 'mobx-react-lite';
import {
  AppBar,
  Box,
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
import { Menu, HelpOutline, DriveFolderUpload, SvgIconComponent } from '@mui/icons-material';
import classNames from 'classnames';

import { TPropsWithClassName } from 'src/core/types';
import { appTitle } from 'src/core/constants/config/app';
// import { useSankeyAppSessionStore } from 'src/components/SankeyApp/SankeyAppSessionStore';

import styles from './AppHeader.module.scss';

/** The width of mobile menu drawer */
const drawerWidth = 280;

interface TNavItem {
  icon?: SvgIconComponent;
  id: string;
  text: string;
}

export const AppHeader: React.FC<TPropsWithClassName> = observer((props) => {
  const { className } = props;
  const container = document.body;
  // const sankeyAppSessionStore = useSankeyAppSessionStore();
  // const { loadNewDataCb, sankeyAppDataStore } = sankeyAppSessionStore;
  const hasData = false; // sankeyAppDataStore?.ready && loadNewDataCb;
  const navItems = React.useMemo<TNavItem[]>(() => {
    return [
      // { id: 'home', text: 'Home', icon: Home }, // UNUSED!
      hasData && { id: 'loadData', text: 'Load new data', icon: DriveFolderUpload },
      !hasData && { id: 'loadData', text: 'Load data', icon: DriveFolderUpload },
      { id: 'showHelp', text: 'Help', icon: HelpOutline },
    ].filter(Boolean) as TNavItem[];
  }, [hasData]);

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
      console.log('[AppHeader:handleNavItemClick]', {
        id,
        currentTarget,
        ev,
      });
      debugger;
      // switch (id) {
      //   case 'showHelp': {
      //     sankeyAppSessionStore.setShowHelp(true);
      //     break;
      //   }
      //   case 'hideHelp': {
      //     sankeyAppSessionStore.setShowHelp(false);
      //     break;
      //   }
      //   case 'loadData': {
      //     sankeyAppSessionStore.setShowHelp(false);
      //     if (loadNewDataCb) {
      //       loadNewDataCb();
      //     }
      //     sankeyAppSessionStore.setReady(true);
      //     break;
      //   }
      // }
    },
    [
      // sankeyAppSessionStore,
      // loadNewDataCb,
    ],
  );

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        {appTitle}
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.id} disablePadding className={styles.drawerListItem}>
            <ListItemButton id={item.id} onClick={handleNavItemClick}>
              {item.icon && (
                <ListItemIcon>
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
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <Menu />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            {appTitle}
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'flex' } }} className={styles.navButtons}>
            {navItems.map((item) => (
              <Button
                key={item.id}
                id={item.id}
                sx={{ color: 'white' }}
                onClick={handleNavItemClick}
                startIcon={item.icon && <item.icon />}
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
            display: { xs: 'block', sm: 'none' },
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
