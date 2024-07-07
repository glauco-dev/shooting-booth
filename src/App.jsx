
import React from "react";
import Manager from "./Manager";
import NavigationDrawer from "./NavigationDrawer";
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box } from "@chakra-ui/react";
import {SettingsIcon, AtSignIcon, EditIcon} from "@chakra-ui/icons";
import CampeonatosPage from './pages/CampeonatosPage';
import HomePage from './pages/HomePage';
import SettingsPage from './pages/SettingsPage';

export const Pages = [
    {component: CampeonatosPage, icon: <EditIcon/>},
    {component: HomePage, icon: <AtSignIcon/>},
    {component: SettingsPage, icon: <SettingsIcon/>},
];
export default () => {
    const [user, setUser] = React.useState(Manager.state['user']);
    const [pageIndex, setPageIndex] = React.useState(0);

    Manager.subscribe('user', async (userData) =>setUser(userData));

    return user ? (
        <Box>
            <NavigationDrawer userInfo={user} logout={() => Manager.logout()} />
            <Tabs isFitted variant='enclosed'>
                <TabPanels>
                    {Pages.map((page, index) => (
                        <TabPanel p={0} key={index}>
                            <page.component />
                        </TabPanel>
                    ))}
                </TabPanels>

                <TabList>
                    {Pages.map((page, index) => (
                        <Tab key={index} onClick={() => setPageIndex(index)}>
                            {page.icon}
                        </Tab>
                    ))}
                </TabList>
                
                </Tabs>
        </Box>
    ) : <h1> Loading... {JSON.stringify(user)}</h1>;
}