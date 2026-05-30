


import { ISideBarItem } from '@src/models/sidebar';

const DASHBOARDPATH = (path: string) => ('/dashboard' + path);

import {
    HomeOutlined,
    MeetingRoomOutlined
} from '@mui/icons-material';
import { useEffect, useState } from 'react';




const useSideBarItems = () => {


    const [sidbarItems, setSideBarItems] = useState<ISideBarItem[]>([]);




    const addAccess = () => {
        let acc: ISideBarItem[] = [];
        acc.push({ title: 'Dashboard', route: DASHBOARDPATH('/'), icon: HomeOutlined })
        acc.push({ title: 'Rooms', route: DASHBOARDPATH('/rooms'), icon: MeetingRoomOutlined })


        setSideBarItems(acc);
    }


    useEffect(() => {
        addAccess()
    }, [])


    return {
        sidbarItems
    }
}


export default useSideBarItems;