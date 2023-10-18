export interface MapConfg {
    name: string,
    path: string,
    width: number,
    height: number,
    startX?: number,
    startY?: number,
    hide?: boolean,
    revertX?: boolean,
    revertY?: boolean,
    unit?: number,
    type?: 'opoint',
};

const mapCGame: Record<number, MapConfg> = {
    '1': { name: '绝地海岛', path: 'pubg/WorldMap.jpg', width: 800000, height: 800000 },
    '2': { name: '训练场', path: 'pubg/Shooting_Range_Map.jpg', width: 800000, height: 800000, hide: true },
    '4': { name: '绝地岛娱乐模式专用', path: 'pubg/WorldMap.jpg', width: 800000, height: 800000, hide: true },
    '5': { name: '绝地岛黑夜模式专用', path: 'pubg/WorldMap.jpg', width: 800000, height: 800000 },
    '6': { name: '沙漠黑夜模式专用', path: 'pubg/Desert_Minimap.jpg', width: 800000, height: 800000 },
    '7': { name: '热情雨林', path: 'pubg/Savage_Minimap.jpg', width: 400000, height: 400000 },
    '10': { name: '激情沙漠', path: 'pubg/Desert_Minimap.jpg', width: 800000, height: 800000 },
    '11': { name: '绝地海岛(第1人称)', path: 'pubg/WorldMap.jpg', width: 800000, height: 800000, hide: true },
    '12': { name: '绝地海岛-抢夺圆心', path: 'pubg/WorldMap.jpg', width: 800000, height: 800000, hide: true },
    '17': { name: '高原', path: 'pubg/Erangel.jpg', width: 800000, height: 800000 },
    '18': { name: '雪地', path: 'pubg/DihorOtok_Minimap.jpg', width: 600000, height: 600000 },
    '21': { name: '卡拉金', path: 'pubg/Karakin_MiniMap.jpg', width: 200000, height: 200000 },
    '22': { name: '边境模式', path: 'pubg/Borderland_Minimap.jpg', width: 150000 , height: 150000 , startX: 0, startY: 0 },
};

const mapIgame: Record<number, MapConfg> = {
    ...JSON.parse(JSON.stringify(mapCGame)),
    ...{
        '-19': { name: '利维科地图', path: 'igame/FourMaps_MiniMap.jpg', width: 200000, height: 200000, startX: 100000, startY: 100000 },
        '-20': { name: '沙漠2.0', path: 'igame/Desert_Minimap2.jpg', width: 800000, height: 800000 },
        '-21': { name: '卡拉金地图', path: 'igame/Karakin_MiniMap.jpg', width: 20000, height: 20000 },
        '-22': { name: '度假岛地图', path: 'igame/Borderland_Minimap.jpg', width: 150000, height: 150000 },
        '-23': { name: 'T玩法新地图', path: 'igame/TPlanD.jpg', width: 200000, height: 200000, startX: 32000, startY: 74800 },
    }
};

const config: Record<number, Record<number, MapConfg>> = {
    '30126': mapCGame,
    '30132': mapIgame,
    // XGAME
    '30178': {
        '1': { name: '城区', path: 'xgame/xgame5_5.png', width: 500000, height: 500000, startX: 201600, startY: -927200 },
        //'2': { name: '新大陆', path: 'xgame/new_land.png', width: 800000, height: 800000, startX: 0, startY: -800000 },
        '2': { name: '新大陆', path: 'xgame/new_land.png', width: 800000, height:  800000, startX: 0, startY: -800000 },
        //{ name: '新大陆', path: ？, width: 806400, height: 806400, startX: 806400, startY: -806400]
        '3': { name: '炼油厂', path: 'xgame/lyc.jpg', width: 64000, height: 64000, startX: 2052, startY: 14715 },
        '4': { name: '落日之城', path: 'xgame/lyzc.jpg', width: 24000, height: 24000, startX: 21972, startY: 33532 },
        '5': { name: '黑莓镇', path: 'xgame/hmz.jpg', width: 16000, height: 16000, startX: 6631, startY: 25298 },
        '6': { name: '奥克兰港口', path: 'xgame/akl.jpg', width: 25600, height: 25600, startX: 8214, startY: 919 },
        '7': { name: '中央车站', path: 'xgame/zycz.jpg', width: 32000, height: 32000, startX: 7106, startY: -658 },
        '8': { name: '暗区', path: 'xgame/aq.jpg', width: 96000, height: 96000, startX: 200784, startY: -368401 },
        '9': { name: '主城新', path: 'xgame/zhucheng_new.jpg', width: 42000, height: 24000, startX: 404000, startY: -448400 },
        '10': { name: '隔离区新', path: 'xgame/anqu_new.jpg', width: 84000, height: 68000, startX: 202000, startY: -368400 },
    },
    // iGame Lite
    '30164': {
        '7': { name: '热情雨林', path: 'igameLite/Savage_Minimap.png', width: 400000, height: 400000 },
        '1': { name: '绝地海岛', path: 'igameLite/Rcity_miniMap.BMP', width: 200000, height: 200000 },
        '11': { name: '重火力', path: 'igameLite/map-heavy.jpg', width: 200000, height: 200000 },
    },
    // AGame
    '30190': {
        '7': { name: '默认地图', path: 'agame/desertlands.png', width: 228850, height: 228850, startX: -114425, startY: -114425, revertX: true, revertY: true, 'offsetX': 0.5, 'offsetY': 0.5 },
        '8': { name: '地图2', path: 'agame/map2.png', width: 189990, height: 189970, startX: -85890, startY: -103730, revertX: true, revertY: true, 'offsetX': 0.5, 'offsetY': 0.5 },
    },
    // ESGame
    '30198': {
        '1': { name: '默认地图', path: 'esgame/map1.jpg', width: 1350, height: 1350, startX: 0, startY: 0, },
    },
    // OGame
    '30202': {
        '1': { name: 'Arctic', path: 'ogame/Arctic.jpg', width: 6334, height: 8192, 'type': 'opoint', unit: 1  },
        //'2': { name: 'VerticalSlice', path: 'ogame/VerticalSlice.jpg', width: 8192, height: 7937, 'type': 'opoint', 'unit': 1  },
        '2': { name: 'VerticalSlice', path: 'ogame/VerticalSlice.jpg', width: 467133, height: 363772, startX: -258217, startY: -143737, 'type': 'opoint', 'gridWidth': 5000, 'gridHeight': 5000  },
        '10': { name: 'VerticalSlice_CPU分析_旧', path: 'ogame/VerticalSlice_CPU_old.jpg', width: 167866, height: 112860, startX: -166561, startY: -60524 },
        '11': { name: 'VerticalSlice_CPU分析', path: 'ogame/VerticalSlice_CPU.jpg', width: 100000, height: 80000, startX: -98217, startY: -28737 },
    },
    // HGame
    '30193': {
        '1': { name: '大地图', path: 'hgame/Terrain.png', width: 8100, height: 8100, startX: 0, startY: 0 },
    },
    // CodeV
    '30201': {
        '1': { name: 'Ascent', path: 'codev/UI_Map_Image_Ascent.png', width: 14300, height: 14300, startX: 0, startY: 0, revertY: true },
        '2': { name: 'Bind', path: 'codev/UI_Map_Image_Bind.png', width: 16900, height: 16900, startX: 0, startY: 0, revertY: true },
        '3': { name: 'Haven', path: 'codev/UI_Map_Image_Haven.png', width: 13097, height: 12919, startX: 0, startY: 0, revertY: true },
        '4': { name: 'Icebox', path: 'codev/UI_Map_Image_Icebox.png', width: 14200, height: 14200, startX: 0, startY: 0, revertY: true },
        '5': { name: 'Split', path: 'codev/UI_Map_Image_Split.png', width: 13200, height: 13200, startX: 0, startY: 0, revertY: true },
        '6': { name: 'Breeze', path: 'codev/UI_Map_Image_Breeze.png', width: 14050, height: 14050, startX: 0, startY: 0, revertY: true },
        '7': { name: 'Fracture', path: 'codev/UI_Map_Image_FRACTURE.png', width: 12100, height: 12100, startX: 0, startY: 0, revertY: true },
    },
    // Origin
    '30215': {
        '1': { name: 'OriginDemo01_10K地图', path: 'origin/OriginDemo01_10K_Main.jpg', width: 1000000, height: 1000000, startX: 0, startY: -1000000, revertY: true },
    },
    // Ugame
    '30213': {
        '1': { name: '默认地图', path: 'ugame/default.png', width: 30000, height: 30000, startX: 34310, startY: 31640 },
        '2': { name: 'Map_ROC_Test', path: 'ugame/Map_ROC_Test.png', width: 28395, height: 19025, startX: 56065 , startY: -66190 },
    },
};

Object.keys(config).forEach(proj => {
    Object.keys(config[proj]).forEach(mapId => {
        config[proj][mapId].path = '/heatmap/' + config[proj][mapId].path;
    });
});

export default config;